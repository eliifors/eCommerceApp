import express from "express";
import { deleteProuct, getAllProducts, getProductById, postAddProduct, updateProduct } from "../controllers/product.controller";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/",requireAdmin, requireAuth, postAddProduct);
router.post("/:id", requireAdmin, requireAuth, updateProduct);
router.post("/:id",requireAdmin, requireAuth, deleteProuct);
export default router;