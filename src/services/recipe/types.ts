import { RecipeDomain } from "../../domain/entities/Recipe";
export interface IBodyCreate {
  description: string;
  instructions: string[];
  ingredients: string[];
  image: string;
  title: string;
  userId: string;
}
export interface IRecipeService {
  getAllById(idUser: string): Promise<RecipeDomain[] | null>;
  create(arg0: IBodyCreate): Promise<RecipeDomain | null>;
  getDetail(idRecipe: string): Promise<RecipeDomain | null>;
}
