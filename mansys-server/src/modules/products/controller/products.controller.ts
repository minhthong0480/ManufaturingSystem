import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { Int32 } from 'typeorm';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Get('/')
    findAllProducts(@Param('id') id: number) {
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

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetProductsFilterDto,
    ): Promise<Product[]> {
        return this.productService.getProducts(filterDto);
    }
}
