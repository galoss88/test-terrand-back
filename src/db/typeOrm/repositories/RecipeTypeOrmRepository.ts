import { DataSource, Repository } from "typeorm";
import { ErrorMessage } from "../../../controllers/types";
import { RecipeDomain } from "../../../domain/entities/Recipe";
import { IRecipeRepository } from "../../../domain/repositories/IRecipeRepository";
import { RecipeEntity } from "../entities";

export class RecipeTypeOrmRepository implements IRecipeRepository {
  private recipeEntityRepository: Repository<RecipeEntity>;

  constructor(private dataSource: DataSource) {
    this.recipeEntityRepository = this.dataSource.getRepository(RecipeEntity);
  }

  public async getByUserId(id: string): Promise<RecipeDomain[] | null> {
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
    } catch (e: ErrorMessage) {
      console.error(`Fallo la obtención de receta por usuario: ${e}`);
      return null;
    }
  }
}
