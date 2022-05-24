import { Request, Response } from 'express';

export class HealthResource {
  async health(req: Request, res: Response) {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date().getTime(),
    };

    res.status(200).send(data);
  }
}
