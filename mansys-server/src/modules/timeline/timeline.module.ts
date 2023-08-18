import { Module } from '@nestjs/common';
import { TimelinesController } from './controllers/timeline.controller';
import { TimelinesService } from './services/timeline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeline } from "./entities/timeline.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  controllers: [TimelinesController],
  providers: [TimelinesService]
})
export class TimelineModule {}
