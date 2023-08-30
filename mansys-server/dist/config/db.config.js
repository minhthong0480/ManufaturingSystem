"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../modules/users/entities/user.entity");
const material_entity_1 = require("../modules/materials/entities/material.entity");
const customers_entity_1 = require("../modules/customers/entities/customers.entity");
const category_entity_1 = require("../modules/category/category.entity");
const billOfMaterial_entity_1 = require("../modules/billOfMaterial/entities/billOfMaterial.entity");
const product_entity_1 = require("../modules/products/entities/product.entity");
const contract_entity_1 = require("../modules/contract/entities/contract.entity");
const contract_item_entity_1 = require("../modules/contract/entities/contract-item.entity");
const timeline_entity_1 = require("../modules/timeline/entities/timeline.entity");
const contract_status_entity_1 = require("../modules/contract_status/entities/contract_status.entity");
const inventory_entity_1 = require("../modules/inventory/entities/inventory.entity");
const delivery_note_entity_1 = require("../modules/delivery-note/entities/delivery-note.entity");
const delivery_note_item_entity_1 = require("../modules/delivery-note/entities/delivery-note-item.entity");
const receiving_note_item_entity_1 = require("../modules/receiving-note/entities/receiving-note-item.entity");
const receiving_note_entity_1 = require("../modules/receiving-note/entities/receiving-note.entity");
const suppliers_entity_1 = require("../modules/suppliers/entities/suppliers.entity");
exports.default = () => ({
    type: 'postgres',
    host: process.env.DB_HOST ||
        'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'ubuntu',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dev',
    entities: [
        user_entity_1.User,
        material_entity_1.Material,
        customers_entity_1.Customer,
        category_entity_1.Category,
        billOfMaterial_entity_1.BillOfMaterial,
        product_entity_1.Product,
        contract_entity_1.Contract,
        contract_item_entity_1.ContractItem,
        timeline_entity_1.Timeline,
        contract_status_entity_1.ContractStatus,
        inventory_entity_1.Inventory,
        delivery_note_entity_1.DeliveryNote,
        delivery_note_item_entity_1.DeliveryNoteItem,
        receiving_note_entity_1.ReceivingNote,
        receiving_note_item_entity_1.ReceivingNoteItem,
        suppliers_entity_1.Supplier
    ],
    synchronize: true,
});
//# sourceMappingURL=db.config.js.map