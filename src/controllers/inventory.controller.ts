import { Request, Response } from "express";
import * as inventoryService from "../services/inventory.service";
import { InventoryTransactionModelType } from "../types/inventory.type";
import { productGetType } from "../types/product.type";

class InventoryController {
  /*--------------------
    // To insert inventory transaction
  ---------------------*/
  insertInventoryTransaction = async (req: Request, res: Response) => {
    try {
      const { productName, quantity, type } = req.body;

      if (!productName || !quantity || !type) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      if (quantity <= 0) {
        res.status(400).json({ error: "Quantity must be greater than zero" });
        return;
      }

      if (!["sale", "return", "purchase"].includes(type)) {
        res.status(400).json({ error: "Invalid transaction type" });
        return;
      }

      const result: InventoryTransactionModelType =
        await inventoryService.insertInventoryTransaction(
          productName,
          quantity,
          type
        );

      res.status(201).json({ success: true, result });
    } catch (err: any) {
      console.log("err: ", err);
      res.status(500).json({ success: false, error: err });
    }
  };

  /*--------------------
    // To get all inventory transactions
  ---------------------*/
  getInventoryTransactions = async (req: Request, res: Response) => {
    try {
      const result: productGetType[] = await inventoryService.getInventoryTransactions();
      if (result.length > 0) res.status(200).json({ success: true, result });
      else res.status(200).json({ success: true, result });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json({ success: false, error: err });
    }
  };
}

export default InventoryController;
