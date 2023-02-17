import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderId } = req.body;

    try {
      const order = await Order.findOne({ _id: orderId });

      if (order) return res.json({ message: "Order exists" });

      return res.json({ error: "Order does not exist" });
    } catch {
      return res.json({ error: "Order does not exist" });
    }
  }
}
