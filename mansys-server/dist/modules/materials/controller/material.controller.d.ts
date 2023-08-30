import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    createMaterial(createMaterialDto: CreateMaterialDto): Promise<import("../entities/material.entity").Material>;
    getAllMaterials(name: string): Promise<import("../entities/material.entity").Material[]>;
    findByMaterialName(name: string): Promise<import("../entities/material.entity").Material>;
    updateMaterial(id: any, updateData: CreateMaterialDto): Promise<import("../entities/material.entity").Material>;
    deleteMaterial(id: number): {
        message: string;
    };
}
