import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { FilterInventoryDto } from '../dto/filter-inventory.dto';
import { PaginationRequestModel } from '../../../common/pagination-request-model';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
@Controller({ path: '/inventory' })
export class InventoryController {
  constructor(
    @Inject(InventoryService)
    private readonly inventoryService: InventoryService,
  ) {}

  @Post()
  create(@Body() inventory: CreateInventoryDto) {
    return this.inventoryService.create(inventory);
  }

  @Get('/filter/')
  findWithFilder(@Query() filter: FilterInventoryDto) {
    PaginationRequestModel.applyDefaultPaginationSetting(filter);
    return this.inventoryService.filter(filter);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.inventoryService.get(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateInventoryDto) {
    return await this.inventoryService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Body() dto: UpdateInventoryDto) {
    return await this.inventoryService.delete(id);
  }
}
