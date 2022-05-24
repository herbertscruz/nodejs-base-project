import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import { readFileSync } from 'fs';
import * as YAML from 'js-yaml';
import { Router } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';

export function swaggerFactory(): Router {
  const router = Router();
  const filePath = path.join(process.cwd(), 'configuration', 'swagger.yaml');
  const swaggerDocument = YAML.load(readFileSync(filePath, 'utf8'));

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerDocument));
  router.use(
    OpenApiValidator.middleware({
      apiSpec: filePath,
      validateRequests: true,
      validateResponses: true,
    })
  );
  return router;
}
