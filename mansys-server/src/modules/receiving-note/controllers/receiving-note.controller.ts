import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReceivingNoteService } from '../services/receiving-note.service';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';
import { UpdateReceivingNoteDto } from '../dto/update-receiving-note.dto';

@Controller('receiving-notes')
export class ReceivingNoteController {
  constructor(private receivingNoteService: ReceivingNoteService) {}

  @Post()
  create(@Body() dto: CreateReceivingNoteDto) {
    return this.receivingNoteService.create(dto);
  }

  @Get('/filter')
  filter(@Query() dto: FilterReceivingNoteDto) {
    return this.receivingNoteService.filter(dto);
  }

  @Get(':id')
  async get(@Param('id') id : number) {
    return await this.receivingNoteService.get(id);
  }

  @Patch(':id')
  async update(@Param('id') id : number, @Body() dto: UpdateReceivingNoteDto) {
    return await this.receivingNoteService.update(id, dto);
  }
}
