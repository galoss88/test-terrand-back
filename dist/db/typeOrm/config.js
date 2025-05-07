"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
// Cargar variables de entorno
dotenv_1.default.config();
// —— DEBUG: comprobar variables —— 
console.log("╔═🛠️  ENV VARIABLES 🛠️═╗");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : undefined);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_SYNC:", process.env.DB_SYNC);
console.log("DB_LOGGING:", process.env.DB_LOGGING);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("═══════════════════════");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST || "localhost",
    // port: parseInt(process.env.DB_PORT || "5432"),
    // username: process.env.DB_USERNAME || "postgres",
    // password: process.env.DB_PASSWORD || "78914526",
    // database: process.env.DB_NAME || "terrand_db",
    synchronize: process.env.DB_SYNC === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: [entities_1.UserEntity, entities_1.RecipeEntity],
    subscribers: [],
    migrations: [],
});
