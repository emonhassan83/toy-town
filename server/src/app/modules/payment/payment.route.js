import express from "express";
import { PaymentControllers } from "./payment.controller.js";

const router = express.Router();

router.post("/payment", PaymentControllers.savePayment);
router.get("/payment/:email", PaymentControllers.getPayments);

export const PaymentRoutes = router;

