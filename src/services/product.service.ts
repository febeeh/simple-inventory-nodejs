import { ProductsRepository } from "../repositories/product.repository";
import { ProductModelType } from "../types/product.type";

const productsRepository: ProductsRepository = new ProductsRepository();

/*--------------------
    // To insert product
  ---------------------*/
export const insertProduct = async (
  name: string
): Promise<ProductModelType> => {
  try {
    const product: ProductModelType = await productsRepository.getProduct({
      name: name,
    });
    if (product) {
      throw "Product already added";
    }
    const insert: ProductModelType = await productsRepository.insertProduct({
      name: name,
    });

    return insert;
  } catch (err) {
    throw err;
  }
};

/*--------------------
    // To get all products
  ---------------------*/
export const getProducts = async (): Promise<ProductModelType[]> => {
  try {
    const products: ProductModelType[] = await productsRepository.getProducts();
    return products;
  } catch (err) {
    throw err;
  }
};
