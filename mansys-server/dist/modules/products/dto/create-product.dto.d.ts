declare class MaterialDto {
    materialId: number;
    quantity: number;
}
export declare class CreateProductDto {
    name: string;
    quantity: number;
    price: number;
    tax?: number;
    sold: number;
    categoryId: number;
    requiredMaterials: MaterialDto[];
}
export {};
