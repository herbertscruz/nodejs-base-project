import request from 'supertest';
import { Server } from 'http';
import { HttpApp } from '../../../configuration/http-app';
import { errorHandler } from '../../../configuration/middlewares/error-handler';
import { swaggerFactory } from '../../swagger/swagger.factory';
import { healthFactory } from '../health.factory';

const app = new HttpApp({
  routers: [swaggerFactory(), healthFactory()],
  errorHandlers: [errorHandler()],
});

let server: Server;

beforeAll(async () => {
  server = app.listen(0);
});

describe('when there is a request for a health check', () => {
  test('it should return healph check infos', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.uptime).toBeDefined();
    expect(res.body.message).toBe('Server Up!');
    expect(res.body.date).toBeDefined();
  });
});
