require('express-async-errors');
import express, {
  Application,
  ErrorRequestHandler,
  RequestHandler,
  Router,
} from 'express';

export interface IAppOptions {
  beforeMiddlewares?: RequestHandler[];
  routers: Router[];
  afterMiddlewares?: RequestHandler[];
  errorHandlers?: ErrorRequestHandler[];
}

export class HttpApp {
  private app: Application;

  constructor(readonly options: IAppOptions) {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.init();
  }

  private init() {
    this.options.beforeMiddlewares?.forEach((middleware) =>
      this.app.use(middleware)
    );
    this.options.routers?.forEach((router) => this.app.use(router));
    this.options.afterMiddlewares?.forEach((middleware) =>
      this.app.use(middleware)
    );
    this.options.errorHandlers?.forEach((errorHandler) =>
      this.app.use(errorHandler)
    );
  }

  public listen(port: number) {
    this.app.listen(port, () => console.log('Listen port %s', port));
  }
}
