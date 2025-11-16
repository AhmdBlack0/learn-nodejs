import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

export default router;
