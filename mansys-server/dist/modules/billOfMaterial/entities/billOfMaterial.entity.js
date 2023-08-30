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
exports.BillOfMaterial = void 0;
const material_entity_1 = require("../../materials/entities/material.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
let BillOfMaterial = exports.BillOfMaterial = class BillOfMaterial {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BillOfMaterial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.billOfMaterials),
    __metadata("design:type", product_entity_1.Product)
], BillOfMaterial.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => material_entity_1.Material, material => material.billOfMaterials),
    __metadata("design:type", material_entity_1.Material)
], BillOfMaterial.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], BillOfMaterial.prototype, "quantity", void 0);
exports.BillOfMaterial = BillOfMaterial = __decorate([
    (0, typeorm_1.Entity)()
], BillOfMaterial);
//# sourceMappingURL=billOfMaterial.entity.js.map