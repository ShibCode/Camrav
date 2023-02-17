import User from "../../models/User";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  setTimeout(async () => {
    if (req.method === "POST") {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.json({ error: "Invalid Credentials" });

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) return res.json({ error: "Invalid Credentials" });

      const token = sign(
        { email: email, password: password },
        process.env.JWT_SECRET
      );

      return res.json({ token });
    }

    return res.status(400).json({ error: "This method is not allowed" });
  }, 200);
}
