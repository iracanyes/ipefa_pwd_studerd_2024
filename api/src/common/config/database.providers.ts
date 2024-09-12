import { DataSource } from 'typeorm';

export const databaseProviders = new DataSource({
  type: 'postgres',
  host: process.env.BACKEND_DB_HOST,
  port: parseInt(process.env.BACKEND_DB_PORT),
  database: process.env.BACKEND_DB_NAME,
  username: process.env.BACKEND_DB_USERNAME,
  password: process.env.BACKEND_DB_PASSWORD,
  // In dev mode only, set to true to sync entity schema and db schema
  synchronize: process.env.BACKEND_DB_SYNC === 'true',
  logging: process.env.BACKEND_DB_LOGGING === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [],
});
