import { Feedback } from "./feedback.model.js";
import mongoose from "mongoose";

const isDbConnected = () => mongoose.connection.readyState === 1;
let memoryFeedback = [];

const saveFeedback = async (payload) => {
  if (!isDbConnected()) {
    const item = { ...payload, _id: "feedback_" + Date.now() };
    memoryFeedback.push(item);
    return item;
  }
  const result = await Feedback.create(payload);
  return result;
};

const getAllFeedbacks = async () => {
  if (!isDbConnected()) {
    return memoryFeedback;
  }
  const result = await Feedback.find().sort({ createdAt: -1 });
  return result;
};

export const FeedbackServices = {
  saveFeedback,
  getAllFeedbacks,
};
