import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ResultModel } from 'src/common/result-model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { search } = filterDto;

    const query = this.productsRepository.createQueryBuilder('product');

    if (search) {
      query.where(
        '(product.description LIKE :search OR product.name LIKE :search OR product.supplier LIKE :search)',
        { search: `${search}` },
      );
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findBy({ id });
    if (product) {
      return ResultModel.success(product, 'Get product successful');
    }
    return ResultModel.fail('', 'Product not exist!');
  }

  async create(CreateProductDto: CreateProductDto) {
    const checkProduct = await this.productsRepository.findOne({ where: { name: CreateProductDto.name } });
    if (checkProduct) {
      return ResultModel.fail('', 'Sản phẩm đã tồn tại!')
    }
    const product = await this.productsRepository.create(CreateProductDto);
    const save = await this.productsRepository.save(product);
    return ResultModel.success(product, 'Tạo sản phẩm thành công!');
  }

  async getOneById(id: number) {
    return await this.productsRepository.findOneBy({ id });
  }

  async getAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
