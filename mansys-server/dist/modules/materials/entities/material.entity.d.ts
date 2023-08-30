import { BillOfMaterial } from "../../billOfMaterial/entities/billOfMaterial.entity";
export declare class Material {
    id: number;
    name: string;
    brand: string;
    cost: number;
    unit: string;
    quantity: number;
    createDate: Date;
    billOfMaterials: BillOfMaterial[];
}
