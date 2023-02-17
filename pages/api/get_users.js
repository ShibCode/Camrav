import User from "../../models/User";

export default async function handler(req, res) {
  const users = await User.find({});

  return res.json({ users });
}
