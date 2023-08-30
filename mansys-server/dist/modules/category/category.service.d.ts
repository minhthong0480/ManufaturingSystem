import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findByName(name: string): Promise<Category>;
    findById(id: number): Promise<Category>;
    getAll(): Promise<Category[]>;
    updateCategory(id: number, categoryDto: CreateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
