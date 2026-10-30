import { Review } from "./review.model.js";
import mongoose from "mongoose";

const isDbConnected = () => mongoose.connection.readyState === 1;
let memoryReview = [];

const saveReview = async (payload) => {
  if (!isDbConnected()) {
    const item = { ...payload, _id: "review_" + Date.now() };
    memoryReview.push(item);
    return item;
  }
  const result = await Review.create(payload);
  return result;
};

const getReviewsByProductId = async (product_id) => {
  if (!isDbConnected()) {
    return memoryReview.filter((r) => r.product_id === product_id);
  }
  const result = await Review.find({ product_id }).sort({ createdAt: -1 });
  return result;
};

export const ReviewServices = {
  saveReview,
  getReviewsByProductId,
};
