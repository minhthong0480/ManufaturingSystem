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
exports.DeliveryNoteController = void 0;
const common_1 = require("@nestjs/common");
const delivery_note_service_1 = require("../services/delivery-note.service");
const create_delivery_note_dto_1 = require("../dto/create-delivery-note.dto");
const filter_delivery_note_dto_1 = require("../dto/filter-delivery-note.dto");
let DeliveryNoteController = exports.DeliveryNoteController = class DeliveryNoteController {
    constructor(deliveryNoteSerive) {
        this.deliveryNoteSerive = deliveryNoteSerive;
    }
    create(dto) {
        return this.deliveryNoteSerive.create(dto);
    }
    filter(dto) {
        return this.deliveryNoteSerive.filter(dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_note_dto_1.CreateDeliveryNoteDto]),
    __metadata("design:returntype", void 0)
], DeliveryNoteController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/filter/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_delivery_note_dto_1.FilterDeliveryNoteDto]),
    __metadata("design:returntype", void 0)
], DeliveryNoteController.prototype, "filter", null);
exports.DeliveryNoteController = DeliveryNoteController = __decorate([
    (0, common_1.Controller)('delivery-notes'),
    __param(0, (0, common_1.Inject)(delivery_note_service_1.DeliveryNoteSerive)),
    __metadata("design:paramtypes", [delivery_note_service_1.DeliveryNoteSerive])
], DeliveryNoteController);
//# sourceMappingURL=delivery-note.controller.js.map