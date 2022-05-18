import { HealthFactory } from "./application/factories/HealthFactory";
import { HelloWorldFactory } from "./application/factories/HelloWorldFactory";
import { HttpApp } from "./configuration/HttpApp";
import { swaggerUIExpress } from "./configuration/middlewares/swagger-ui-express";

process.env.TZ = 'UTC';

new HttpApp({
    beforeMiddlewares: [
        swaggerUIExpress(),
    ],
    factories: [
        new HealthFactory(),
        new HelloWorldFactory(),
    ],
}).listen(3000);