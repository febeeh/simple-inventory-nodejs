import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { ProductModelType } from "../types/product.type";

class productController {
  /*--------------------
    // To insert product
  ---------------------*/
  insertProduct = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }
      const result: ProductModelType = await productService.insertProduct(name);
      res.status(201).json({ success: true, result });
    } catch (err: any) {
      console.log("err: ", err);
      res.status(500).json({ success: false, error: err });
    }
  };

  /*--------------------
    // To get all products
  ---------------------*/
  getProducts = async (req: Request, res: Response) => {
    try {
      const result: ProductModelType[] = await productService.getProducts();
      if (result.length > 0) res.status(200).json({ success: true, result });
      else res.status(200).json({ success: true, result });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json({ success: false, error: err });
    }
  };
}

export default productController;
