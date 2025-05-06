import { Router } from "express";
import recipeRoutes from "./recipes.route";
import userRoutes from "./user.route";

const router = Router();

router.use("/recipes", recipeRoutes);
router.use("/user", userRoutes);

export default router;
