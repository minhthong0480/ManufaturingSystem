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
exports.DeliveryNoteItemSerive = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const result_model_1 = require("../../../common/result-model");
const delivery_note_item_entity_1 = require("../entities/delivery-note-item.entity");
const products_service_1 = require("../../products/services/products.service");
const delivery_note_service_1 = require("./delivery-note.service");
const inventory_service_1 = require("../../inventory/services/inventory.service");
let DeliveryNoteItemSerive = exports.DeliveryNoteItemSerive = class DeliveryNoteItemSerive {
    constructor(deliveryNoteItemRepository, productsService, deliveryNoteSerive, inventoryService) {
        this.deliveryNoteItemRepository = deliveryNoteItemRepository;
        this.productsService = productsService;
        this.deliveryNoteSerive = deliveryNoteSerive;
        this.inventoryService = inventoryService;
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productsService.getOneById(dto.productId);
            if (!product) {
                return result_model_1.ResultModel.fail(dto, 'Product is not existed!');
            }
            const deliveryNote = yield this.deliveryNoteSerive.findOneById(dto.deliveryId);
            if (!deliveryNote) {
                return result_model_1.ResultModel.fail(dto, 'Delivery Note is not existed!');
            }
            const deliveryNoteItem = yield this.deliveryNoteItemRepository.save(dto);
            if (!deliveryNoteItem) {
                return result_model_1.ResultModel.fail(deliveryNoteItem, 'Create Delivery Note Item Failed');
            }
            const inventory = yield this.inventoryService.getOneByProductId(product.id);
            inventory.stockOut += dto.quantity;
            inventory.lastUpdate = new Date();
            yield this.inventoryService.save(inventory);
            return result_model_1.ResultModel.success(deliveryNoteItem, 'Delivery Note Item create successful!');
        });
    }
};
exports.DeliveryNoteItemSerive = DeliveryNoteItemSerive = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_note_item_entity_1.DeliveryNoteItem)),
    __param(1, (0, common_1.Inject)(products_service_1.ProductsService)),
    __param(2, (0, common_1.Inject)(delivery_note_service_1.DeliveryNoteSerive)),
    __param(3, (0, common_1.Inject)(inventory_service_1.InventoryService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        delivery_note_service_1.DeliveryNoteSerive,
        inventory_service_1.InventoryService])
], DeliveryNoteItemSerive);
//# sourceMappingURL=delivery-note-item.service.js.map