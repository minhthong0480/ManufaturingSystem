import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Material } from '../modules/materials/entities/material.entity';
import { Customer } from '../modules/customers/entities/customers.entity';
import { Category } from '../modules/category/category.entity';
import { BillOfMaterial} from '../modules/billOfMaterial/entities/billOfMaterial.entity'

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host:
    process.env.DB_HOST ||
    'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME || 'ubuntu',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dev',
  entities: [User, Material, Customer, Category, BillOfMaterial],
  // migrations: ['src/migrations/*.{ts,js}'],
  // migrationsRun: true,
  synchronize: true,
});
