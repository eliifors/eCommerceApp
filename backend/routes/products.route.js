import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post
export default router;