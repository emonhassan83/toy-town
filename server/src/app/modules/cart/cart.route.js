import express from "express";
import { CartControllers } from "./cart.controller.js";

const router = express.Router();

router.post("/cartProduct", CartControllers.saveCartProduct);
router.get("/cartProducts/:email", CartControllers.getCartProducts);
router.delete("/deleteCartProduct/:id", CartControllers.deleteCartProduct);

export const CartRoutes = router;

