"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillOfMaterialModule = void 0;
const common_1 = require("@nestjs/common");
const billOfMaterial_service_1 = require("./services/billOfMaterial.service");
const billOfMaterial_controller_1 = require("./controller/billOfMaterial.controller");
let BillOfMaterialModule = exports.BillOfMaterialModule = class BillOfMaterialModule {
};
exports.BillOfMaterialModule = BillOfMaterialModule = __decorate([
    (0, common_1.Module)({
        providers: [billOfMaterial_service_1.BillOfMaterialService],
        controllers: [billOfMaterial_controller_1.BillOfMaterialController]
    })
], BillOfMaterialModule);
//# sourceMappingURL=billOfMaterial.module.js.map