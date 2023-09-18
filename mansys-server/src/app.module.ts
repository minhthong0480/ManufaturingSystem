import dbConfig from './config/db.config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { BillOfMaterialModule } from './modules/billOfMaterial/bill-of-material.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { ContractModule } from './modules/contract/contract.module';
import { ContractStatusModule } from './modules/contract_status/contract_status.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { DeliveryNoteModule } from './modules/delivery-note/delivery.module';
import { ReceivingNoteModule } from './modules/receiving-note/receiving-note.module';
import { SupplierModule } from './modules/suppliers/suppliers.module';
import { AppLoggerMiddleware } from './config/interceptor.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      expandVariables: true,
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
    InventoryModule,
    DeliveryNoteModule,
    ReceivingNoteModule,
    SupplierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
