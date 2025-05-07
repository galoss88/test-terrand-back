"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeTypeOrmRepository = void 0;
const entities_1 = require("../entities");
class RecipeTypeOrmRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.recipeEntityRepository = this.dataSource.getRepository(entities_1.RecipeEntity);
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
}
exports.RecipeTypeOrmRepository = RecipeTypeOrmRepository;
