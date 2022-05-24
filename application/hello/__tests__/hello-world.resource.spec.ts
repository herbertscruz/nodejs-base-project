import request from 'supertest';
import { Server } from 'http';
import { HttpApp } from '../../../configuration/http-app';
import { errorHandler } from '../../../configuration/middlewares/error-handler';
import { swaggerFactory } from '../../swagger/swagger.factory';
import { helloWorldFactory } from '../hello-world.factory';

const app = new HttpApp({
  routers: [swaggerFactory(), helloWorldFactory()],
  errorHandlers: [errorHandler()],
});

let server: Server;

beforeAll(async () => {
  server = app.listen(0);
});

describe('when there is a request from a hello world', () => {
  test('it should return a message', async () => {
    const res = await request(server).get('/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello World!');
  });
});
