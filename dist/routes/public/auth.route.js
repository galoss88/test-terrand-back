"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/public/auth.route.ts
const express_1 = require("express");
const containerDependencies_1 = __importDefault(require("../../containerDependencies"));
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => containerDependencies_1.default.controllers.auth.login(req, res, next));
router.post("/register", (req, res, next) => containerDependencies_1.default.controllers.auth.register(req, res, next));
exports.default = router;
