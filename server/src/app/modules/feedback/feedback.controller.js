import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { FeedbackServices } from "./feedback.service.js";

const saveFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackServices.saveFeedback(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackServices.getAllFeedbacks();
  res.status(httpStatus.OK).json(result);
});

export const FeedbackControllers = {
  saveFeedback,
  getFeedbacks,
};

