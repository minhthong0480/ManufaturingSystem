import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getAllMaterials(name: string): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    deleteCategory(id: number): void;
    updateTaskStatus(id: number, CategoryDto: CreateCategoryDto): Promise<Category>;
}
