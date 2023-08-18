import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CreateTimelineDto } from '../dtos/create-timeline.dto';
import { TimelinesService } from '../services/timeline.service'
import { UpdateTimelineDto } from '../dtos/update-timeline.dto'


@Controller('timelines')
export class TimelinesController {
    constructor( private timelinesService: TimelinesService) {}

    // Find all timelines
    @Get()
    async findAll() {
        return await this.timelinesService.findAll();
    }
    
    // Find one timeline by Id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.timelinesService.findOne(parseInt(id));
    } 
    
    // Find all timelines by contract id
    @Get('/contract')
    async findByContractId(@Query('contractId') contractId: string) {
        return await this.timelinesService.findByContractId(parseInt(contractId));
    }

    // Create a new timeline
    @Post()
    async create(@Body() timeline: CreateTimelineDto) {
        return 
        //await this.timelinesService.create(timeline);

    }

    // Update a timeline
    @Patch('/:id')
    async update(@Param('id') id: string, @Body() timeline: UpdateTimelineDto) {
        return await this.timelinesService.update(parseInt(id), timeline);
    }

    // Deactivate a timeline
    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.timelinesService.remove(parseInt(id));
    }

}
