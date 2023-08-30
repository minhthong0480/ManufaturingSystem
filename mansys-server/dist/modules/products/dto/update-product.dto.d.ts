declare class UpdateMaterialDto {
    materialId: number;
    quantity: number;
}
export declare class UpdateProductDto {
    name?: string;
    quantity?: number;
    price?: number;
    tax?: number;
    sold?: number;
    categoryId?: number;
    requiredMaterials?: UpdateMaterialDto[];
}
export {};
