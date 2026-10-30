import httpStatus from "http-status";
import config from "../../config/config.js";
import { createToken } from "../auth/auth.utils.js";
import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import mongoose from "mongoose";

const isDbConnected = () => mongoose.connection.readyState === 1;

let memoryUsers = [
  {
    _id: "admin_1",
    username: "Admin User",
    name: "Admin User",
    email: "admin@toytown.com",
    role: "admin",
    status: "active",
    photoURL: "https://i.ibb.co/MGSZXm5/user1.png",
  },
  {
    _id: "seller_1",
    username: "Seller User",
    name: "Seller User",
    email: "seller@toytown.com",
    role: "seller",
    status: "active",
    photoURL: "https://i.ibb.co/xMT9PgP/author1.png",
  },
];

const registerUserIntoDB = async (payload) => {
  if (!isDbConnected()) {
    const newUser = {
      _id: "user_" + Date.now(),
      username: payload.username,
      name: payload.username,
      email: payload.email,
      role: payload.role || "user",
      status: "active",
      photoURL: payload.photoURL || "",
    };
    memoryUsers.push(newUser);
    const jwtPayload = { _id: newUser._id, email: newUser.email, role: newUser.role };
    const accessToken = createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return { result: newUser, accessToken, refreshToken, needsPasswordChange: false };
  }

  const isExistUser = await User.isUserExistsByEmail(payload.email);
  if (isExistUser) {
    throw new AppError(httpStatus.CONFLICT, "This user is already exist!");
  }

  const result = await User.create(payload);

  const jwtPayload = {
    _id: result._id,
    email: result.email,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    result,
    accessToken,
    refreshToken,
    needsPasswordChange: result?.needsPasswordChange,
  };
};

const upsertUser = async (email, userData) => {
  if (!isDbConnected()) {
    let existing = memoryUsers.find((u) => u.email === email);
    if (existing) {
      existing.name = userData.name || userData.username || existing.name;
      existing.photoURL = userData.photoURL || existing.photoURL;
      return existing;
    }
    const created = {
      _id: "user_" + Date.now(),
      username: userData.name || userData.username || email.split("@")[0],
      name: userData.name || userData.username || email.split("@")[0],
      email,
      role: userData.role || "user",
      photoURL: userData.photoURL || "",
      status: "active",
    };
    memoryUsers.push(created);
    return created;
  }

  const filter = { email };
  const update = {
    $set: {
      email,
      username: userData.name || userData.username || email.split("@")[0],
      photoURL: userData.photoURL || userData.imageUrl || "",
    },
    $setOnInsert: {
      role: userData.role || "user",
      status: "active",
      isDeleted: false,
    },
  };
  const options = { upsert: true, new: true };
  const result = await User.findOneAndUpdate(filter, update, options);
  return result;
};

const getAllUsers = async () => {
  if (!isDbConnected()) {
    return memoryUsers;
  }

  const users = await User.find({ isDeleted: { $ne: true } });
  return users.map((u) => ({
    _id: u._id,
    name: u.username,
    username: u.username,
    email: u.email,
    role: u.role,
    photoURL: u.photoURL,
    status: u.status,
  }));
};

const getUserByEmail = async (email) => {
  if (!isDbConnected()) {
    const user = memoryUsers.find((u) => u.email === email);
    return user || null;
  }

  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) {
    return null;
  }
  return {
    _id: user._id,
    name: user.username,
    username: user.username,
    email: user.email,
    role: user.role,
    photoURL: user.photoURL,
    status: user.status,
  };
};

const updateUserRole = async (id, role) => {
  if (!isDbConnected()) {
    const user = memoryUsers.find((u) => u._id === id);
    if (user) {
      user.role = role;
      return user;
    }
    return { _id: id, role };
  }

  const result = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  return result;
};

const deleteUser = async (id) => {
  if (!isDbConnected()) {
    memoryUsers = memoryUsers.filter((u) => u._id !== id);
    return { _id: id, deleted: true };
  }

  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  upsertUser,
  getAllUsers,
  getUserByEmail,
  updateUserRole,
  deleteUser,
};
