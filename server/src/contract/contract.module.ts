/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract])
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
