declare class UpdateMaterialDto {
    materialId: number;
    quantity: number;
}
export declare class UpdateBillOfMaterialDto {
    productId: number;
    materials: UpdateMaterialDto[];
}
export {};
