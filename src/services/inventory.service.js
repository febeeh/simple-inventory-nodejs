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
exports.getInventoryTransactions = exports.insertInventoryTransaction = void 0;
const inventory_repository_1 = require("../repositories/inventory.repository");
const product_repository_1 = require("../repositories/product.repository");
const inventoryTransactionRepository = new inventory_repository_1.InventoryTransactionsRepository();
const productsRepository = new product_repository_1.ProductsRepository();
/*--------------------
    // To insert car data
  ---------------------*/
const insertInventoryTransaction = (name, quantity, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsRepository.getProduct({ name: name });
        if (!product) {
            throw "Product not found";
        }
        // Calculate current stock
        const transactions = yield inventoryTransactionRepository.getInventoryTransactions({
            productId: product._id,
        });
        const currentStock = transactions.reduce((sum, tx) => {
            const sign = tx.type === "sale" ? -1 : 1;
            return sum + sign * tx.quantity;
        }, 0);
        // Validation: prevent stock from going below zero
        const stockChange = type === "sale" ? -quantity : quantity;
        const newStock = currentStock + stockChange;
        if (newStock < 0) {
            throw "No enough stocks available for this transaction";
        }
        const transaction = yield inventoryTransactionRepository.insertInventoryTransaction({
            productId: product._id,
            quantity,
            type,
        });
        return transaction;
    }
    catch (err) {
        throw err;
    }
});
exports.insertInventoryTransaction = insertInventoryTransaction;
/*--------------------
    // To get InventoryTransaction
  ---------------------*/
const getInventoryTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsRepository.getProducts();
        const stockLevels = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const transactions = yield inventoryTransactionRepository.getInventoryTransactions({
                productId: product._id,
            });
            const totalStock = transactions.reduce((sum, tx) => {
                const sign = tx.type === "sale" ? -1 : 1;
                return sum + sign * tx.quantity;
            }, 0);
            return {
                product: {
                    id: product._id,
                    name: product.name,
                },
                stock: totalStock,
            };
        })));
        return stockLevels;
    }
    catch (err) {
        throw err;
    }
});
exports.getInventoryTransactions = getInventoryTransactions;
