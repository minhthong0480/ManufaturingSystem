import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BillOfMaterialService } from '../services/bill-of-material.service';

@ApiBearerAuth()
@Controller({ path: '/bills' })
export class BillOfMaterialController {
  constructor(
    @Inject(BillOfMaterialService)
    private readonly billService: BillOfMaterialService,
  ) {}

  @Get('/product/:id')
  async get(@Param('id') productId: number) {
    return await this.billService.getAllByProductId(productId);
  }
}
