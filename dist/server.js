"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./db/typeOrm/config");
const index_route_1 = __importDefault(require("./routes/index.route"));
const utils_1 = require("./utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ---------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------
const app = (0, express_1.default)();
// ---------------------------------------------------------------
// Cors
// ---------------------------------------------------------------
app.use((0, cors_1.default)({
    origin: "*", // o '*' para permitir todos
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// ---------------------------------------------------------------
// Middlewares de rutas
// ---------------------------------------------------------------
app.use(express_1.default.json());
// ---------------------------------------------------------------
// Ruta principales de la api
// ---------------------------------------------------------------
(0, utils_1.registerRoute)({ app, path: "/api/v1", router: index_route_1.default });
// ---------------------------------------------------------------
// Inicialización de la base de datos
// ---------------------------------------------------------------
config_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Base de datos conectada");
    app.listen(3003, () => {
        console.log("🚀 Servidor iniciado en http://localhost:3003");
    });
})
    .catch((err) => {
    console.error("❌ Error al conectar con la base de datos", err);
    process.exit(1);
});
//---------------------------------------------------------------
//Listener servidor
//---------------------------------------------------------------
app.listen(3003, () => {
    console.log("Server login");
});
