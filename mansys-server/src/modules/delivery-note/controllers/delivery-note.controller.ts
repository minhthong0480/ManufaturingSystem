import { Controller, Inject, Post, Body, Query, Get, Param, Patch, Delete } from '@nestjs/common';
import { DeliveryNoteSerive } from '../services/delivery-note.service';
import { CreateDeliveryNoteDto } from '../dto/create-delivery-note.dto';
import { FilterDeliveryNoteDto } from '../dto/filter-delivery-note.dto';
import { UpdateDeliveryNoteDto } from '../dto/update-delivery-note.dto';

@Controller('delivery-notes')
export class DeliveryNoteController {
  constructor(
    @Inject(DeliveryNoteSerive)
    private deliveryNoteSerive: DeliveryNoteSerive,
  ) {}

  @Post()
  async create(@Body() dto: CreateDeliveryNoteDto) {
    return await this.deliveryNoteSerive.create(dto);
  }

  @Get('/filter/')
  async filter(@Query() dto: FilterDeliveryNoteDto) {
    return await this.deliveryNoteSerive.filter(dto);
  }

  @Get('/approve/:id')
  async approve(@Param('id') id: number) {
    return await this.deliveryNoteSerive.approve(id);
  }

  @Get(':id')
  async get(@Param('id') id) {
    return await this.deliveryNoteSerive.get(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.deliveryNoteSerive.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateDeliveryNoteDto) {
    return await this.deliveryNoteSerive.update(id, dto);
  }
}
