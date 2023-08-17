import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractStatus } from "./entities/contract_status.entity"
import { ContractStatusController } from "./controllers/contract_status.controller";
import { ContractStatusService } from "./services/contract_status.service";

@Module({
    imports: [TypeOrmModule.forFeature([ContractStatus])],
    controllers: [ContractStatusController],
    providers: [ContractStatusService]
})export class ContractStatusModule {}