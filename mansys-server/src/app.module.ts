import dbConfig from './config/db.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './modules/materials/material.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductsModule } from './modules/products/products.module';
import { BillOfMaterialModule } from './modules/billOfMaterial/billOfMaterial.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { ContractModule } from './modules/contract/contract.module';
import { ContractStatusModule } from './modules/contract_status/contract_status.module'
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports:
    [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [dbConfig],
        expandVariables: true
      }),
      TypeOrmModule.forRootAsync({
        useFactory: dbConfig,
      }),
      UserModule,
      MaterialModule,
      CustomersModule,
      AuthModule,
      CategoryModule,
      ProductsModule,
      BillOfMaterialModule,
      TimelineModule,
      ContractModule,
      ContractStatusModule,
      InventoryModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
