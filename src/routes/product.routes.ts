import { Router } from "express";
import ProductController from "../controllers/product.controller";

// Create an instance of ProductController
let productController: ProductController = new ProductController();

// Create a new router instance
const router = Router();

// Product Routes
router.route("/getProducts").get(productController.getProducts);
router.route("/insertProduct").post(productController.insertProduct);

export default router;
