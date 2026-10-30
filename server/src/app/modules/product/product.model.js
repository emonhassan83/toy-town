import mongoose, { Schema, model } from "mongoose";
import fs from "fs";
import path from "path";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      default: "General",
    },
    category: {
      type: String,
      default: "New arrivals",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 5,
    },
    price: {
      type: Number,
      required: true,
    },
    details_img: {
      type: String,
      default: "https://imgpile.com/images/DxHwxw.jpg",
    },
    variant: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    base_type: {
      type: String,
      default: "",
    },
    material: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "Toy Town",
    },
    collection: {
      type: String,
      default: "Summer 2024",
    },
    weight: {
      type: String,
      default: "",
    },
    seller: {
      type: String,
      default: "",
    },
    seller_email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
    reviews: {
      type: Array,
      default: [],
    },
    SKU: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

export const Product = model("Product", productSchema);

// Auto-seed function if product collection is empty
export const seedProductsIfEmpty = async () => {
  try {
    const count = await Product.estimatedDocumentCount();
    if (count === 0) {
      const dataPath = path.join(process.cwd(), "data", "productData.json");
      if (fs.existsSync(dataPath)) {
        const raw = fs.readFileSync(dataPath, "utf-8");
        const products = JSON.parse(raw);
        if (Array.isArray(products) && products.length > 0) {
          const formatted = products.map((p) => ({
            ...p,
            status: "approved",
          }));
          await Product.insertMany(formatted);
          console.log(`Seeded ${formatted.length} products successfully!`);
        }
      }
    }
  } catch (err) {
    console.warn("Could not seed products:", err.message);
  }
};
