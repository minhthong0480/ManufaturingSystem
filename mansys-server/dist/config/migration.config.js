"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const migration_data_config_1 = require("./migration-data.config");
const datasource = new typeorm_1.DataSource((0, migration_data_config_1.default)());
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=migration.config.js.map