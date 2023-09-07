import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { ContractService } from './services/contract.service';
import { ContractController } from './controllers/contract.controller';
import { ContractItemService } from './services/contract-item.service';
import { ContractItem } from './entities/contract-item.entity';
import { ProductsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, ContractItem]),
    ProductsModule,
    CustomersModule,
  ],
  controllers: [ContractController],
  providers: [ContractService, ContractItemService],
})
export class ContractModule {}
