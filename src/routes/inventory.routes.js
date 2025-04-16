"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = __importDefault(require("../controllers/inventory.controller"));
// Create an instance of InventoryController
const inventoryController = new inventory_controller_1.default();
// Create a new router instance
const router = (0, express_1.Router)();
// Inventory Routes
router.route("/stock").get(inventoryController.getInventoryTransactions);
router
    .route("/transaction")
    .post(inventoryController.insertInventoryTransaction);
exports.default = router;
