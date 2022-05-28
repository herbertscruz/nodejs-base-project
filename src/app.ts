// import { healthFactory } from './application/health/health.factory';
// import { balanceFactory } from './application/balance/balance.factory';
// import { HttpApp } from './configuration/http-app';
// import { expressCors } from './configuration/middlewares/express-cors';
// import { errorHandler } from './configuration/middlewares/error-handler';
// import { swaggerFactory } from './application/swagger/swagger.factory';
import RabbitMQAdapter from './infrastructure/rabbitmq.adapter';

process.env.TZ = 'UTC';

// new HttpApp({
//   beforeMiddlewares: [expressCors()],
//   routers: [swaggerFactory(), healthFactory(), balanceFactory()],
//   errorHandlers: [errorHandler()],
// }).listen(3000);

(async () => {
  const url = 'amqp://localhost';

  const adapter2 = new RabbitMQAdapter({
    url,
    exchange: 'TEST2_EXCHANGE',
    binds: [],
  });

  const adapter = new RabbitMQAdapter({
    url,
    exchange: 'TEST_EXCHANGE',
    binds: [
      {
        routingKey: 'test.*',
        queue: 'TEST_QUEUE',
      },
      {
        routingKey: 'test.specific.*',
        queue: 'TEST_QUEUE',
      },
      {
        routingKey: 'test.exchange.*',
        queue: 'TEST2_QUEUE',
        exchange: 'TEST2_EXCHANGE',
      },
    ],
  });

  const test = () => {
    return new Promise<void>((resolve) => {
      console.log('Iniciando teste...');
      adapter.subscribe('test.*', async (message) => {
        const payload = JSON.parse(message);
        if (payload.test) {
          console.log(message);
        } else {
          const error = 'Test dead letter queue';
          console.log(error);
          throw new Error('Test dead letter queue');
        }
      });
      adapter.subscribe('test.specific.*', async (message) => {
        const payload = JSON.parse(message);
        if (payload.test) {
          console.log(message);
        } else {
          const error = 'Test dead letter queue';
          console.log(error);
          throw new Error('Test dead letter queue');
        }
      });
      adapter.subscribe('test.exchange.*', async (message) => {
        const payload = JSON.parse(message);
        if (payload.test) {
          console.log(message);
        } else {
          const error = 'Test dead letter queue';
          console.log(error);
          throw new Error('Test dead letter queue');
        }
      });
      adapter.publish(
        'test.*',
        JSON.stringify({ test: 'The first Hello World!' })
      );
      adapter.publish(
        'test.specific.*',
        JSON.stringify({ test: 'The first specific Hello World!' })
      );
      adapter2.publish(
        'test.exchange.*',
        JSON.stringify({ test: 'The first exchange Hello World!' })
      );
      adapter.publish('test.*', JSON.stringify({}));

      setTimeout(() => {
        adapter.unsubscribe('test.*');
        adapter.publish(
          'test.*',
          JSON.stringify({ test: 'The second Hello World!' })
        );
        adapter.publish(
          'test.specific.*',
          JSON.stringify({ test: 'The second specific Hello World!' })
        );
        adapter2.publish(
          'test.exchange.*',
          JSON.stringify({ test: 'The first exchange Hello World!' })
        );
        setTimeout(() => {
          console.log('Concluindo teste...');
          resolve();
        }, 3000);
      }, 3000);
    });
  };

  try {
    await adapter2.start();
    await adapter.start();
    await test();
    await adapter.stop();
    await adapter2.stop();

    await test();
  } catch (err) {
    console.log('-----------', err);
    await adapter2.start();
    await adapter.start();
    await test();
    await adapter.stop();
    await adapter2.stop();
  }
})();
