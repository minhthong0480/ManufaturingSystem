import { Product } from 'src/modules/products/entities/product.entity';
export declare class Inventory {
    id: number;
    productId: number;
    product: Product;
    stockIn: number;
    stockOut: number;
    beginBalance: number;
    endBalance: number;
    location: string;
    lastUpdate: Date;
}
