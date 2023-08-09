import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
    port: 5432,
    username: 'ubuntu',
    password: 'password',
    database: 'dev',
    entities: [],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
