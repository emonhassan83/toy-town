import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync.js";
import { ProductServices } from "./product.service.js";

const saveProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.saveProductIntoDB(req.body);
  res.status(httpStatus.CREATED).json(result);
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProducts(req.query);
  res.status(httpStatus.OK).json(result);
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const { category } = req.params;
  const result = await ProductServices.getProductsByCategory(category);
  res.status(httpStatus.OK).json(result);
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getProductById(id);
  res.status(httpStatus.OK).json(result);
});

const getProductsByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await ProductServices.getProductsByEmail(email);
  res.status(httpStatus.OK).json(result);
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductInDB(id, req.body);
  res.status(httpStatus.OK).json(result);
});

const approveProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.approveProductInDB(id);
  res.status(httpStatus.OK).json(result);
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  res.status(httpStatus.OK).json(result);
});

export const ProductControllers = {
  saveProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getProductsByEmail,
  updateProduct,
  approveProduct,
  deleteProduct,
};

