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
            const recipesUser = await this.recipeService.getAllById(idUser);
            res.status(200).json(recipesUser);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const bodyWithUserId = {
                ...req.body,
                userId: req.user?.id,
            };
            const recipeCreated = await this.recipeService.create(bodyWithUserId);
            res.status(200).json(recipeCreated);
        }
        catch (e) {
            next(e);
        }
    }
    async getDetail(req, res, next) {
        try {
            const idRecipe = req.params.id;
            const recipeDetail = await this.recipeService.getDetail(idRecipe);
            res.status(200).json(recipeDetail);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const body = req.body;
            const recipeUpdated = await this.recipeService.update(body);
            res.status(200).json(recipeUpdated);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.RecipeController = RecipeController;
