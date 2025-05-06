import { Router } from "express";

const router = Router();
//Obtener todas las recetas de un usuario
router.get("/", () => {});
//Obtener detalle de una receta
router.get("/:id", () => {});
//Crear una receta a un usuario.
router.post("/:idUser");
//Eliminar una receta
router.delete("/:idRecipe");
//Actualizar una receta
router.put("/:idRecipe");

export default router;
