import { Router } from 'express';
import BalanceService from '../../domain/balance/balance.service';
import BalanceRepository from '../../infrastructure/balance.repository';
import BalanceResource from './balance.resource';

export function balanceFactory(): Router {
  const balanceRepository = new BalanceRepository();
  const balanceService = new BalanceService(balanceRepository);
  const resource = new BalanceResource(balanceService);

  const router = Router();
  router.get('/balances', resource.getBalance);
  return router;
}
