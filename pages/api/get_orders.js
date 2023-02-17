import Order from "../../models/Order";

export default async function handler(req, res) {
  const orders = await Order.find({});

  return res.json({ orders });
}
