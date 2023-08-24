import { Body, Controller, Post } from '@nestjs/common';
import { ReceivingNoteService } from '../services/receiving-note.service';
import { CreateReceivingNoteDto } from '../dto/create-receiving-note.dto';
import { FilterReceivingNoteDto } from '../dto/filter-receiving-note.dto';

@Controller('receiving-notes')
export class ReceivingNoteController {
  constructor(private receivingNoteService: ReceivingNoteService) {}

  @Post()
  create(@Body() dto: CreateReceivingNoteDto) {
    return this.receivingNoteService.create(dto);
  }

  @Post('/filter')
  filter(@Body() dto: FilterReceivingNoteDto) {
    return this.receivingNoteService.filter(dto);
  }
}
