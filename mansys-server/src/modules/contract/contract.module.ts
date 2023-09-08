import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { ContractService } from './services/contract.service';
import { ContractController } from './controllers/contract.controller';
import { ContractItemService } from './services/contract-item.service';
import { ContractItem } from './entities/contract-item.entity';
import { ProductsModule } from '../products/products.module';
import { ContractStatusService} from '../contract_status/services/contract_status.service'
import { ContractStatus } from '../contract_status/entities/contract_status.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Contract, ContractItem, ContractStatus]), ProductsModule],
  controllers: [ContractController],
  providers: [ContractService, ContractItemService, ContractStatusService],
})
export class ContractModule {}
