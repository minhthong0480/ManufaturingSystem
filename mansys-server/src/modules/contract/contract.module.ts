import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./entities/contract.entity";
import { ContractService } from "./services/contract.service";
import { ContractController } from "./controllers/contract.controller";
import { ContractItemService } from "./services/contract-item.service";
import { ContractItem } from "./entities/contract-item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Contract, ContractItem])],
    controllers: [ContractController],
    providers: [ContractService, ContractItemService],
})
export class ContractModule { }
