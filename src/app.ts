import { healthFactory } from './application/health/health.factory';
import { balanceFactory } from './application/balance/balance.factory';
import { HttpApp } from './configuration/http-app';
import { expressCors } from './configuration/middlewares/express-cors';
import { errorHandler } from './configuration/middlewares/error-handler';
import { swaggerFactory } from './application/swagger/swagger.factory';

process.env.TZ = 'UTC';

new HttpApp({
  beforeMiddlewares: [expressCors()],
  routers: [swaggerFactory(), healthFactory(), balanceFactory()],
  errorHandlers: [errorHandler()],
}).listen(3000);
