import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'basedb',
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migration/**/*{.ts,.js}`],
  subscribers: [`${__dirname}/subscribe/**/*{.ts,.js}`],
});
