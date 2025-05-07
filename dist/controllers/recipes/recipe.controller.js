"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    async getRecipesById(req, res, next) {
        try {
            const idUser = req?.user?.id;
            if (!idUser) {
                throw new Error("No hay usuario de quien obtener las recetas");
            }
            const recipesUser = this.recipeService.getAllById(idUser);
            res.status(200).json(recipesUser);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RecipeController = RecipeController;
