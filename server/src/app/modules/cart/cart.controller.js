import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { CartServices } from "./cart.service.js";

const saveCartProduct = catchAsync(async (req, res) => {
  const result = await CartServices.saveCartProduct(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getCartProducts = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await CartServices.getCartProductsByEmail(email);
  res.status(httpStatus.OK).json(result);
});

const deleteCartProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.deleteCartProduct(id);
  res.status(httpStatus.OK).json(result);
});

export const CartControllers = {
  saveCartProduct,
  getCartProducts,
  deleteCartProduct,
};

