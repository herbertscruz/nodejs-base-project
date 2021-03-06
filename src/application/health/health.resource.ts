import { Request, Response } from 'express';

export default class HealthResource {
  async health(req: Request, res: Response) {
    const data = {
      uptime: process.uptime(),
      message: 'Server Up!',
      date: new Date().getTime(),
    };

    res.status(200).send(data);
  }
}
