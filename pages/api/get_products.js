import Product from "../../models/Product";

export default async function handler(req, res) {
  const products = await Product.find({});

  return res.status(200).json({ message: products });
}
