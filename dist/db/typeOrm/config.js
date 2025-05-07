"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "78914526",
    database: "terrand_db",
    synchronize: true,
    logging: false,
    entities: [entities_1.UserEntity, entities_1.RecipeEntity],
    subscribers: [],
    migrations: [],
    // logger: "simple-console",
});
