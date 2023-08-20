import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';



@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
     ){}

     async getProducts(
        filterDto: GetProductsFilterDto,
        ): Promise<Product[]> {
        const { search } = filterDto;

        const query = this.productsRepository.createQueryBuilder('product');

        if (search) {
            query.where('(product.description LIKE :search OR product.name LIKE :search OR product.supplier LIKE :search)', {search: `${search}`});
        }

        try{
            const products = await query.getMany();
            return products;

        }catch(error) {
            throw new InternalServerErrorException();
        }

    }
}
