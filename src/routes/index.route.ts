import { Router } from "express";
import recipesRoutes from "./recipes.route";
const router = Router();

router.use("/recipes", recipesRoutes);

export default router;
