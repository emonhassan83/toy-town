import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_img: {
      type: String,
      default: "",
    },
    product_id: {
      type: String,
      default: "",
    },
    customer_name: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    customer_email: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
    isPurchase: {
      type: Boolean,
      default: true,
    },
    transactionId: {
      type: String,
      default: () => "TXN_" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    },
    status: {
      type: String,
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model("Payment", paymentSchema);

