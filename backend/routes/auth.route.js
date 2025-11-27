import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/me", requireAuth);
router.get("/admin/test", requireAuth, requireAdmin)

 export default router;