import { Router } from 'express';
import { HelloWorldResource } from './hello-world.resource';

export function helloWorldFactory(): Router {
  const resource = new HelloWorldResource();

  const router = Router();
  router.get('/hello', resource.helloWorld);
  return router;
}
