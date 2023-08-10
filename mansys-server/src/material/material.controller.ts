import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dtos/create-material.dto';

@Controller('materials')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) {}

    @Post('/create')
        createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
        return this.materialService.create(createMaterialDto);
    }

    @Get()
        getAllMaterials() {
        return this.materialService.getAll();
    }

    @Get(':name')
        findByMaterialName(@Param('name') name: string) {
        return this.materialService.findByName(name);
    }

    @Put(':id')
        updateMaterial(@Param('id') id: number, @Body() updateData: CreateMaterialDto) {
        return this.materialService.update(id, updateData);
    }

    @Delete(':id')
        deleteMaterial(@Param('id') id: number) {
            this.materialService.delete(id);
        return { message: `Material with id ${id} has been deleted` };
    }
}
