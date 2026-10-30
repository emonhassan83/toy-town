import httpStatus from "http-status";
import { User } from "../user/user.model.js";
import { createToken, verifyToken } from "./auth.utils.js";
import config from "../../config/config.js";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError.js";
import emailSender from "../../utils/emailSender.js";

const loginUser = async (payload) => {
  //* checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!");
  }

  //* checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //* create token and sent to the client
  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
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
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (userData, payload) => {
  const userId = userData._id || userData.userId;
  const user = await User.findById(userId) || await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  //* checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //* hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds) || 10
  );

  await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing!");
  }

  //* checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret);

  const { email } = decoded;

  //* checking if the user is exist
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  return {
    accessToken,
  };
};

const forgetPassword = async ({ email }) => {
  //* checking if the user is exist
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  //* checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  //* checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const resetPassToken = createToken(
    jwtPayload,
    config.reset_pass_secret,
    config.reset_pass_token_expires_in
  );

  const resetPassLink =
    config.reset_pass_link + `?userId=${user._id}&token=${resetPassToken}`;

  //* send message
  await emailSender(
    user.email,
    `
          <div>
              <p>Dear User,</p>
              <p>Your password reset link:
                  <a href="${resetPassLink}">
                      <button>
                          Reset Password
                      </button>
                  </a>
              </p>
          </div>
          `
  );
};

const resetPassword = async (
  payload,
  token,
) => {
  let cleanToken = token;
  if (cleanToken && (cleanToken.startsWith("Bearer ") || cleanToken.startsWith("bearer "))) {
    cleanToken = cleanToken.slice(7).trim();
  }

  if (!cleanToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Reset token is missing!");
  }

  const decoded = verifyToken(cleanToken, config.reset_pass_secret);

  const targetId = payload?.id || decoded._id;
  const user = await User.isUserExistsById(targetId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (targetId.toString() !== decoded._id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //* hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds) || 10,
  );

  await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
