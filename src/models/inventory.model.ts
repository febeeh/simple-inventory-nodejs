import mongoose, { Schema } from "mongoose";
import { mongoConnection } from "../connections/connect.db";
import { InventoryTransactionModelType } from "../types/inventory.type";

// Schema for Inventory Transaction
const InventoryTransactionSchema: Schema = new mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      enum: ["sale", "return", "purchase"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const getModel = () => {
  const ProductModel = mongoConnection.model<InventoryTransactionModelType>(
    "InventoryTransaction",
    InventoryTransactionSchema
  );
  return ProductModel;
};
