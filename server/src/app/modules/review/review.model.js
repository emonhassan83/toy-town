import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    photoURL: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
    },
    review: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model("Review", reviewSchema);

