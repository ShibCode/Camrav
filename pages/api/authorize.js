import { connectDB } from "../../middleware/mongoose";
import { verify } from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { token } = req.body;

    return verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (decoded) {
        const user = await User.findOne({ email: decoded.email });

        if (user) return res.json({ authorized: true });
      }

      return res.json({ authorized: false });
    });
  }
}
