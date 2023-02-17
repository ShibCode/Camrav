import { verify } from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;

    const response = verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        return decoded ? decoded : { error: "Failed to authorize" };
      }
    );

    if (response.error) {
      return res.json({ error: response.error });
    }

    const { orders: rawOrders } = await User.findOne({
      email: response.email,
    }).populate("orders", "_id status createdAt updated_at");

    const orders = rawOrders.map((order) => {
      return {
        ...order._doc,
        createdAt: order.createdAt.toLocaleString(),
        updated_at: order.updated_at.toLocaleString(),
      };
    });

    return res.json({ orders });
  }
}
