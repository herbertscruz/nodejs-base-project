require('express-async-errors');
import { IApp, IAppOptions } from "./IApp";
import express, { Application } from 'express';

export class HttpApp implements IApp {

    private app: Application;

    constructor(readonly options: IAppOptions) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.init();
    }

    private init() {
        this.options.beforeMiddlewares?.forEach(middleware => this.app.use(middleware));
        this.options.factories?.forEach(factory => this.app.use(factory.createResource()));
        this.options.afterMiddlewares?.forEach(middleware => this.app.use(middleware));
        this.options.errorHandlers?.forEach(errorHandler => this.app.use(errorHandler));
    }

    listen(port: number) {
        this.app.listen(port, () => console.log('Listen port %s', port));
    }
}