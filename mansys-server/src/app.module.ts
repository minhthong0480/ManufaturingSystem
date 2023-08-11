import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { UserModule } from './modules/users/user.module';
import { MaterialModule } from './modules/materials/material.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports:
    [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [dbConfig],
        expandVariables: true
      }),
      TypeOrmModule.forRootAsync({
        useFactory: dbConfig
      }),
      UserModule,
      MaterialModule,
      CustomersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
