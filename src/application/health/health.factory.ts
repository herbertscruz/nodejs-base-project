import { Router } from 'express';
import HealthResource from './health.resource';

export function healthFactory(): Router {
  const resource = new HealthResource();

  const router = Router();
  router.get('/health', resource.health);
  return router;
}
