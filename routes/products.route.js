import express from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
} from "../controllers/products.controllers.js";

const router = express.Router();

router.post("/products/", addProduct);
router.get("/products/", getProducts);
router.get("/products/:id", getProduct);
router.delete("/products/:id", deleteProduct);

export default router;
