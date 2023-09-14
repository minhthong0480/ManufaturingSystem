import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '../../../common/role.decorator';
import { SupplierService } from '../services/suppliers.service';

@ApiTags('supplier')
@ApiBearerAuth()
@Controller({ path: '/suppliers' })
export class SupplierController {
  constructor(
    @Inject(SupplierService)
    private readonly supplierService: SupplierService,
  ) {}

  @Get()
  async get() {
    return await this.supplierService.getAll();
  }
}
