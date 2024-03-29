import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Material } from '../modules/materials/entities/material.entity';
import { Customer } from '../modules/customers/entities/customers.entity';
import { Category } from '../modules/category/category.entity';
import { BillOfMaterial } from '../modules/billOfMaterial/entities/bill-of-material.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { ContractItem } from 'src/modules/contract/entities/contract-item.entity';
import { Timeline } from '../modules/timeline/entities/timeline.entity';
import { ContractStatus } from 'src/modules/contract_status/entities/contract_status.entity';
import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { DeliveryNote } from 'src/modules/delivery-note/entities/delivery-note.entity';
import { DeliveryNoteItem } from 'src/modules/delivery-note/entities/delivery-note-item.entity';
import { ReceivingNoteItem } from 'src/modules/receiving-note/entities/receiving-note-item.entity';
import { ReceivingNote } from 'src/modules/receiving-note/entities/receiving-note.entity';
import { Supplier } from 'src/modules/suppliers/entities/suppliers.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host:
    process.env.DB_HOST ||
    'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME || 'ubuntu',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dev',
  entities: [
    User,
    Material,
    Customer,
    Category,
    BillOfMaterial,
    Product,
    Contract,
    ContractItem,
    Timeline,
    ContractStatus,
    Inventory,
    DeliveryNote,
    DeliveryNoteItem,
    ReceivingNote,
    ReceivingNoteItem,
    Supplier
  ],
  // migrations: ['src/migrations/*.{ts,js}'],
  // migrationsRun: true,
  synchronize: true,
});
