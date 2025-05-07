import { DataSource, Repository } from "typeorm";
import containerDependencies from "../../../containerDependencies";
import { ErrorMessage } from "../../../controllers/types";
import { RecipeDomain } from "../../../domain/entities/Recipe";
import { IRecipeRepository } from "../../../domain/repositories/IRecipeRepository";
import { RecipeEntity, UserEntity } from "../entities";

export class RecipeTypeOrmRepository implements IRecipeRepository {
  private recipeEntityRepository: Repository<RecipeEntity>;

  constructor(private dataSource: DataSource) {
    this.recipeEntityRepository = this.dataSource.getRepository(RecipeEntity);
  }
  public async getById(id: string): Promise<RecipeDomain | null> {
    const recipe = await this.recipeEntityRepository.findOne({
      where: { id: Number(id) },
      relations: { user: true },
    });

    if (!recipe) return null;
    
    const recipeDomain = recipe?.toDomain();

    return recipeDomain;
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

  public async create(
    recipeDomain: RecipeDomain
  ): Promise<RecipeDomain | null> {
    try {
      const user = await containerDependencies.repositories.user.findById(
        recipeDomain.userId.toString()
      );
      if (!user) {
        return null;
      }
      //Obtenemos la entidad usuario para relacionar
      const getUser = UserEntity.fromDomain(user);
      const recipeEntity = new RecipeEntity();
      const toSaveEntity = recipeEntity.fromDomain(recipeDomain);
      //Le asignamos el usuario
      // toSaveEntity.user = getUser;
      const savedEntity = await this.recipeEntityRepository.save(toSaveEntity);

      return savedEntity.toDomain();
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  }
}
