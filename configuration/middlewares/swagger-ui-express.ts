import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import { readFileSync } from 'fs';
import * as YAML from 'js-yaml';

export function swaggerUIExpress(): Router {
    const router = Router();
    const filePath = path.join(process.cwd(), 'configuration', 'swagger.yaml');
    const swaggerDocument = YAML.load(readFileSync(filePath, 'utf8'));

    router.use('/api-docs', swaggerUi.serve);
    router.get('/api-docs', swaggerUi.setup(swaggerDocument));

    return router;
}