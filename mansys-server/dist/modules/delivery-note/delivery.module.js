"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryNoteModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const delivery_note_entity_1 = require("./entities/delivery-note.entity");
const common_1 = require("@nestjs/common");
const delivery_note_item_entity_1 = require("./entities/delivery-note-item.entity");
const delivery_note_service_1 = require("./services/delivery-note.service");
const delivery_note_controller_1 = require("./controllers/delivery-note.controller");
const customers_module_1 = require("../customers/customers.module");
const delivery_note_item_controller_1 = require("./controllers/delivery-note-item.controller");
const delivery_note_item_service_1 = require("./services/delivery-note-item.service");
const products_module_1 = require("../products/products.module");
const inventory_module_1 = require("../inventory/inventory.module");
let DeliveryNoteModule = exports.DeliveryNoteModule = class DeliveryNoteModule {
};
exports.DeliveryNoteModule = DeliveryNoteModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([delivery_note_entity_1.DeliveryNote, delivery_note_item_entity_1.DeliveryNoteItem]),
            customers_module_1.CustomersModule,
            products_module_1.ProductsModule,
            inventory_module_1.InventoryModule,
        ],
        controllers: [delivery_note_controller_1.DeliveryNoteController, delivery_note_item_controller_1.DeliveryNoteItemController],
        providers: [delivery_note_service_1.DeliveryNoteSerive, delivery_note_item_service_1.DeliveryNoteItemSerive],
        exports: [],
    })
], DeliveryNoteModule);
//# sourceMappingURL=delivery.module.js.map