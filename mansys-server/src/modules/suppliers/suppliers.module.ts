import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from './entities/suppliers.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SupplierModule {}