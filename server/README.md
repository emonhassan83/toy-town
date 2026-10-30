# Toy Town - Backend Server API

RESTful API backend for the Toy Town e-commerce marketplace platform, built with **Node.js**, **Express.js**, and **MongoDB / Mongoose**.

---

## 🚀 Features

- **Authentication**: JWT access & HttpOnly refresh tokens, Bcrypt password hashing, and role-based access control (`admin`, `seller`, `user`).
- **Product Management**: Category browsing, product search & filter, admin approval system, and seller inventory management.
- **Cart & Order System**: User shopping cart state, purchase recording, and payment transaction logging.
- **Reviews & Testimonials**: User product ratings and platform testimonials.
- **Resilient Fallback**: Automated product dataset seeding from `data/productData.json` with fallback handling during remote database network interruptions.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose 8
- **Authentication**: JWT (`jsonwebtoken`) & Bcrypt
- **Validation**: Zod
- **Email Service**: Nodemailer (Gmail SMTP)

---

## 📋 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in this directory:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/toy-town-shop?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_ACCESS_EXPIRE_IN=30d
JWT_REFRESH_EXPIRE_IN=365d
RESET_PASS_LINK=http://localhost:5173
RESET_PASS_TOKEN=your_reset_pass_token_secret
RESET_PASS_TOKEN_EXPIRES_IN=15m
EMAIL=your_email@gmail.com
APP_PASS=your_gmail_app_password
```

### 3. Run Server
```bash
# Development with nodemon
npm run server

# Production mode
npm start
```
Server runs at `http://localhost:5000`.
