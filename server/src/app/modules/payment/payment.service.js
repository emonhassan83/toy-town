import { Payment } from "./payment.model.js";
import mongoose from "mongoose";

const isDbConnected = () => mongoose.connection.readyState === 1;
let memoryPayment = [];

const savePayment = async (payload) => {
  const item = {
    ...payload,
    userName: payload.userName || payload.customer_name || payload.name,
    customer_email: payload.customer_email || payload.email,
  };
  if (!isDbConnected()) {
    const saved = { ...item, _id: "pay_" + Date.now() };
    memoryPayment.push(saved);
    return saved;
  }
  const result = await Payment.create(item);
  return result;
};

const getPaymentsByEmail = async (email) => {
  if (!isDbConnected()) {
    return memoryPayment.filter(
      (p) => p.email === email || p.customer_email === email
    );
  }
  const result = await Payment.find({
    $or: [{ email }, { customer_email: email }],
  }).sort({ createdAt: -1 });
  return result;
};

export const PaymentServices = {
  savePayment,
  getPaymentsByEmail,
};
