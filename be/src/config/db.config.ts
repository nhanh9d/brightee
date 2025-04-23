import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5433,
  username: process.env.DB_USERNAME || 'brightee',
  password: process.env.DB_PASSWORD || '8kmHeSr0VLt1Rzr',
  database: process.env.DB_DATABASE || 'brrrr',
  entities: ['be/src/**/*.entity{.ts,.js}'],
  migrations: ['be/src/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};