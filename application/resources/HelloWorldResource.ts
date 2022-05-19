import { Request, Response, Router } from 'express';
import { IResource } from '../../configuration/IResource';

export class HelloWorldController implements IResource {
  getRoute(): Router {
    const router = Router();
    router.get('/hello', this.helloWorld);
    return router;
  }

  async helloWorld(req: Request, res: Response) {
    res.send({ message: 'Hello World!' });
  }
}
