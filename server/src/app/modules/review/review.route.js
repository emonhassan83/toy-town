import express from "express";
import { ReviewControllers } from "./review.controller.js";

const router = express.Router();

router.post("/reviewProduct", ReviewControllers.saveReview);
router.get("/reviewProduct/:id", ReviewControllers.getReviews);

export const ReviewRoutes = router;

