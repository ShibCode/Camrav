import Order from "../../models/Order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderId } = req.body;

    try {
      const order = await Order.findOne({ _id: orderId });

      return res.json({
        order: {
          ...order._doc,
          createdAt: order.createdAt.toLocaleString(),
          updated_at: order.updated_at.toLocaleString(),
        },
      });
    } catch {
      return res.json({ error: "Order does not exist" });
    }
  }
}
