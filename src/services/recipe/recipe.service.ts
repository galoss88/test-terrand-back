import { RecipeDomain } from "../../domain/entities/Recipe";
import { IRecipeRepository } from "../../domain/repositories/IRecipeRepository";
import { IBodyCreate, IRecipeService } from "./types";

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

  public async create({
    description,
    instructions,
    ingredients,
    image,
    title,
    userId,
  }: IBodyCreate): Promise<RecipeDomain> {
    const recipeDomain = RecipeDomain.create({
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
}
