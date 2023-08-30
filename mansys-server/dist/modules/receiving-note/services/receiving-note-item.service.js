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
exports.ReceivingNoteItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const receiving_note_item_entity_1 = require("../entities/receiving-note-item.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../../products/services/products.service");
const result_model_1 = require("../../../common/result-model");
const receiving_note_service_1 = require("./receiving-note.service");
const inventory_service_1 = require("../../inventory/services/inventory.service");
let ReceivingNoteItemService = exports.ReceivingNoteItemService = class ReceivingNoteItemService {
    constructor(receivingNoteItemRepository, receivingNoteService, productService, inventoryService) {
        this.receivingNoteItemRepository = receivingNoteItemRepository;
        this.receivingNoteService = receivingNoteService;
        this.productService = productService;
        this.inventoryService = inventoryService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getOneById(dto.productId);
            if (!product) {
                return result_model_1.ResultModel.fail('', 'Product not found!');
            }
            const receivingNote = yield this.receivingNoteService.getOneById(dto.receivingNoteId);
            if (!receivingNote) {
                return result_model_1.ResultModel.fail('', 'Receiving Note not found!');
            }
            const receivingNoteItem = yield this.receivingNoteItemRepository.save(dto);
            if (!receivingNoteItem) {
                return result_model_1.ResultModel.fail('', 'Create Receiving Note Item failed!');
            }
            const inventory = yield this.inventoryService.getOneByProductId(dto.productId);
            if (inventory) {
                inventory.stockIn += dto.quantity;
                yield this.inventoryService.save(inventory);
            }
            return result_model_1.ResultModel.fail(receivingNoteItem, 'Create Receiving Note Item successful!');
        });
    }
};
exports.ReceivingNoteItemService = ReceivingNoteItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(receiving_note_item_entity_1.ReceivingNoteItem)),
    __param(1, (0, common_1.Inject)(receiving_note_service_1.ReceivingNoteService)),
    __param(2, (0, common_1.Inject)(products_service_1.ProductsService)),
    __param(3, (0, common_1.Inject)(inventory_service_1.InventoryService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        receiving_note_service_1.ReceivingNoteService,
        products_service_1.ProductsService,
        inventory_service_1.InventoryService])
], ReceivingNoteItemService);
//# sourceMappingURL=receiving-note-item.service.js.map