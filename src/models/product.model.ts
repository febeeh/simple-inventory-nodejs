import mongoose, { Schema } from "mongoose";
import { mongoConnection } from "../connections/connect.db";
import { ProductModelType } from "../types/product.type";

// Schema for Product
const ProductScheme: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
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
  const ProductModel = mongoConnection.model<ProductModelType>(
    "products",
    ProductScheme
  );
  return ProductModel;
};
