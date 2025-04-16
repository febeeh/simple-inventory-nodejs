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
exports.InventoryTransactionsRepository = void 0;
const inventory_model_1 = require("../models/inventory.model");
class InventoryTransactionsRepository {
    constructor() {
        this.InventoryTransactionsModel = (0, inventory_model_1.getModel)();
        /*--------------------
          // To insert inventory transaction
        ---------------------*/
        this.insertInventoryTransaction = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield new this.InventoryTransactionsModel(data).save();
                return result;
            }
            catch (err) {
                throw err;
            }
        });
        /*--------------------
          // To get all inventory transactions
        ---------------------*/
        this.getInventoryTransactions = (...args_1) => __awaiter(this, [...args_1], void 0, function* (params = {}) {
            try {
                const result = (yield this.InventoryTransactionsModel.find(params).lean());
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.InventoryTransactionsRepository = InventoryTransactionsRepository;
