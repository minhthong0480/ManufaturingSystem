import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/suppliers.entity';
import { SupplierService } from './services/suppliers.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
