import { Product } from "./product.model.js";
import AppError from "../../errors/AppError.js";
import httpStatus from "http-status";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const getFallbackProducts = () => {
  try {
    const dataPath = path.join(process.cwd(), "data", "productData.json");
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, "utf-8");
      const list = JSON.parse(raw);
      return list.map((p, idx) => ({
        ...p,
        _id: p._id || `prod_${idx}`,
        status: "approved",
      }));
    }
  } catch (err) {
    console.error("Error reading fallback products:", err.message);
  }
  return [];
};

const isDbConnected = () => mongoose.connection.readyState === 1;

const saveProductIntoDB = async (payload) => {
  if (!isDbConnected()) {
    return { ...payload, _id: "local_" + Date.now() };
  }
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query = {}) => {
  if (!isDbConnected()) {
    let list = getFallbackProducts();
    if (query.category) {
      const reg = new RegExp(query.category, "i");
      list = list.filter((p) => reg.test(p.category || "") || reg.test(p.product_category || ""));
    }
    if (query.product_category) {
      const reg = new RegExp(query.product_category, "i");
      list = list.filter((p) => reg.test(p.product_category || ""));
    }
    if (query.search) {
      const reg = new RegExp(query.search, "i");
      list = list.filter((p) => reg.test(p.product_name || ""));
    }
    return list;
  }

  const filter = {};
  if (query.category) {
    filter.category = new RegExp(query.category, "i");
  }
  if (query.product_category) {
    filter.product_category = new RegExp(query.product_category, "i");
  }
  if (query.status) {
    filter.status = query.status;
  }
  if (query.search) {
    filter.product_name = { $regex: query.search, $options: "i" };
  }

  const result = await Product.find(filter).sort({ createdAt: -1 });
  return result;
};

const getProductsByCategory = async (category) => {
  if (!isDbConnected()) {
    const reg = new RegExp(category, "i");
    const list = getFallbackProducts();
    return list.filter(
      (p) =>
        reg.test(p.category || "") ||
        reg.test(p.product_category || "") ||
        (Array.isArray(p.tags) && p.tags.some((t) => reg.test(t)))
    );
  }

  const filter = {
    $or: [
      { category: new RegExp(category, "i") },
      { product_category: new RegExp(category, "i") },
    ],
  };
  const result = await Product.find(filter);
  return result;
};

const getProductById = async (id) => {
  if (!isDbConnected()) {
    const list = getFallbackProducts();
    const found = list.find((p) => p._id === id || p.SKU === id);
    if (!found) {
      return list[0] || null;
    }
    return found;
  }

  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return result;
};

const getProductsByEmail = async (seller_email) => {
  if (!isDbConnected()) {
    const list = getFallbackProducts();
    return list.filter((p) => p.seller_email === seller_email);
  }

  const result = await Product.find({ seller_email });
  return result;
};

const updateProductInDB = async (id, payload) => {
  if (!isDbConnected()) {
    return { ...payload, _id: id };
  }
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return result;
};

const approveProductInDB = async (id) => {
  if (!isDbConnected()) {
    return { _id: id, status: "approved" };
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return result;
};

const deleteProductFromDB = async (id) => {
  if (!isDbConnected()) {
    return { _id: id, deleted: true };
  }
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return result;
};

export const ProductServices = {
  saveProductIntoDB,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getProductsByEmail,
  updateProductInDB,
  approveProductInDB,
  deleteProductFromDB,
};
