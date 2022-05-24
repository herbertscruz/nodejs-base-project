import IBalanceRepository from './balance.repository.interface';

export default class BalanceService {
  constructor(readonly balanceRepository: IBalanceRepository) {}
}
