import { connectDB } from "../../middleware/mongoose";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  const products = await Product.find({});

  res.status(200).json({ message: products });
}
