import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/config.js";
import { seedProductsIfEmpty } from "./app/modules/product/product.model.js";

async function main() {
  try {
    if (config.database_url) {
      await mongoose.connect(config.database_url);
      console.log("Connected to MongoDB successfully!");
      await seedProductsIfEmpty();
    } else {
      console.warn("DATABASE_URL is not defined in config.");
    }
  } catch (error) {
    console.error("Database connection error:", error.message);
  }

  const port = config.port || 5000;
  app.listen(port, () => {
    console.log(`Toy Town server is listening on port ${port}`);
  });
}

main();
