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

// Definir la estructura del contenedor para mejor tipado
interface DependencyContainer {
  repositories: {
    user: IUserRepository;
    // recipe: IRecipeRepository;
  };
  services: {
    auth: IAuthService;
    // user: IUserService;
    // recipe: IRecipeService;
  };
  controllers: {
    auth: IAuthController;
    // user: IUserController;
    // recipe: IRecipeController;
  };
}

// Crear el contenedor con estructura temporal
const temporaryContainer: Partial<DependencyContainer> = {
  repositories: {} as any,
  services: {} as any,
  controllers: {} as any,
};

// Inicializar las dependencias
function initializeContainer(): DependencyContainer {
  // Inicializar repositorios
  temporaryContainer.repositories = {
    user: new UserTypeOrmRepository(AppDataSource),
    // recipe: new RecipeTypeOrmRepository(AppDataSource),
  };

  // Inicializar servicios
  temporaryContainer.services = {
    auth: new AuthJsonWebTokenService(temporaryContainer.repositories.user),
    // user: new UserService(temporaryContainer.repositories.user),
    // recipe: new RecipeService(temporaryContainer.repositories.recipe),
  };

  // Inicializar controladores
  temporaryContainer.controllers = {
    auth: new AuthController(temporaryContainer.services.auth),
    // user: new UserController(temporaryContainer.services.user),
    // recipe: new RecipeController(temporaryContainer.services.recipe),
  };

  return temporaryContainer as DependencyContainer;
}

// Inicializar y exportar el contenedor
const containerDependencies = initializeContainer();
console.log('containerDependencies',containerDependencies)
export default containerDependencies;
