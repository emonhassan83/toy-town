import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { PaymentServices } from "./payment.service.js";

const savePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.savePayment(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getPayments = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await PaymentServices.getPaymentsByEmail(email);
  res.status(httpStatus.OK).json(result);
});

export const PaymentControllers = {
  savePayment,
  getPayments,
};

