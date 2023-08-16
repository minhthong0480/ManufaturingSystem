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
import { ProductsController } from './modules/products/controller/products.controller';
import { BillOfMaterialModule } from './modules/billOfMaterial/billOfMaterial.module';
import { ContractModule } from './modules/contract/contract.module';

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
      ContractModule
    ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
