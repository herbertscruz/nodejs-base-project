import { Router } from "express";
import * as path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';

export function expressOpenapiValidator(): Router {
    const router = Router();
    const filePath = path.join(process.cwd(), 'configuration', 'swagger.yaml');

    router.use(
        OpenApiValidator.middleware({
            apiSpec: filePath,
            validateRequests: true,
            validateResponses: true,
        }),
    );

    return router;
}