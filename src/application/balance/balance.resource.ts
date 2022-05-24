import { Request, Response } from 'express';
import BalanceService from '../../domain/balance/balance.service';

export default class BalanceResource {
  constructor(readonly balanceService: BalanceService) {}

  async getBalance(req: Request, res: Response) {
    res.send({ total: 100.0 });
  }
}
