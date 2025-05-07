"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/containerDependencies.ts
const config_1 = require("./db/typeOrm/config");
// Implementaciones
const UserTypeOrmRepository_1 = __importDefault(require("./db/typeOrm/repositories/UserTypeOrmRepository"));
const auth_service_1 = require("./services/auth/auth.service");
const auth_1 = __importDefault(require("./controllers/auth"));
const RecipeTypeOrmRepository_1 = require("./db/typeOrm/repositories/RecipeTypeOrmRepository");
const recipe_1 = __importDefault(require("./services/recipe"));
const recipe_controller_1 = require("./controllers/recipes/recipe.controller");
// Crear el contenedor con estructura temporal
const temporaryContainer = {
    repositories: {},
    services: {},
    controllers: {},
};
// Inicializar las dependencias
function initializeContainer() {
    // Inicializar repositorios
    temporaryContainer.repositories = {
        user: new UserTypeOrmRepository_1.default(config_1.AppDataSource),
        recipe: new RecipeTypeOrmRepository_1.RecipeTypeOrmRepository(config_1.AppDataSource),
    };
    // Inicializar servicios
    temporaryContainer.services = {
        auth: new auth_service_1.AuthJsonWebTokenService(temporaryContainer.repositories.user),
        // user: new UserService(temporaryContainer.repositories.user),
        recipe: new recipe_1.default(temporaryContainer.repositories.recipe),
    };
    // Inicializar controladores
    temporaryContainer.controllers = {
        auth: new auth_1.default(temporaryContainer.services.auth),
        // user: new UserController(temporaryContainer.services.user),
        recipe: new recipe_controller_1.RecipeController(temporaryContainer.services.recipe),
    };
    return temporaryContainer;
}
// Inicializar y exportar el contenedor
const containerDependencies = initializeContainer();
exports.default = containerDependencies;
