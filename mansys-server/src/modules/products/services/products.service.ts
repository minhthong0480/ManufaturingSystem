import {
  Inject,
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
import ProductDto from '../dto/product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { BillOfMaterialService } from '../../billOfMaterial/services/bill-of-material.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @Inject(BillOfMaterialService)
    private readonly billService: BillOfMaterialService,
  ) {}

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

  async create(dto: CreateProductDto) {
    console.log(dto);
    const checkProduct = await this.productsRepository.findOne({
      where: { name: dto.name },
    });
    if (checkProduct) {
      return ResultModel.fail('', 'Sản phẩm đã tồn tại!');
    }
    const product = await this.productsRepository.save(dto);
    return ResultModel.success(product, 'Tạo sản phẩm thành công!');
  }

  async update(id: number, dto: UpdateProductDto) {
    console.log(dto);
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return ResultModel.fail('', 'Product not found!');
    }

    const update = await this.productsRepository.save({
      ...product,
      ...dto,
    });

    await this.billService.updateBills(id, dto.materials);

    return ResultModel.success(update, 'Success!');
  }

  async getOneById(id: number) {
    return await this.productsRepository.findOneBy({ id });
  }

  async getAll(): Promise<ProductDto[]> {
    const data = await this.productsRepository.find({
      relations: ['category', 'supplier'],
    });
    if (data == null || data.length == 0) return [];
    return data.map(
      (e) =>
        new ProductDto(
          e.id,
          e.name,
          e.description,
          e.supplier != null ? e.supplier.name : '',
          e.supplier_id,
          e.cost,
          e.price,
          e.category != null ? e.category.name : '',
          e.category_id,
        ),
    );
  }
}
