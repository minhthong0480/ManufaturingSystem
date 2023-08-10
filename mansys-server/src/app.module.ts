import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { UserModule } from './modules/users/user.module';
import { User } from './modules/users/entities/user.entity';
import { UsersBootstrapService } from './bootstrap/user-bootstrap.service';
import { MaterialModule } from './material/material.module';

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
      MaterialModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
