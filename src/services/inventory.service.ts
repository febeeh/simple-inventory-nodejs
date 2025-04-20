import mongoose from "mongoose";
import { InventoryTransactionsRepository } from "../repositories/inventory.repository";
import { ProductsRepository } from "../repositories/product.repository";
import { InventoryTransactionModelType } from "../types/inventory.type";
import { productGetType, ProductModelType } from "../types/product.type";

const inventoryTransactionRepository: InventoryTransactionsRepository =
  new InventoryTransactionsRepository();

const productsRepository: ProductsRepository = new ProductsRepository();

/*--------------------
    // To insert car data
  ---------------------*/
export const insertInventoryTransaction = async (
  productId: string,
  quantity: number,
  type: string
): Promise<InventoryTransactionModelType> => {
  try {
    console.log("productId: ", productId);
    const product = await productsRepository.getProduct({ _id: productId });
    if (!product) {
      throw "Product not found";
    }

    // Calculate current stock
    const transactions: InventoryTransactionModelType[] =
      await inventoryTransactionRepository.getInventoryTransactions({
        productId: product._id,
      });
    const currentStock: number = transactions.reduce((sum, tx) => {
      const sign = tx.type === "sale" ? -1 : 1;
      return sum + sign * tx.quantity;
    }, 0);

    // Validation: prevent stock from going below zero
    const stockChange: number = type === "sale" ? -quantity : quantity;
    const newStock: number = currentStock + stockChange;

    if (newStock < 0) {
      throw "No enough stocks available for this transaction";
    }

    const transaction: InventoryTransactionModelType =
      await inventoryTransactionRepository.insertInventoryTransaction({
        productId: product._id,
        quantity,
        type,
      });

    return transaction;
  } catch (err) {
    throw err;
  }
};

/*--------------------
    // To get InventoryTransaction
  ---------------------*/
export const getInventoryTransactions = async (): Promise<productGetType[]> => {
  try {
    const products: ProductModelType[] = await productsRepository.getProducts();
    const stockLevels = await Promise.all(
      products.map(async (product) => {
        const transactions: InventoryTransactionModelType[] =
          await inventoryTransactionRepository.getInventoryTransactions({
            productId: product._id,
          });

        const totalStock: number = transactions.reduce((sum, tx) => {
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
      })
    );
    return stockLevels;
  } catch (err) {
    throw err;
  }
};
