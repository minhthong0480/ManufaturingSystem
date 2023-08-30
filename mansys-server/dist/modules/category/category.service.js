"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    createCategory(createCategoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = createCategoryDto;
            const category = new category_entity_1.Category();
            category.name = name;
            yield this.categoryRepository.save(category);
            return category;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.categoryRepository.findOne({ where: { name } });
            if (!found) {
                throw new common_1.NotFoundException(`Category with name "${name}" not found!`);
            }
            return found;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield this.categoryRepository.findOneBy({ id: id });
            if (!found) {
                throw new common_1.NotFoundException(`Category with ID "${id}" not found!`);
            }
            return found;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.find();
        });
    }
    updateCategory(id, categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = categoryDto;
            const category = yield this.findById(id);
            category.name = name;
            yield this.categoryRepository.save(category);
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.categoryRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Category with ID "${id}" not found!`);
            }
        });
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map