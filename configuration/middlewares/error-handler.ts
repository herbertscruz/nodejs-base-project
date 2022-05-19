import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function errorHandler(): ErrorRequestHandler {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    return <ErrorRequestHandler>function (err, req: Request, res: Response, next: NextFunction) {
        res.status(err.status ?? 500)
        res.json({
            success: false,
            error: err.message
        })
        next(err)
    }
}