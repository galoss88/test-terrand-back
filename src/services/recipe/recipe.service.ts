import { RecipeDomain } from "../../domain/entities/Recipe";
import { IRecipeRepository } from "../../domain/repositories/IRecipeRepository";
import { IRecipeService } from "./types";

export default class RecipeService implements IRecipeService {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  public async getAllById(idUser: string): Promise<RecipeDomain[] | null> {
    //Obtenemos receta del usuario
    const recipesUser = await this.recipeRepository.getByUserId(idUser);
    if (!recipesUser) {
      throw new Error(`No se encontraron recetas`);
    }
    return recipesUser;
  }
}
