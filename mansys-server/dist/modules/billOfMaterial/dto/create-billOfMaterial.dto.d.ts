declare class MaterialDto {
    materialId: number;
    quantity: number;
}
export declare class CreateBillOfMaterialDto {
    productId: number;
    materials: MaterialDto[];
}
export {};
