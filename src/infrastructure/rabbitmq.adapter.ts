import IMessageBroker from './message-broker.interface';
import amqplib, { Connection, Channel, ConsumeMessage } from 'amqplib';

export interface RabbitMQAdapterOptions {
  url: string;
  exchange: string;
  binds: RabbitMQAdapterBindOptions[];
}

export interface RabbitMQAdapterBindOptions {
  routingKey: string;
  queue: string;
  exchange?: string;
}

export default class RabbitMQAdapter implements IMessageBroker {
  private conn: Connection;
  private channel: Channel;
  private subscribers: Record<string, (message: string) => Promise<void>> = {};

  constructor(readonly options: RabbitMQAdapterOptions) {}

  async start(): Promise<void> {
    this.conn = await amqplib.connect(this.options.url);
    this.channel = await this.conn.createChannel();
    this.channel.prefetch(1);

    const promises = [];
    const assertExchange = this.channel.assertExchange(
      this.options.exchange,
      'topic',
      { durable: false }
    );
    promises.push(assertExchange);
    for (const key in this.options.binds) {
      const routingKey = this.options.binds[key].routingKey;
      const queue = this.options.binds[key].queue;
      promises.push(this.connectQueue(routingKey, queue));

      if ('exchange' in this.options.binds[key]) {
        const exchange = this.options.binds[key]['exchange'];
        promises.push(this.connectExchange(routingKey, exchange));
      }
    }
    await Promise.all(promises);
  }

  private connectQueue(routingKey: string, queue: string) {
    return Promise.all([
      (async () => {
        await this.channel.assertQueue(queue);
        await this.channel.bindQueue(queue, this.options.exchange, routingKey);
        await this.channel.consume(queue, this.consume);
      })(),
      (async () => {
        await this.channel.assertQueue(`${queue}_DEAD`);
        await this.channel.bindQueue(
          `${queue}_DEAD`,
          this.options.exchange,
          `dead.${routingKey}`
        );
      })(),
    ]);
  }

  private async connectExchange(routingKey: string, exchange: string) {
    await this.channel.bindExchange(
      this.options.exchange,
      exchange,
      routingKey
    );
  }

  private consume = async (message: ConsumeMessage) => {
    try {
      let isConsumed = false;
      const messageRoutingKey = message.fields.routingKey;
      const messageContent = message.content.toString();
      for (const rKey in this.subscribers) {
        if (rKey === messageRoutingKey) {
          try {
            await this.subscribers[rKey](messageContent);
            isConsumed = true;
          } catch (err) {
            this.publish(`dead.${rKey}`, messageContent);
          }
        }
      }
      if (isConsumed) {
        this.channel.ack(message);
      } else {
        this.channel.nack(message, false, false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  async stop(): Promise<void> {
    if (this.conn) await this.conn.close();
  }

  unsubscribe(routingKey: string): void {
    delete this.subscribers[routingKey];
  }

  subscribe(
    routingKey: string,
    callback: (message: string) => Promise<void>
  ): void {
    const idx = Object.keys(this.subscribers).findIndex(
      (k) => k === routingKey
    );
    if (idx === -1) this.subscribers[routingKey] = callback;
  }

  publish(routingKey: string, message: string): void {
    this.channel.publish(
      this.options.exchange,
      routingKey,
      Buffer.from(message, 'utf8')
    );
  }
}
