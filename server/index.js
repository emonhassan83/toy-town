import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/app/config/config.js";
import { seedProductsIfEmpty } from "./src/app/modules/product/product.model.js";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  if (config.database_url) {
    try {
      await mongoose.connect(config.database_url);
      isConnected = true;
      await seedProductsIfEmpty();
    } catch (err) {
      console.error("DB connection error:", err.message);
    }
  }
};

connectDB();

export default app;

