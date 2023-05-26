/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ContractDetailController } from './contract_detail.controller';
import { ContractDetailService } from './contract_detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractDetail } from './contract_detail.entity';
import { Contract } from 'src/contract/contract.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contract]),
        TypeOrmModule.forFeature([ContractDetail])
    ],
    controllers: [ContractDetailController],
    providers: [ContractDetailService]
})
export class ContractDetailModule {}
