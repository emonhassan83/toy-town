import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { ReviewServices } from "./review.service.js";

const saveReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.saveReview(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getReviewsByProductId(id);
  res.status(httpStatus.OK).json(result);
});

export const ReviewControllers = {
  saveReview,
  getReviews,
};

