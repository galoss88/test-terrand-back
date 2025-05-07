"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDomain = void 0;
class RecipeDomain {
    constructor(id, title, description, ingredients, instructions, image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.image = image;
    }
    static create({ id, title, description, ingredients, instructions, image, }) {
        return new RecipeDomain(id, title, description, ingredients, instructions, image);
    }
}
exports.RecipeDomain = RecipeDomain;
