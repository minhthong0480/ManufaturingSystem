import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Contract])],
    controllers: [],
    providers: [],
})
export class ContractModule {}
