import { healthFactory } from './application/health/health.factory';
import { helloWorldFactory } from './application/hello/hello-world.factory';
import { HttpApp } from './configuration/http-app';
import { expressCors } from './configuration/middlewares/express-cors';
import { errorHandler } from './configuration/middlewares/error-handler';
import { swaggerFactory } from './application/swagger/swagger.factory';

process.env.TZ = 'UTC';

new HttpApp({
  beforeMiddlewares: [expressCors()],
  routers: [swaggerFactory(), healthFactory(), helloWorldFactory()],
  errorHandlers: [errorHandler()],
}).listen(3000);
