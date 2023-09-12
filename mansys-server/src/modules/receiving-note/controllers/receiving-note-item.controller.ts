import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ReceivingNoteItemService } from '../services/receiving-note-item.service';
import { CreateReceivingNoteItemDto } from '../dto/create-receiving-note-item.dto';

@Controller('receiving-note-items')
export class ReceivingNoteItemController {
  constructor(
    @Inject(ReceivingNoteItemService)
    private receivingNoteItemService: ReceivingNoteItemService,
  ) {}

  @Post()
  create(@Body() dto: CreateReceivingNoteItemDto) {
    return this.receivingNoteItemService.create(dto)
  }
}
