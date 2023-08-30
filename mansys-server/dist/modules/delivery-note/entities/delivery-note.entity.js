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
exports.DeliveryNote = void 0;
const customers_entity_1 = require("../../customers/entities/customers.entity");
const typeorm_1 = require("typeorm");
const delivery_note_item_entity_1 = require("./delivery-note-item.entity");
let DeliveryNote = exports.DeliveryNote = class DeliveryNote {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeliveryNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeliveryNote.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customers_entity_1.Customer, (customer) => customer.deliverieNotes),
    __metadata("design:type", customers_entity_1.Customer)
], DeliveryNote.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_note_item_entity_1.DeliveryNoteItem, (deliveryNoteItem) => deliveryNoteItem.deliveryNote, {
        eager: true,
    }),
    __metadata("design:type", Array)
], DeliveryNote.prototype, "deliveryNoteItems", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Date)
], DeliveryNote.prototype, "deliveryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], DeliveryNote.prototype, "salesOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], DeliveryNote.prototype, "deliveryBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], DeliveryNote.prototype, "remarks", void 0);
exports.DeliveryNote = DeliveryNote = __decorate([
    (0, typeorm_1.Entity)('delivery_notes')
], DeliveryNote);
//# sourceMappingURL=delivery-note.entity.js.map