"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const containerDependencies_1 = __importDefault(require("../../containerDependencies"));
const router = (0, express_1.Router)();
//Obtener todas las recetas de un usuario
router.get("/", (req, res, next) => {
    containerDependencies_1.default.controllers.recipe.getRecipesById(req, res, next);
});
//Obtener detalle de una receta
router.get("/:id", (req, res) => { });
//Crear una receta a un usuario.
router.post("/:idUser", (req, res) => { });
//Eliminar una receta
router.delete("/:idRecipe", (req, res) => { });
//Actualizar una receta
router.put("/:idRecipe", (req, res) => { });
exports.default = router;
