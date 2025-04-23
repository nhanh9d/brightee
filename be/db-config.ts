import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5433,
  username: process.env.DB_USERNAME || 'brightee',
  password: process.env.DB_PASSWORD || '8kmHeSr0VLt1Rzr',
  database: process.env.DB_DATABASE || 'brrrr',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
});
