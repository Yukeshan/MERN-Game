import express from "express";
import { login, logout, signup,checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { increaseScore } from "../controllers/auth.controller.js";



const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.get("/check",protectRoute,checkAuth);

router.patch("/increase-score", protectRoute, increaseScore);

export default router;