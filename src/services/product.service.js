"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.insertProduct = void 0;
const product_repository_1 = require("../repositories/product.repository");
const productsRepository = new product_repository_1.ProductsRepository();
/*--------------------
    // To insert product
  ---------------------*/
const insertProduct = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsRepository.getProduct({
            name: name,
        });
        if (product) {
            throw "Product already added";
        }
        const insert = yield productsRepository.insertProduct({
            name: name,
        });
        return insert;
    }
    catch (err) {
        throw err;
    }
});
exports.insertProduct = insertProduct;
/*--------------------
    // To get all products
  ---------------------*/
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsRepository.getProducts();
        return products;
    }
    catch (err) {
        throw err;
    }
});
exports.getProducts = getProducts;
