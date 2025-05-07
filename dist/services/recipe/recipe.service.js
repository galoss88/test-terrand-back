"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    async getAllById(idUser) {
        //Obtenemos receta del usuario
        const recipesUser = await this.recipeRepository.getByUserId(idUser);
        if (!recipesUser) {
            throw new Error(`No se encontraron recetas`);
        }
        return recipesUser;
    }
}
exports.default = RecipeService;
