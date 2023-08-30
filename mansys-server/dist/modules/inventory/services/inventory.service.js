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
exports.InventoryService = void 0;
const typeorm_1 = require("typeorm");
const inventory_entity_1 = require("../entities/inventory.entity");
const common_1 = require("@nestjs/common");
const result_model_1 = require("../../../common/result-model");
const typeorm_2 = require("@nestjs/typeorm");
const result_list_model_1 = require("../../../common/result-list-model");
let InventoryService = exports.InventoryService = class InventoryService {
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    create(createInventoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!createInventoryDto.lastUpdate) {
                createInventoryDto.lastUpdate = new Date();
            }
            const inventory = yield this.inventoryRepository.save(createInventoryDto);
            if (!inventory) {
                return result_model_1.ResultModel.fail(inventory, 'Fail');
            }
            return result_model_1.ResultModel.success(inventory, 'Success');
        });
    }
    filter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder();
            if (filter.inventoryId) {
                query.where({ id: filter.inventoryId });
            }
            if (filter.location) {
                query.andWhere('inventory.location like :location', {
                    location: '%' + filter.location + '%',
                });
            }
            if (filter.productId) {
                query.andWhere({ productId: filter.productId });
            }
            if (filter.beginBalanceFrom) {
                query.andWhere('inventory.beginBalance >= :beginBalanceFrom', {
                    beginBalanceFrom: filter.beginBalanceFrom,
                });
            }
            if (filter.beginBalanceTo) {
                query.andWhere('inventory.beginBalance <= :beginBalanceTo', {
                    beginBalanceTo: filter.beginBalanceTo,
                });
            }
            if (filter.endBalanceFrom) {
                query.andWhere('inventory.endBalance >= :endBalanceFrom', {
                    endBalanceFrom: filter.endBalanceFrom,
                });
            }
            if (filter.endBalanceTo) {
                query.andWhere('inventory.endBalance <= :endBalanceTo', {
                    endBalanceTo: filter.endBalanceTo,
                });
            }
            if (filter.stockInFrom) {
                query.andWhere('inventory.stockIn >= :stockInFrom', {
                    stockInFrom: filter.stockInFrom,
                });
            }
            if (filter.stockInTo) {
                query.andWhere('inventory.stockIn <= :stockInTo', {
                    stockInTo: filter.stockInTo,
                });
            }
            if (filter.stockOutFrom) {
                query.andWhere('inventory.stockOut >= :stockOutFrom', {
                    stockOutFrom: filter.stockOutFrom,
                });
            }
            if (filter.stockOutTo) {
                query.andWhere('inventory.stockOut <= :stockOutTo', {
                    stockOutTo: filter.stockOutTo,
                });
            }
            if (filter.lastUpdateFrom) {
                query.andWhere('inventory.lastUpdate >= :lastUpdateFrom', {
                    lastUpdateFrom: filter.lastUpdateFrom,
                });
            }
            if (filter.lastUpdateTo) {
                query.andWhere('inventory.lastUpdate <= :lastUpdateTo', {
                    lastUpdateTo: filter.lastUpdateTo,
                });
            }
            const totalRows = yield query.getCount();
            const skip = (filter.page - 1) * filter.pageSize;
            query.offset(skip).limit(filter.pageSize);
            const inventories = yield query.getMany();
            return result_list_model_1.ResultListModel.success(inventories, totalRows, 'All filtered inventories');
        });
    }
    getOneByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.findOneBy({ productId });
        });
    }
    save(inventory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inventoryRepository.save(inventory);
        });
    }
    createQueryBuilder() {
        return this.inventoryRepository.createQueryBuilder('inventory');
    }
};
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map