"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDomain = void 0;
class RecipeDomain {
    constructor(id, userId, title, description, ingredients, instructions, image) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.image = image;
    }
    static create(data) {
        return new RecipeDomain(data.id ?? null, data.userId, data.title, data.description, data.ingredients, data.instructions, data.image);
    }
}
exports.RecipeDomain = RecipeDomain;
