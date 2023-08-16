import { DataSourceOptions } from 'typeorm';
import { Customer } from '../modules/customers/entities/customers.entity';
import { Material } from '../modules/materials/entities/material.entity';
import { User } from '../modules/users/entities/user.entity';
import { Category } from '../modules/category/category.entity';

export default (): DataSourceOptions =>
  ({
    type: 'postgres',
    host:
      process.env.DB_HOST ||
      'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'ubuntu',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dev',
    entities: [User, Material, Customer, Category],
    migrations: ['src/migrations/*.{ts,js}'],
    migrationsRun: true,
    synchronize: true,
  }) as DataSourceOptions;
