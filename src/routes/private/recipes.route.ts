import { Router } from "express";

const router = Router();
//Obtener todas las recetas de un usuario
router.get("/", (req, res) => {});
//Obtener detalle de una receta
router.get("/:id", (req, res) => {});
//Crear una receta a un usuario.
router.post("/:idUser", (req, res) => {});
//Eliminar una receta
router.delete("/:idRecipe", (req, res) => {});
//Actualizar una receta
router.put("/:idRecipe", (req, res) => {});

export default router;
