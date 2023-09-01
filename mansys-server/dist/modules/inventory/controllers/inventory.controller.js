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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("../services/inventory.service");
const create_inventory_dto_1 = require("../dto/create-inventory.dto");
const filter_inventory_dto_1 = require("../dto/filter-inventory.dto");
const pagination_request_model_1 = require("../../../common/pagination-request-model");
let InventoryController = exports.InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    create(inventory) {
        return this.inventoryService.create(inventory);
    }
    findWithFilder(filter) {
        pagination_request_model_1.PaginationRequestModel.applyDefaultPaginationSetting(filter);
        return this.inventoryService.filter(filter);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_inventory_dto_1.FilterInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findWithFilder", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)({ path: '/inventory' }),
    __param(0, (0, common_1.Inject)(inventory_service_1.InventoryService)),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map