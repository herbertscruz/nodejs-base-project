export default interface IMessageBroker {
  start(exchange: string): Promise<void>;
  stop(): Promise<void>;
  unsubscribe(routingKey: string): void;
  subscribe(
    routingKey: string,
    callback: (message: string) => Promise<void>
  ): void;
  publish(routingKey: string, message: string): void;
}
