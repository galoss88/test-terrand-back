import { Router } from "express";
import recipesRoutes from "./private/recipes.route";
const router = Router();

router.use("/private", recipesRoutes);

export default router;
