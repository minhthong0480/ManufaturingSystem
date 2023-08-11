import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './modules/materials/material.module';
import dbConfig from './config/db.config';

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
      AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
