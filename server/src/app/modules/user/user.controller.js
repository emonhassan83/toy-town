import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import config from "../../config/config.js";

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const user = await UserServices.registerUserIntoDB(userData);

  const { refreshToken, result } = user;
  const isProduction = config.node_env === "production";

  res.cookie("refreshToken", refreshToken, {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const upsertUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const userData = req.body;
  const result = await UserServices.upsertUser(email, userData);
  res.status(httpStatus.OK).json(result);
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();
  res.status(httpStatus.OK).json(result);
});

const getUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getUserByEmail(email);
  res.status(httpStatus.OK).json(result);
});

const makeUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserRole(id, "user");
  res.status(httpStatus.OK).json(result);
});

const makeSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserRole(id, "seller");
  res.status(httpStatus.OK).json(result);
});

const makeAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserRole(id, "admin");
  res.status(httpStatus.OK).json(result);
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);
  res.status(httpStatus.OK).json(result);
});

export const UserControllers = {
  registerUser,
  upsertUser,
  getAllUsers,
  getUserByEmail,
  makeUser,
  makeSeller,
  makeAdmin,
  deleteUser,
};
