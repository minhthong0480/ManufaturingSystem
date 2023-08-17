import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./entities/contract.entity";
import { ContractService } from "./services/contract.service";
import { ContractController } from "./controllers/contract.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Contract])],
    controllers: [ContractController],
    providers: [ContractService],
})
export class ContractModule { }
