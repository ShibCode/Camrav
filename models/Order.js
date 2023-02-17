import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    orderedBy: { type: Schema.Types.ObjectId, required: true },
    orderDetails: { type: Object, required: true },
    checkoutDetails: { type: Object, required: true },
    status: { type: String, required: true, default: "Processing Request" },
  },
  {
    timestamps: {
      orderedAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
