import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controller/products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfMaterialModule } from '../billOfMaterial/bill-of-material.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BillOfMaterialModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
