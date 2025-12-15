import express from "express";
import { deleteProuct, getAllProducts, getProductById, postAddProduct, updateProduct, getProducts } from "../controllers/product.controller.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", requireAuth, requireAdmin, postAddProduct);
router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProuct);
export default router;