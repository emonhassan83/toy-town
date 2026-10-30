import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      default: "",
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_img: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
    product_category: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    seller: {
      type: String,
      default: "",
    },
    availableQuantity: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    color: {
      type: String,
      default: "",
    },
    isPurchase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = model("Cart", cartSchema);

