import { RecipeDomain } from "../../domain/entities/Recipe";

export interface IRecipeService {
    getAllById(idUser: string): Promise<RecipeDomain[] | null>;
}
