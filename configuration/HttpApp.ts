import { IApp, IAppOptions } from "./IApp";
import express from 'express';

export class HttpApp implements IApp {

    private app;

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
        this.options.errorHandlers?.forEach(middleware => this.app.use(middleware));
    }

    listen(port: number) {
        this.app.listen(port, () => console.log('Listen port %s', port));
    }
}