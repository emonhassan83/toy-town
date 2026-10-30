import express from "express";
import { FeedbackControllers } from "./feedback.controller.js";

const router = express.Router();

router.post("/feedback", FeedbackControllers.saveFeedback);
router.get("/feedbacks", FeedbackControllers.getFeedbacks);

export const FeedbackRoutes = router;

