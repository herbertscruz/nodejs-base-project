import { HealthFactory } from './application/factories/HealthFactory';
import { HelloWorldFactory } from './application/factories/HelloWorldFactory';
import { HttpApp } from './configuration/HttpApp';
import { expressCors } from './configuration/middlewares/express-cors';
import { errorHandler } from './configuration/middlewares/error-handler';
import { expressOpenapiValidator } from './configuration/middlewares/express-openapi-validator';
import { swaggerUIExpress } from './configuration/middlewares/swagger-ui-express';

process.env.TZ = 'UTC';

new HttpApp({
  beforeMiddlewares: [
    swaggerUIExpress(),
    expressOpenapiValidator(),
    expressCors(),
  ],
  factories: [new HealthFactory(), new HelloWorldFactory()],
  errorHandlers: [errorHandler()],
}).listen(3000);
