import { RecipeDomain } from "../entities/Recipe";

export interface IRecipeRepository {
  /**
   * Obtiene todas las recetas asociadas a un usuario.
   * @param userId - Identificador del usuario.
   * @returns Arreglo de dominios de receta o null si no hay resultados.
   */
  
  getByUserId(id: string): Promise<RecipeDomain[] | null>;
  /**
   * Crea y persiste una nueva receta en la base de datos.
   * @param recipe - Objeto de dominio con los datos de la receta (sin id o con id=null).
   * @returns El dominio de receta con el id asignado.
   */
  create(recipe: RecipeDomain): Promise<RecipeDomain | null>;
}
