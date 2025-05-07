import { Router } from "express";
import containerDependencies from "../../containerDependencies";

const router = Router();
//Obtener todas las recetas de un usuario
router.get("/", (req, res, next) => {
  containerDependencies.controllers.recipe.getRecipesById(req, res, next);
});
//Crear una receta a un usuario.
router.post("/", (req, res, next) => {
  containerDependencies.controllers.recipe.create(req, res, next);
});
//Obtener detalle de una receta
router.get("/:id", (req, res, next) => {
  containerDependencies.controllers.recipe.getDetail(req, res, next);
});
//Eliminar una receta
router.delete("/:idRecipe", (req, res) => {});
//Actualizar una receta
router.put("/", (req, res, next) => {
  containerDependencies.controllers.recipe.update(req, res, next);
});

export default router;
