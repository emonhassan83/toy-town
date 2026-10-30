# Toy Town - Toy Marketplace & E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-2.51+-5AD8E6?style=for-the-badge)](https://daisyui.com/)

**Toy Town** is a full-stack, responsive e-commerce marketplace dedicated to toys and children's play goods. It empowers three distinct user roles—**Customers**, **Sellers**, and **Admins**—with specialized capabilities for product curation, inventory management, dynamic shopping carts, order checkout, real-time ratings, reviews, and user account governance.

---

## 🌟 Role-Based Features

### 👑 Admin
- **User Governance**: View complete user directory with role indicators. Promote users to `Seller` or `Admin`, demote roles, and remove accounts with instant UI cache synchronization.
- **Product Approvals**: Review seller-submitted products, toggle approval status, update catalog metadata, and delete inappropriate listings.
- **Platform Analytics**: Monitor overall toy catalog health, incoming reviews, and order trends.

### 🧸 Seller
- **Product Onboarding**: Add toys with title, pricing, quantity, category, detailed specifications, and automated unique SKU generation (`PROD-<rand>-<timestamp>`).
- **Media Hosting**: Integrated ImgBB API for instant, reliable image uploading.
- **Inventory Management**: View personal active listings, edit toy details via interactive modal dialogs, and delete discontinued stock.

### 🛒 Customer / Buyer
- **Interactive Shopping**: Browse curated toys by categories (*Bed, Wood Toys, Carriage, Accessories, Baby Equipment, Soft Toys, Educational*).
- **Cart & Fast Checkout**: Add toys to persistent cart, adjust quantities, review order summary with automated subtotal & shipping calculation, and complete orders.
- **Purchase History**: Access a dedicated ledger of all purchased toys, pricing, order dates, and delivery status.
- **Product Reviews & Feedback**: Submit 5-star ratings and written reviews on toy pages, plus platform satisfaction feedback.

### 🌐 Visitor / Guest
- **Explore & Filter**: Browse Hero promotions, New Arrivals, Featured Collections, and Category tabs (*Science Toys, Language Toys, Engineering Toys*).
- **Authentication**: Seamless onboarding with Google One-Tap / Popup Authentication or Email & Password.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, DaisyUI, Redux Toolkit (RTK Query), React Router 7, Swiper 14, Lottie React, Headless UI, React Hook Form, SweetAlert2, React Hot Toast, AOS |
| **Backend** | Node.js (ES Modules), Express.js, MongoDB & Mongoose 8, Cookie-Parser, CORS |
| **Authentication** | Firebase Auth (Google Popup & Email/Password), JWT (Access Token in Header, Refresh Token in HttpOnly Cookie), Bcrypt Password Hashing, RBAC Middleware |
| **Validation & Security** | Zod Schema Validation, Helmet-ready error boundary, 0 Audit Vulnerabilities, Safe TLS Email Transport (Nodemailer) |
| **Data Resiliency** | Automatic fallbacks and initial dataset seeding from `productData.json` |

---

## 📚 Technical Documentation

Comprehensive engineering documentation is available in the [`docs/`](./docs/) directory:

- 📐 [**System Architecture**](./docs/ARCHITECTURE.md) - Layered system design, RTK Query caching & component flow.
- 🔐 [**Authentication & RBAC**](./docs/AUTHENTICATION.md) - Firebase auth, JWT token lifecycle, cookies & middleware guards.
- 📡 [**API Guidelines**](./docs/API_GUIDELINES.md) - REST conventions, endpoints for products, cart, orders, and users.
- 🗄️ [**Database & Seeding**](./docs/DATABASE_SEEDING.md) - Mongoose models, schemas, and automatic JSON catalog seeding.
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - Vercel serverless configuration, Firebase Hosting, Netlify & production builds.
- 📁 [**Folder Structure**](./docs/FOLDER_STRUCTURE.md) - Exhaustive monorepo directory layout and file responsibilities.
- 💻 [**Local Development**](./docs/development.md) - Step-by-step local setup, environment variables, and scripts.
- 🧪 [**Testing & Audit**](./docs/TESTING_WORKFLOW.md) - Quality assurance, vulnerability patching, and API test scripts.
- 📏 [**Coding Rules**](./docs/CODING_RULES.md) - React, Redux, Express, and Mongoose architectural conventions.
- 🤖 [**AI System Prompt**](./docs/AI_SYSTEM_PROMPT.md) - Engineering persona and domain specifications for AI assistants.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection string

### 2. Clone Repository
```bash
git clone https://github.com/emonhassan83/toy-town.git
cd toy-town
```

### 3. Setup & Start Backend (`server/`)
```bash
cd server
npm install

# Configure environment variables (create .env)
# Start development server
npm run server
```
> Server runs on: `http://localhost:5000` (Healthcheck: `GET http://localhost:5000/`)

### 4. Setup & Start Frontend (`client/`)
```bash
cd ../client
npm install

# Configure environment variables (create .env.local)
# Start client development server
npm run dev
```
> Client runs on: `http://localhost:5173`

---

## 🔐 Environment Variables

### Server (`server/.env`)
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

### Client (`client/.env.local`)
```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=toy-town.firebaseapp.com
VITE_PROJECTID=toy-town
VITE_STORAGEBUCKET=toy-town.appspot.com
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_IMGBB_KEY=your_imgbb_api_key
VITE_API_URL=http://localhost:5000
```

---

## 🔑 Demo Credentials

| Role | Email | Default Password |
| :--- | :--- | :--- |
| **Admin** | `admin@toytown.com` | `admin123` |
| **Seller** | `seller@toytown.com` | `seller123` |
| **Customer** | `customer@toytown.com` | `user1234` |
| *Social* | *Google Account* | *Any Google Account via Popup Sign-in* |

---

## 🛡️ Security & Quality Assurance

- **Zero Security Vulnerabilities**: Transitive and direct dependencies fully audited with `npm audit` reporting 0 vulnerabilities.
- **RBAC Middleware**: Enforced role authorization on all sensitive endpoints (`auth('admin')`, `auth('seller')`).
- **Encrypted Password Handling**: Passwords hashed with `bcrypt` with salt rounds = 12 and guarded against double-hashing on update.
- **JWT & Safe Cookies**: HttpOnly cookies with dynamic `SameSite` and `Secure` attributes across development and production environments.
- **Fail-Safe In-Memory / File Fallback**: Offline resiliency ensures the store catalog remains functional even when remote databases experience transient network timeouts.

---

## 📄 License
This project is open-source and licensed under the **ISC License**.
