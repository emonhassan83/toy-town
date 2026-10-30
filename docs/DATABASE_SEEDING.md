# Toy Town - Database Architecture & Seeding Guide

This document describes the database design, collections, Mongoose schemas, indexes, and automated seeding mechanism powering the **Toy Town** application.

---

## 1. Database Connection & Technology

- **Database Engine**: MongoDB (v6.0+)
- **Object Data Modeling (ODM)**: Mongoose (v8.2+)
- **Connection URI**: Standard MongoDB Connection String (`mongodb+srv://...` or `mongodb://localhost:27017/toy-town`)

Connection setup in `server/src/server.js`:
```javascript
await mongoose.connect(config.database_url);
```

---

## 2. Collections & Schema Definitions

### 2.1 Products Collection (`products`)
```javascript
{
  product_name: { type: String, required: true, trim: true },
  img: { type: String, required: true },
  product_category: { type: String, default: "General", index: true },
  category: { type: String, default: "New arrivals", index: true },
  quantity: { type: Number, default: 1 },
  description: { type: String, default: "" },
  tags: { type: [String], default: [] },
  rating: { type: Number, default: 5 },
  price: { type: Number, required: true },
  details_img: { type: String, default: "https://imgpile.com/images/DxHwxw.jpg" },
  seller: { type: String, default: "" },
  seller_email: { type: String, required: true, index: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
  SKU: { type: String, default: "" },
  reviews: { type: Array, default: [] }
}
```

### 2.2 Users Collection (`users`)
```javascript
{
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
  password: { type: String, required: false },
  photoURL: { type: String, default: "" },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  isDeleted: { type: Boolean, default: false }
}
```

### 2.3 Cart Collection (`carts`)
```javascript
{
  productId: { type: String, required: true },
  customer_email: { type: String, required: true, index: true },
  name: { type: String, required: true },
  img: { type: String, default: "" },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now }
}
```

### 2.4 Payments Collection (`payments`)
```javascript
{
  product_name: { type: String, required: true },
  product_img: { type: String, default: "" },
  product_id: { type: String, default: "" },
  customer_name: { type: String, default: "" },
  customer_email: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  transactionId: { type: String, default: () => "TXN_" + Math.random().toString(36).substring(2, 10).toUpperCase() },
  status: { type: String, default: "completed" },
  date: { type: Date, default: Date.now }
}
```

---

## 3. Automated Seeding Mechanism

Toy Town features an automatic zero-config seed pipeline that executes on server startup:

1. **Count Verification**: The server runs `Product.estimatedDocumentCount()`.
2. **JSON Dataset Ingestion**: If the collection is empty, the server reads `server/data/productData.json`.
3. **Batch Insertion**: All 48 initial products are ingested with default `status: 'approved'`.

```javascript
export const seedProductsIfEmpty = async () => {
  try {
    const count = await Product.estimatedDocumentCount();
    if (count === 0) {
      const dataPath = path.join(process.cwd(), "data", "productData.json");
      if (fs.existsSync(dataPath)) {
        const raw = fs.readFileSync(dataPath, "utf-8");
        const products = JSON.parse(raw);
        if (Array.isArray(products) && products.length > 0) {
          const formatted = products.map((p) => ({ ...p, status: "approved" }));
          await Product.insertMany(formatted);
          console.log(`Seeded ${formatted.length} products successfully!`);
        }
      }
    }
  } catch (err) {
    console.warn("Could not seed products:", err.message);
  }
};
```

---

## 4. Offline Fallback Architecture

If MongoDB is unavailable or DNS resolution fails during local development:
- The server does not crash.
- Endpoints gracefully read from `server/data/productData.json`.
- State mutations (like adding to cart or submitting orders) operate against safe in-memory stores to facilitate uninterrupted UI development.
