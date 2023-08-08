import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
      port: 5432,
      username: 'ubuntu',
      password: 'password',
      database: 'postgres',
      entities: [__dirname + '**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ContractModule,
    AuthModule],
  
})
export class AppModule {}
//__dirname + '/../**/*.entity.{js,ts}'