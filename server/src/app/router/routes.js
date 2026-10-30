import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { UserRoutes } from "../modules/user/user.route.js";
import { ProductRoutes } from "../modules/product/product.route.js";
import { CartRoutes } from "../modules/cart/cart.route.js";
import { PaymentRoutes } from "../modules/payment/payment.route.js";
import { FeedbackRoutes } from "../modules/feedback/feedback.route.js";
import { ReviewRoutes } from "../modules/review/review.route.js";

const router = express.Router();

// Root/V1 modular routes
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/users", UserRoutes);
router.use("/", ProductRoutes);
router.use("/", CartRoutes);
router.use("/", PaymentRoutes);
router.use("/", FeedbackRoutes);
router.use("/", ReviewRoutes);

export default router;
