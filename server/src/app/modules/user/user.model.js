import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config/config.js";
import { UserStatus } from "./user.constant.js";

//* Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    photoURL: {
      type: String,
      default: "",
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//* pre save middleware / hooks
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds) || 10
    );
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const isUserExist = await User.findOne({
      email: this.email,
    });

    if (isUserExist) {
      throw new Error(
        "This user already exists with this email address"
      );
    }
  }

  next();
});

userSchema.statics.isUserExistsById = async function (id) {
  return await User.findById(id);
};

userSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  if (!plainTextPassword || !hashedPassword) return false;
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

//* Export the model
export const User = model("User", userSchema);
