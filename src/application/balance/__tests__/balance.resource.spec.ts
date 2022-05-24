import request from 'supertest';
import { Server } from 'http';
import { HttpApp } from '../../../configuration/http-app';
import { errorHandler } from '../../../configuration/middlewares/error-handler';
import { swaggerFactory } from '../../swagger/swagger.factory';
import { balanceFactory } from '../balance.factory';

const app = new HttpApp({
  routers: [swaggerFactory(), balanceFactory()],
  errorHandlers: [errorHandler()],
});

let server: Server;

beforeAll(async () => {
  server = app.listen(0);
});

describe('when there is a request from a balance', () => {
  test('it should return a total', async () => {
    const res = await request(server).get('/balances');
    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBe(100.0);
  });
});
