import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { UpdateMaterialDto } from '../dtos/update-material.dto';

@Injectable()
export class MaterialService {
    constructor(
        @InjectRepository(Material)
        private materialRepository: Repository<Material>
    ) {}

    async create(createMaterialDto: CreateMaterialDto) {
        const material = this.materialRepository.create(createMaterialDto);
        return await this.materialRepository.save(material);
    }

    async findByName(name: string) {
        return await this.materialRepository.findOne({ where: { name } });
    }

    async getAll(): Promise<Material[]> {
        return this.materialRepository.find();
    }

    async update(id: number, updateMaterialDto: UpdateMaterialDto) {
        const material = await this.materialRepository.preload({
            id,
            ...updateMaterialDto,
        });

        if (!material) {
            throw new NotFoundException(`Material with id ${id} not found`);
        }

        return await this.materialRepository.save(material);
    }

    async delete(id: number) {
        const material = await this.materialRepository.findOneBy({id});

        if (!material) {
            throw new NotFoundException(`Material with id ${id} not found`);
        }

        await this.materialRepository.remove(material);
    }
}
