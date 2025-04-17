import { ObjectId } from "mongoose";

// Interface for Product
export interface ProductModelType {
  _id: ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type productGetType = {
  product: {
    id: ObjectId;
    name: string;
  };
  stock: number;
};
