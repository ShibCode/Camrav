import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

const User = models.User || model("User", userSchema);

export default User;
