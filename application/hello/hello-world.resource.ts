import { Request, Response } from 'express';

export class HelloWorldResource {
  async helloWorld(req: Request, res: Response) {
    res.send({ message: 'Hello World!' });
  }
}
