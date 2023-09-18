import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { UpdateProductDto } from '../dto/update-product.dto';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  findAllProducts() {
    return this.productService.getAll();
  }

  @Get('/:id')
  findByProductsId(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post('/create')
  createMaterial(@Body() CreateProductDto: CreateProductDto) {
    return this.productService.create(CreateProductDto);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto);
  }
}
