import { RecipeDomain } from "../../domain/entities/Recipe";
import { IRecipeRepository } from "../../domain/repositories/IRecipeRepository";
import { IBodyCreate, IBodyUpdate, IRecipeService } from "./types";

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

  public async getDetail(idRecipe: string): Promise<RecipeDomain | null> {
    const detailRecipe = await this.recipeRepository.getById(idRecipe);
    if (!detailRecipe) {
      throw new Error("No se encontró la receta.");
    }
    return detailRecipe;
  }

  public async update({
    description,
    instructions,
    ingredients,
    image,
    title,
    id,
  }: IBodyUpdate): Promise<RecipeDomain> {
    const idRecipe = id;
    const existingRecipe = await this.recipeRepository.getById(idRecipe);
    if (!existingRecipe) {
      throw new Error("No se encontró la receta para actualizar");
    }

    const updatedRecipe = RecipeDomain.create({
      title: title ?? existingRecipe.title,
      description: description ?? existingRecipe.description,
      image: image ?? existingRecipe.image,
      ingredients: ingredients ?? existingRecipe.ingredients,
      instructions: instructions ?? existingRecipe.instructions,
      userId: existingRecipe.userId,
    });

    const updated = await this.recipeRepository.update(idRecipe, updatedRecipe);
    if (!updated) {
      throw new Error("Falló la actualización de la receta");
    }

    return updated;
  }
}
