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

import dbConfig from './config/db.config';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/controller/products.controller';
import { BillOfMaterialModule } from './modules/billOfMaterial/billOfMaterial.module';


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
      BillOfMaterialModule
    ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
