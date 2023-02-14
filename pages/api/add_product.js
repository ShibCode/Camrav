import { connectDB } from "../../middleware/mongoose";
import Product from "../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { brand, name, desc, image, category, sizes, price } = req.body;

    const newProduct = await new Product({
      brand,
      brand,
      name: name,
      desc: desc,
      image: image,
      category: category,
      sizes: sizes,
      price: price,
    });

    console.log("asd");

    await newProduct.save();
  }

  res.status(200).json("Successfully added the product");
}
