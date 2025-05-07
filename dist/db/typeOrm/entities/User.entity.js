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
var UserEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../../domain/entities/User");
const Recipe_entity_1 = require("./Recipe.entity");
let UserEntity = UserEntity_1 = class UserEntity {
    // Método para convertir entidad de DB a entidad de dominio
    toDomain() {
        return User_1.User.create({
            id: this.id,
            name: this.name,
            email: this.email,
            passwordHash: this.password,
        });
    }
    // Método para convertir entidad de dominio a entidad de DB
    static fromDomain(user) {
        const entity = new UserEntity_1();
        // entity.id = user?.id ?? "";
        entity.name = user.name;
        entity.email = user.email;
        entity.password = user.passwordHash;
        return entity;
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Recipe_entity_1.RecipeEntity, (recipe) => recipe.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "recipes", void 0);
exports.UserEntity = UserEntity = UserEntity_1 = __decorate([
    (0, typeorm_1.Entity)("users")
], UserEntity);
