import { ErrorRequestHandler, Router } from "express";
import { IFactory } from "./IFactory";

export interface IApp {
    listen: (port: number) => void;
}

export interface IAppOptions {
    beforeMiddlewares?: Router[];
    factories: IFactory[];
    afterMiddlewares?: Router[];
    errorHandlers?: ErrorRequestHandler[];
}