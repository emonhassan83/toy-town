import express from "express";
import { ProductControllers } from "./product.controller.js";

const router = express.Router();

router.post("/saveProduct", ProductControllers.saveProduct);
router.get("/allProducts", ProductControllers.getAllProducts);
router.get("/allProducts/:category", ProductControllers.getProductsByCategory);
router.get("/productDetails/:id", ProductControllers.getProductById);
router.get("/myProducts/:email", ProductControllers.getProductsByEmail);
router.patch("/updateProduct/:id", ProductControllers.updateProduct);
router.patch("/approveProduct/:id", ProductControllers.approveProduct);
router.delete("/deleteProduct/:id", ProductControllers.deleteProduct);

// Also subcategories support for ShopByCategory
router.get("/scienceSubCategory", async (req, res) => {
  const result = await ProductControllers.getProductsByCategory(
    { params: { category: "science" } },
    res
  );
});

router.get("/languageSubCategory", async (req, res) => {
  const result = await ProductControllers.getProductsByCategory(
    { params: { category: "language" } },
    res
  );
});

router.get("/engineeringSubCategory", async (req, res) => {
  const result = await ProductControllers.getProductsByCategory(
    { params: { category: "engineering" } },
    res
  );
});

export const ProductRoutes = router;

