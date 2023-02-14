import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  brand: { type: String, default: "No Brand" },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  sizes: { type: Object, required: true },
  price: { type: Number, required: true },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
