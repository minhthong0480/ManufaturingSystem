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
exports.DeliveryNoteItemController = void 0;
const common_1 = require("@nestjs/common");
const delivery_note_item_service_1 = require("../services/delivery-note-item.service");
const create_delivery_note_item_dto_1 = require("../dto/create-delivery-note-item.dto");
let DeliveryNoteItemController = exports.DeliveryNoteItemController = class DeliveryNoteItemController {
    constructor(deliveryNoteItemSerive) {
        this.deliveryNoteItemSerive = deliveryNoteItemSerive;
    }
    create(dto) {
        return this.deliveryNoteItemSerive.create(dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_note_item_dto_1.CreateDeliveryNoteItemDto]),
    __metadata("design:returntype", void 0)
], DeliveryNoteItemController.prototype, "create", null);
exports.DeliveryNoteItemController = DeliveryNoteItemController = __decorate([
    (0, common_1.Controller)('delivery-note-items'),
    __param(0, (0, common_1.Inject)(delivery_note_item_service_1.DeliveryNoteItemSerive)),
    __metadata("design:paramtypes", [delivery_note_item_service_1.DeliveryNoteItemSerive])
], DeliveryNoteItemController);
//# sourceMappingURL=delivery-note-item.controller.js.map