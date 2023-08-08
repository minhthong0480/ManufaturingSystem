import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract/contract.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
      port: 5432,
      username: 'ubuntu',
      password: 'password',
      database: 'postgres',
      entities: [Contract, User], 
      synchronize: true,
    }),
    ContractModule],
  
})
export class AppModule {}
//__dirname + '/../**/*.entity.{js,ts}'