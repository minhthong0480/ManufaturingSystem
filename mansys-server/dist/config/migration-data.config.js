"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../modules/users/entities/user.entity");
const timeline_entity_1 = require("../modules/timeline/entities/timeline.entity");
const contract_status_entity_1 = require("../modules/contract_status/entities/contract_status.entity");
const contract_entity_1 = require("../modules/contract/entities/contract.entity");
const contract_item_entity_1 = require("../modules/contract/entities/contract-item.entity");
exports.default = () => ({
    type: 'postgres',
    host: process.env.DB_HOST ||
        'ec2-18-143-76-192.ap-southeast-1.compute.amazonaws.com',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'ubuntu',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dev',
    entities: [user_entity_1.User, timeline_entity_1.Timeline, contract_status_entity_1.ContractStatus, contract_entity_1.Contract, contract_item_entity_1.ContractItem],
    migrations: ['src/migrations/*.{ts,js}'],
    migrationsRun: true,
    synchronize: true,
});
//# sourceMappingURL=migration-data.config.js.map