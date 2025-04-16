import { Router } from "express";
import InventoryController from "../controllers/inventory.controller";

// Create an instance of InventoryController
const inventoryController: InventoryController = new InventoryController();

// Create a new router instance
const router = Router();

// Inventory Routes
router.route("/stock").get(inventoryController.getInventoryTransactions);
router
  .route("/transaction")
  .post(inventoryController.insertInventoryTransaction);

export default router;
