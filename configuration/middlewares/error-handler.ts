import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function errorHandler(): ErrorRequestHandler {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return (((err, req: Request, res: Response, next: NextFunction) => {
        console.error(typeof err);
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
    }) as ErrorRequestHandler)
}