import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { UpdateMaterialDto } from '../dtos/update-material.dto';
import { ResultModel } from 'src/common/result-model';

@Injectable()
export class MaterialService {
    constructor(
        @InjectRepository(Material)
        private materialRepository: Repository<Material>
    ) {}

    async create(createMaterialDto: CreateMaterialDto) {
        const material = this.materialRepository.create(createMaterialDto);
        await this.materialRepository.save(material);
    }

    async findByName(name: string) {
        return await this.materialRepository.findOne({ where: { name } });
    }

    async getAll(name: string): Promise<ResultModel<Material[]>> {
        let data = null;
        if(name != null && name.length > 0){
            data = (await this.materialRepository.find({where: { isActive : true, name: Like(`%${name}%`)} , order: {id : "ASC"}}))
        }
        else{
            data = await this.materialRepository.find({where : {isActive : true}});
        }
        return ResultModel.success(data, null)
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

    async delete(id: number) : Promise<ResultModel<boolean>> {
        const material = await this.materialRepository.findOneBy({id});
        if(material){
            material.isActive = false;
            await this.materialRepository.save(material);
        }
        return ResultModel.success(true, `Material with id ${id} has been deleted!`)
    }
}
