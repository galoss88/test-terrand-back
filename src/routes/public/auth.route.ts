// src/routes/public/auth.route.ts
import { Router } from "express";
import containerDependencies from "../../containerDependencies";

const router = Router();

router.post("/login", (req, res, next) =>
  containerDependencies.controllers.auth!.login(req, res, next)
);
router.post("/register", (req, res, next) =>
  containerDependencies.controllers.auth!.register(req, res, next)
);

export default router;
