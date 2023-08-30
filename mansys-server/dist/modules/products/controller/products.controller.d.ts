import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { GetProductsFilterDto } from '../dto/get-products-filter.dto';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getTasks(filterDto: GetProductsFilterDto): Promise<Product[]>;
}
