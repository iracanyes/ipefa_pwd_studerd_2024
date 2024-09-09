import { DataSource } from 'typeorm';
import * as process from 'node:process';
import { Account } from '../model/account';

export const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.BACKEND_BD_HOST,
  port: parseInt(process.env.BACKEND_BD_PORT),
  database: process.env.BACKEND_DB_NAME,
  username: process.env.BACKEND_DB_USERNAME,
  password: process.env.BACKEND_DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [Account, ],
  subscribers: [],
  migrations: [],
});
