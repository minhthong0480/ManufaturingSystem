import { Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { UpdateMaterialDto } from '../dtos/update-material.dto';
export declare class MaterialService {
    private materialRepository;
    constructor(materialRepository: Repository<Material>);
    create(createMaterialDto: CreateMaterialDto): Promise<Material>;
    findByName(name: string): Promise<Material>;
    getAll(): Promise<Material[]>;
    update(id: number, updateMaterialDto: UpdateMaterialDto): Promise<Material>;
    delete(id: number): Promise<void>;
}
