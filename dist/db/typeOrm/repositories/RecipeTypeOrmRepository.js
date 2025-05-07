"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeOrmRepository = void 0;
const containerDependencies_1 = __importDefault(require("../../../containerDependencies"));
const entities_1 = require("../entities");
class RecipeTypeOrmRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.recipeEntityRepository = this.dataSource.getRepository(entities_1.RecipeEntity);
    }
    async getById(id) {
        const recipe = await this.recipeEntityRepository.findOne({
            where: { id: Number(id) },
            relations: { user: true },
        });
        if (!recipe)
            return null;
        const recipeDomain = recipe?.toDomain();
        return recipeDomain;
    }
    async getByUserId(id) {
        try {
            const idUser = id;
            const recipeEntityDb = await this.recipeEntityRepository.find({
                where: { user: { id: idUser } },
                relations: { user: true },
            });
            if (!recipeEntityDb) {
                return null;
            }
            const recipesDomain = recipeEntityDb.map((recipeDb) => {
                return recipeDb.toDomain();
            });
            return recipesDomain;
        }
        catch (e) {
            console.error(`Fallo la obtención de receta por usuario: ${e}`);
            return null;
        }
    }
    async create(recipeDomain) {
        try {
            const user = await containerDependencies_1.default.repositories.user.findById(recipeDomain.userId.toString());
            if (!user) {
                return null;
            }
            //Obtenemos la entidad usuario para relacionar
            const getUser = entities_1.UserEntity.fromDomain(user);
            const recipeEntity = new entities_1.RecipeEntity();
            const toSaveEntity = recipeEntity.fromDomain(recipeDomain);
            //Le asignamos el usuario
            // toSaveEntity.user = getUser;
            const savedEntity = await this.recipeEntityRepository.save(toSaveEntity);
            return savedEntity.toDomain();
        }
        catch (error) {
            console.error("Error creating recipe:", error);
            throw error;
        }
    }
    async update(id, recipeDomain) {
        try {
            const existingRecipe = await this.recipeEntityRepository.findOne({
                where: { id: Number(id) },
                relations: { user: true },
            });
            if (!existingRecipe) {
                return null;
            }
            const recipeEntity = new entities_1.RecipeEntity();
            const toUpdateEntity = recipeEntity.fromDomain(recipeDomain);
            toUpdateEntity.id = Number(id);
            toUpdateEntity.user = existingRecipe.user;
            const updatedEntity = await this.recipeEntityRepository.save(toUpdateEntity);
            return updatedEntity.toDomain();
        }
        catch (error) {
            console.error("Error updating recipe:", error);
            throw error;
        }
    }
}
exports.RecipeTypeOrmRepository = RecipeTypeOrmRepository;
