import { FilterQuery } from "mongoose";
import { getModel } from "../models/inventory.model";
import { InventoryTransactionModelType } from "../types/inventory.type";
class InventoryTransactionsRepository {
  private InventoryTransactionsModel = getModel();
  /*--------------------
    // To insert inventory transaction
  ---------------------*/
  insertInventoryTransaction = async (
    data: Omit<InventoryTransactionModelType, "createdAt" | "updatedAt">
  ): Promise<InventoryTransactionModelType> => {
    try {
      const result = await new this.InventoryTransactionsModel(data).save();
      return result;
    } catch (err) {
      throw err;
    }
  };

  /*--------------------
    // To get all inventory transactions
  ---------------------*/
  getInventoryTransactions = async (
    params: FilterQuery<InventoryTransactionModelType> = {}
  ): Promise<InventoryTransactionModelType[]> => {
    try {
      const result = (await this.InventoryTransactionsModel.find(
        params
      ).lean()) as InventoryTransactionModelType[];
      return result;
    } catch (err) {
      throw err;
    }
  };
}

export { InventoryTransactionsRepository };
