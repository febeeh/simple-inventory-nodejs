import { getModel } from "../models/product.model";
import { ProductModelType } from "../types/product.type";
class ProductsRepository {
  private ProductsModel = getModel();
  /*--------------------
    // To insert product
  ---------------------*/
  insertProduct = async (
    data: Omit<ProductModelType, "createdAt" | "updatedAt" | "_id">
  ): Promise<ProductModelType> => {
    try {
      const result = await new this.ProductsModel(data).save();
      return result;
    } catch (err) {
      throw err;
    }
  };

  /*--------------------
    // To get product by params
  ---------------------*/
  getProduct = async (params: Object = {}): Promise<ProductModelType> => {
    try {
      const result = (await this.ProductsModel.findOne(
        params
      )) as ProductModelType;
      return result;
    } catch (err) {
      throw err;
    }
  };

  /*--------------------
    // To get all products
  ---------------------*/
  getProducts = async (params: object = {}): Promise<ProductModelType[]> => {
    try {
      const result = (await this.ProductsModel.find(
        params
      ).lean()) as ProductModelType[];
      return result;
    } catch (err) {
      throw err;
    }
  };
}

export { ProductsRepository };
