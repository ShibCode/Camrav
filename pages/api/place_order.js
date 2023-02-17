import Order from "../../models/Order";
import User from "../../models/User";
import Product from "../../models/Product";

import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token, checkoutDetails, cart, subtotal } = req.body;

    const userDetails = verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        return decoded
          ? decoded
          : { error: "Failed to authorize", authorize: false };
      }
    );

    if (userDetails.error) return res.json({ error: userDetails.error });

    const user = await User.findOne({ email: userDetails.email });

    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findOne({ _id: cart[i]._id });

      product.sizes[cart[i].selectedSize].availableQty -= cart[i].quantity;

      await Product.updateOne({ _id: cart[i]._id }, product);
    }

    const newOrder = new Order({
      orderedBy: user._id,
      orderDetails: {
        cart,
        subtotal,
      },
      checkoutDetails,
    });

    user.orders.push(newOrder._id);

    await newOrder.save();
    await user.save();

    return res
      .status(200)
      .json({ message: "Order has been placed", orderId: newOrder._id });
  }

  return res.status(400).json({ error: "This method is not allowed" });
}
