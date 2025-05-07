// src/containerDependencies.ts
import { AppDataSource } from "./db/typeOrm/config";

// Interfaces
import { IUserRepository } from "./domain/repositories/IUserRepository";

// Implementaciones
import UserTypeOrmRepository from "./db/typeOrm/repositories/UserTypeOrmRepository";
import { AuthJsonWebTokenService } from "./services/auth/auth.service";

import AuthController from "./controllers/auth";
import { IAuthController } from "./controllers/auth/types";
import { IAuthService } from "./services/auth/types";
import { RecipeTypeOrmRepository } from "./db/typeOrm/repositories/RecipeTypeOrmRepository";
import { IRecipeRepository } from "./domain/repositories/IRecipeRepository";
import { IRecipeService } from "./services/recipe/types";
import { IRecipeController } from "./controllers/recipes/types";
import RecipeService from "./services/recipe";
import { RecipeController } from "./controllers/recipes/recipe.controller";

// Definir la estructura del contenedor para mejor tipado
interface IDependencyContainer {
  repositories: {
    user: IUserRepository;
    recipe: IRecipeRepository;
  };
  services: {
    auth: IAuthService;
    // user: IUserService;
    recipe: IRecipeService;
  };
  controllers: {
    auth: IAuthController;
    // user: IUserController;
    recipe: IRecipeController;
  };
}

// Crear el contenedor con estructura temporal
const temporaryContainer: Partial<IDependencyContainer> = {
  repositories: {} as any,
  services: {} as any,
  controllers: {} as any,
};

// Inicializar las dependencias
function initializeContainer(): IDependencyContainer {
  // Inicializar repositorios
  temporaryContainer.repositories = {
    user: new UserTypeOrmRepository(AppDataSource),
    recipe: new RecipeTypeOrmRepository(AppDataSource),
  };

  // Inicializar servicios
  temporaryContainer.services = {
    auth: new AuthJsonWebTokenService(temporaryContainer.repositories.user),
    // user: new UserService(temporaryContainer.repositories.user),
    recipe: new RecipeService(temporaryContainer.repositories.recipe),
  };

  // Inicializar controladores
  temporaryContainer.controllers = {
    auth: new AuthController(temporaryContainer.services.auth),
    // user: new UserController(temporaryContainer.services.user),
    recipe: new RecipeController(temporaryContainer.services.recipe),
  };

  return temporaryContainer as IDependencyContainer;
}

// Inicializar y exportar el contenedor
const containerDependencies = initializeContainer();

export default containerDependencies;
