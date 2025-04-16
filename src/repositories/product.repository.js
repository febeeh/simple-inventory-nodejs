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
exports.ProductsRepository = void 0;
const product_model_1 = require("../models/product.model");
class ProductsRepository {
    constructor() {
        this.ProductsModel = (0, product_model_1.getModel)();
        /*--------------------
          // To insert product
        ---------------------*/
        this.insertProduct = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new this.ProductsModel(data).save();
                return result;
            }
            catch (err) {
                throw err;
            }
        });
        /*--------------------
          // To get product by params
        ---------------------*/
        this.getProduct = (...args_1) => __awaiter(this, [...args_1], void 0, function* (params = {}) {
            try {
                const result = (yield this.ProductsModel.findOne(params));
                return result;
            }
            catch (err) {
                throw err;
            }
        });
        /*--------------------
          // To get all products
        ---------------------*/
        this.getProducts = (...args_1) => __awaiter(this, [...args_1], void 0, function* (params = {}) {
            try {
                const result = (yield this.ProductsModel.find(params).lean());
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.ProductsRepository = ProductsRepository;
