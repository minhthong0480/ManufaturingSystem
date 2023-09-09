import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { FilterInventoryDto } from '../dto/filter-inventory.dto';
import { PaginationRequestModel } from '../../../common/pagination-request-model';
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

  @Get('/filter')
  findWithFilder(@Body() filter: FilterInventoryDto) {
    PaginationRequestModel.applyDefaultPaginationSetting(filter);
    return this.inventoryService.filter(filter);
  }
}
