import { Material } from '../../materials/entities/material.entity';
import { Product } from '../../products/entities/product.entity';
export declare class BillOfMaterial {
    id: number;
    product: Product;
    material: Material;
    quantity: number;
}
