"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RecipeEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeEntity = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("../../../domain/entities/Recipe");
const User_entity_1 = require("./User.entity");
let RecipeEntity = RecipeEntity_1 = class RecipeEntity extends typeorm_1.BaseEntity {
    toDomain() {
        const recipeDomain = Recipe_1.RecipeDomain.create({
            id: this.id,
            description: this.description,
            image: this.imageUrl,
            ingredients: this.ingredients,
            instructions: this.instructions,
            title: this.title,
        });
        return recipeDomain;
    }
    fromDomain(recipe) {
        const recipeEntity = new RecipeEntity_1();
        recipeEntity.description = recipe.description;
        recipeEntity.imageUrl = recipe.image;
        recipeEntity.ingredients = recipe.ingredients;
        recipeEntity.instructions = recipe.instructions;
        return recipeEntity;
    }
};
exports.RecipeEntity = RecipeEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], RecipeEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], RecipeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, (user) => user.recipes),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_entity_1.UserEntity)
], RecipeEntity.prototype, "user", void 0);
exports.RecipeEntity = RecipeEntity = RecipeEntity_1 = __decorate([
    (0, typeorm_1.Entity)("recipes")
], RecipeEntity);
