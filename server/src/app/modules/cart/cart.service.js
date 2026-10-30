import { Cart } from "./cart.model.js";
import AppError from "../../errors/AppError.js";
import httpStatus from "http-status";
import mongoose from "mongoose";

const isDbConnected = () => mongoose.connection.readyState === 1;
let memoryCart = [];

const saveCartProduct = async (payload) => {
  if (!isDbConnected()) {
    const item = { ...payload, _id: "cart_" + Date.now() };
    memoryCart.push(item);
    return item;
  }
  const result = await Cart.create(payload);
  return result;
};

const getCartProductsByEmail = async (customer_email) => {
  if (!isDbConnected()) {
    return memoryCart.filter((c) => c.customer_email === customer_email);
  }
  const result = await Cart.find({ customer_email });
  return result;
};

const deleteCartProduct = async (id) => {
  if (!isDbConnected()) {
    memoryCart = memoryCart.filter((c) => c._id !== id);
    return { _id: id, deleted: true };
  }
  const result = await Cart.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found!");
  }
  return result;
};

export const CartServices = {
  saveCartProduct,
  getCartProductsByEmail,
  deleteCartProduct,
};
