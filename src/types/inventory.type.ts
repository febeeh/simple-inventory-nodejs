import mongoose from "mongoose";

// Interface for Inventory Transaction
export interface InventoryTransactionModelType {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  type: string; // e.g., "sale", "return", "purchase"
  createdAt: Date;
  updatedAt: Date;
}
