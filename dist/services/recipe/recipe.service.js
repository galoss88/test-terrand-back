"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = require("../../domain/entities/Recipe");
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
    async create({ description, instructions, ingredients, image, title, userId, }) {
        const recipeDomain = Recipe_1.RecipeDomain.create({
            title,
            description,
            image,
            ingredients,
            instructions,
            userId,
        });
        const created = await this.recipeRepository.create(recipeDomain);
        if (!created) {
            throw new Error("Falló la creacion de la receta");
        }
        return created;
    }
    async getDetail(idRecipe) {
        const detailRecipe = await this.recipeRepository.getById(idRecipe);
        if (!detailRecipe) {
            throw new Error("No se encontró la receta.");
        }
        return detailRecipe;
    }
    async update({ description, instructions, ingredients, image, title, id, }) {
        const idRecipe = id;
        const existingRecipe = await this.recipeRepository.getById(idRecipe);
        if (!existingRecipe) {
            throw new Error("No se encontró la receta para actualizar");
        }
        const updatedRecipe = Recipe_1.RecipeDomain.create({
            title: title ?? existingRecipe.title,
            description: description ?? existingRecipe.description,
            image: image ?? existingRecipe.image,
            ingredients: ingredients ?? existingRecipe.ingredients,
            instructions: instructions ?? existingRecipe.instructions,
            userId: existingRecipe.userId,
        });
        const updated = await this.recipeRepository.update(idRecipe, updatedRecipe);
        if (!updated) {
            throw new Error("Falló la actualización de la receta");
        }
        return updated;
    }
}
exports.default = RecipeService;
