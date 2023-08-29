import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetProductsFilterDto,
        ): Promise<Product[]> {
        return this.productService.getProducts(filterDto);
    }
}
