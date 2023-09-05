import { Controller, Post, Get, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dtos/create-material.dto';
import { ApiBearerAuth, ApiTags, ApiParam } from "@nestjs/swagger";

@ApiTags('contract')
@ApiBearerAuth()
@Controller('materials')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) {}

    @Post('/create')
        createMaterial(@Body() createMaterialDto: CreateMaterialDto) {
        return this.materialService.create(createMaterialDto);
    }

    @Get()
    getAllMaterials(@Query('name') name : string) {
        return this.materialService.getAll(name);
    }

    @Get('/:name')
        findByMaterialName(@Param('name') name: string) {
        return this.materialService.findByName(name);
    }

    @Put('/:id')
        updateMaterial(@Param('id', ParseIntPipe) id, @Body() updateData: CreateMaterialDto) {
        return this.materialService.update(id, updateData);
    }

    @Delete('/:id')
    async deleteMaterial(@Param('id') id: number) {
        return await this.materialService.delete(id);
    }
}
