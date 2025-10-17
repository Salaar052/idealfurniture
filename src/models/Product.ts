import mongoose, { Schema, Document, Model } from "mongoose";

// 1️⃣ Define a TypeScript interface for Product
export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// 2️⃣ Define the Mongoose schema
const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
