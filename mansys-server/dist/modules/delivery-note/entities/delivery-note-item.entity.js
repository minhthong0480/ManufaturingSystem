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
exports.DeliveryNoteItem = void 0;
const typeorm_1 = require("typeorm");
const delivery_note_entity_1 = require("./delivery-note.entity");
const product_entity_1 = require("../../products/entities/product.entity");
let DeliveryNoteItem = exports.DeliveryNoteItem = class DeliveryNoteItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "deliveryNoteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => delivery_note_entity_1.DeliveryNote, (delivery) => delivery.deliveryNoteItems),
    __metadata("design:type", delivery_note_entity_1.DeliveryNote)
], DeliveryNoteItem.prototype, "deliveryNote", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.deliveryNoteItems),
    __metadata("design:type", product_entity_1.Product)
], DeliveryNoteItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], DeliveryNoteItem.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], DeliveryNoteItem.prototype, "remarks", void 0);
exports.DeliveryNoteItem = DeliveryNoteItem = __decorate([
    (0, typeorm_1.Entity)('delivery_note_items')
], DeliveryNoteItem);
//# sourceMappingURL=delivery-note-item.entity.js.map