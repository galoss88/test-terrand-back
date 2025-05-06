// src/routes/public/auth.route.ts
import { Router } from "express";
import containerDependencies from "../../containerDependencies";

const router = Router();

router.post("/login", containerDependencies.controllers.auth?.login);
// router.post("/register", ctrl.);

export default router;
