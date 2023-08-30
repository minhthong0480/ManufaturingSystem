import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ResultModel } from 'src/common/result-model';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    getProducts(filterDto: GetProductsFilterDto): Promise<Product[]>;
    getProductById(id: number): Promise<ResultModel<string> | ResultModel<Product[]>>;
    getOneById(id: number): Promise<Product>;
}
