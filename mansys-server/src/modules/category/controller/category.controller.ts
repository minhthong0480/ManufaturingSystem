import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    return await this.categoryService.getAll();
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): void {
    this.categoryService.deleteCategory(id);
  }

  @Patch('/:id/update')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() CategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, CategoryDto);
  }
}
