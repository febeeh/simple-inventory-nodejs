"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
// Create an instance of ProductController
let productController = new product_controller_1.default();
// Create a new router instance
const router = (0, express_1.Router)();
// Product Routes
router.route("/getProducts").get(productController.getProducts);
router.route("/insertProduct").post(productController.insertProduct);
exports.default = router;
