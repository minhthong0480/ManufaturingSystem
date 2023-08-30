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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const inventory_entity_1 = require("../../inventory/entities/inventory.entity");
const billOfMaterial_entity_1 = require("../../billOfMaterial/entities/billOfMaterial.entity");
const category_entity_1 = require("../../category/category.entity");
const typeorm_1 = require("typeorm");
const delivery_note_item_entity_1 = require("../../delivery-note/entities/delivery-note-item.entity");
const receiving_note_item_entity_1 = require("../../receiving-note/entities/receiving-note-item.entity");
let Product = exports.Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Product.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
        default: new Date(),
    }),
    __metadata("design:type", Date)
], Product.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.Inventory, (inventory) => inventory.product),
    __metadata("design:type", Array)
], Product.prototype, "inventories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_note_item_entity_1.DeliveryNoteItem, (deliveryItem) => deliveryItem.product),
    __metadata("design:type", Array)
], Product.prototype, "deliveryNoteItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receiving_note_item_entity_1.ReceivingNoteItem, (receivingNoteItem) => receivingNoteItem.product),
    __metadata("design:type", Array)
], Product.prototype, "receivingNoteItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => billOfMaterial_entity_1.BillOfMaterial, (billOfMaterial) => billOfMaterial.product),
    __metadata("design:type", Array)
], Product.prototype, "billOfMaterials", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('product')
], Product);
//# sourceMappingURL=product.entity.js.map