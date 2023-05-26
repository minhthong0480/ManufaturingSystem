/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';

import { ContractModule } from './contract/contract.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ContractDetailModule } from './contract_detail/contract_detail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ContractModule,
    ContractDetailModule],
})
export class AppModule {}
