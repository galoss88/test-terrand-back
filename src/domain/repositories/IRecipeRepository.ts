import { RecipeDomain } from "../entities/Recipe";

export interface IRecipeRepository {
  getByUserId(id: string): Promise<RecipeDomain[] | null>;
}
