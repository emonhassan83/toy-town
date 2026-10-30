import { Schema, model } from "mongoose";

const feedbackSchema = new Schema(
  {
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
    feedback: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = model("Feedback", feedbackSchema);

