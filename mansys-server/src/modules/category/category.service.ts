import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResultModel } from 'src/common/result-model';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
     ){}

     async createCategory(createCategoryDto: CreateCategoryDto) {
        const { name } = createCategoryDto;

        const category = new Category();
        category.name = name;
        
        await this.categoryRepository.save(category);
        
        return category;
    }

    async findByName(name: string): Promise<Category> {
        const found = await this.categoryRepository.findOne({ where: { name } });

        if (!found) {
            throw new NotFoundException(`Category with name "${name}" not found!`)
        }

        return found;
    }

    async findById(id: number): Promise<Category> {
        const found = await this.categoryRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException(`Category with ID "${id}" not found!`)
        }

        return found;
    }

    async getAll() {
        const categories = await this.categoryRepository.find();
        if (!categories) {
            return ResultModel.fail("", "Failed");
        }
        return ResultModel.success(categories, "Success");
    }

    async updateCategory(id: number, categoryDto: CreateCategoryDto): Promise<Category> {
        const { name } = categoryDto;

        const category = await this.findById(id);
        category.name = name;

        await this.categoryRepository.save(category);
        return category;
    }

    async deleteCategory(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
       
        if(result.affected === 0) {
         throw new  NotFoundException(`Category with ID "${id}" not found!`);
        }
     }

}
