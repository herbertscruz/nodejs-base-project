import { AppDataSource } from './data-source';
import { Balance } from './entity/balance';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new balance into the database...');
    const balance = new Balance();
    balance.total = 99.99;
    await AppDataSource.manager.save(balance);
    console.log('Saved a new balance with id: ' + balance.id);

    console.log('Loading balances from the database...');
    const balances = await AppDataSource.manager.find(Balance);
    console.log('Loaded balances: ', balances);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );
  })
  .catch((error) => console.log(error));
