import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from "./entities/timeline.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  controllers: [ControllersController],
  providers: [ServicesService]
})
export class TimelineModule {}
