import User from "../../models/User";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  setTimeout(async () => {
    if (req.method === "POST") {
      const { name, email, password, cpassword } = req.body;
      if (password !== cpassword)
        return res.json({ error: "Passwords do not match" });

      const user = await User.findOne({ email });

      if (user) return res.json({ error: "Email already used" });

      const encrypted = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: encrypted,
      });

      const token = sign(
        { email: email, password: password },
        process.env.JWT_SECRET
      );

      await newUser.save();

      return res.json({ token });
    }

    return res.status(400).json({ error: "This method is not allowed" });
  }, 200);
}
