"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const db_config_1 = require("./config/db.config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./modules/users/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const material_module_1 = require("./modules/materials/material.module");
const customers_module_1 = require("./modules/customers/customers.module");
const category_module_1 = require("./modules/category/category.module");
const products_module_1 = require("./modules/products/products.module");
const billOfMaterial_module_1 = require("./modules/billOfMaterial/billOfMaterial.module");
const timeline_module_1 = require("./modules/timeline/timeline.module");
const contract_module_1 = require("./modules/contract/contract.module");
const contract_status_module_1 = require("./modules/contract_status/contract_status.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const delivery_module_1 = require("./modules/delivery-note/delivery.module");
const receiving_note_module_1 = require("./modules/receiving-note/receiving-note.module");
const suppliers_module_1 = require("./modules/suppliers/suppliers.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [db_config_1.default],
                expandVariables: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: db_config_1.default,
            }),
            user_module_1.UserModule,
            material_module_1.MaterialModule,
            customers_module_1.CustomersModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            products_module_1.ProductsModule,
            billOfMaterial_module_1.BillOfMaterialModule,
            timeline_module_1.TimelineModule,
            contract_module_1.ContractModule,
            contract_status_module_1.ContractStatusModule,
            inventory_module_1.InventoryModule,
            delivery_module_1.DeliveryNoteModule,
            receiving_note_module_1.ReceivingNoteModule,
            suppliers_module_1.SupplierModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map