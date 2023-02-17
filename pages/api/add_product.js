import Product from "../../models/Product";

export default async function handler(req, res) {
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

    return res.status(200).json({ message: "Successfully added the product" });
  }

  return res.status(400).json({ error: "This method is not allowed" });
}
