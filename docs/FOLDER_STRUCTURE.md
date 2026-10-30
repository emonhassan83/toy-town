# Toy Town - Monorepo Folder Structure

This document provides a comprehensive mapping of the **Toy Town** codebase layout, detailing directory hierarchies and component responsibilities across both `client` and `server`.

---

## 1. High-Level Monorepo Overview

```
toy-town/
├── client/                 # React 18 / Vite 6 Single Page Application
├── server/                 # Node.js / Express.js Modular REST API
├── docs/                   # Full Engineering Specifications & Blueprints
├── .gitignore              # Monorepo git ignore definitions
└── README.md               # Main project introduction & quick start guide
```

---

## 2. Client Directory Breakdown (`client/`)

```
client/
├── public/                 # Static public assets (icons, favicon)
├── src/
│   ├── assets/             # Brand logos, category banners, Lottie JSON animations
│   │   ├── 404/            # Error page vectors and illustrations
│   │   ├── banner/         # Home hero and promo sliders
│   │   ├── category-img/   # Visual icons for product categories
│   │   ├── gallery-img/    # Curated toys photo gallery assets
│   │   └── logos/          # Brand and provider badges (e.g. Google logo)
│   ├── components/         # Reusable UI components
│   │   ├── Card/           # Product cards and skeleton placeholders
│   │   └── Dashboard/      # Admin and Seller modal dialogs (UpdateProductModal)
│   ├── firebase/           # Firebase configuration and auth instantiation
│   │   └── firebase.config.js
│   ├── hooks/              # Custom React hooks (e.g. useTitle)
│   ├── Layout/             # Page structural layouts
│   │   ├── DashBoardLayout.jsx  # Side navigation & top bar for dashboards
│   │   └── Main.jsx             # Public layout with Navbar and Footer
│   ├── Pages/              # Route views
│   │   ├── BlogDetails/    # Editorial blog articles
│   │   ├── DashBoard/      # Role-protected dashboards
│   │   │   ├── AdminDashboard/   # ManageUsers, ManageProduct, AdminHome
│   │   │   ├── SellerDashboard/  # AddProduct, MyProduct, SellerHome
│   │   │   └── UserDashboard/    # MyCart, Checkout, Payment, MyPurchase, Feedback
│   │   ├── ErrorPage/      # 404 and unexpected error fallback
│   │   ├── Home/           # Landing page sections (Hero, Categories, Testimonials)
│   │   ├── Login/          # User login & social auth
│   │   ├── Pricing/        # Membership tiers & subscription view
│   │   ├── ProductDetails/ # Detailed toy page, reviews, specs & add to cart
│   │   ├── Shared/         # Navbar, Footer, UserModal
│   │   ├── Shop/           # Full product catalog with category filter sidebar
│   │   ├── SignUp/         # User registration
│   │   └── UserProfile/    # Account overview & profile metadata
│   ├── providers/          # React Context providers (ThemeProvider)
│   ├── redux/              # Centralized state management
│   │   ├── api/            # RTK Query baseApi definition
│   │   ├── features/       # Modular API endpoints & slices
│   │   │   ├── auth/       # authApi (credentials)
│   │   │   ├── feedback/   # feedbackApi (reviews & testimonials)
│   │   │   ├── products/   # productsApi & productSlice
│   │   │   └── user/       # userApi & userSlice (Firebase auth sync)
│   │   └── store.js        # Global Redux store configuration
│   ├── routes/             # Client-side routing definitions
│   │   ├── PrivateRoute/   # Auth-guard protecting dashboard & private paths
│   │   └── Routes.jsx      # createBrowserRouter router definitions
│   ├── App.css
│   ├── App.jsx
│   ├── index.css           # Tailwind directives & global styling
│   └── main.jsx            # Application mount point
├── .env.local              # Client environment variables (Firebase, ImgBB, API URL)
├── .firebaserc             # Firebase project binding
├── firebase.json           # Firebase Hosting SPA rewrite configuration
├── package.json            # Client dependencies & scripts
├── postcss.config.js       # PostCSS config (Tailwind & Nesting)
├── tailwind.config.js      # Tailwind theme & DaisyUI plugin setup
└── vite.config.js          # Vite 6 bundler configuration
```

---

## 3. Server Directory Breakdown (`server/`)

```
server/
├── data/
│   └── productData.json    # Seed & fallback catalog containing 48+ toy items
├── src/
│   ├── app/
│   │   ├── config/         # Environment variable schema loader (dotenv)
│   │   │   └── config.js
│   │   ├── errors/         # Custom AppError & specialized Mongo error handlers
│   │   │   ├── AppError.js
│   │   │   ├── handleCastError.js
│   │   │   ├── handleDuplicateError.js
│   │   │   ├── handleValidationError.js
│   │   │   └── handleZodError.js
│   │   ├── middleware/     # Global & route-level middleware
│   │   │   ├── auth.js     # JWT Bearer token & role-based validation guard
│   │   │   ├── errorHandler.js # Global Express error formatting
│   │   │   ├── notFound.js # 404 handler for unknown routes
│   │   │   └── validateRequest.js # Zod schema validation middleware
│   │   ├── modules/        # Modular domain-driven features
│   │   │   ├── auth/       # Authentication (controller, service, routes, utils, validation)
│   │   │   ├── cart/       # Shopping cart operations
│   │   │   ├── feedback/   # Website reviews & feedback
│   │   │   ├── payment/    # Order recording & payment ledger
│   │   │   ├── product/    # Product catalog, categories, inventory management
│   │   │   ├── review/     # Toy review & rating system
│   │   │   └── user/       # User profiles, role transitions & admin controls
│   │   ├── router/         # Central route registry aggregating all feature routes
│   │   │   └── routes.js
│   │   └── utils/          # Shared utilities (catchAsync, emailSender, sendResponse)
│   ├── app.js              # Express app initialization, CORS, parsers, and route mounting
│   └── server.js           # Server listen & MongoDB connection bootstrapper
├── .env                    # Server environment variables & secrets
├── index.js                # Server entry point for Vercel Serverless deployment
├── package.json            # Server dependencies, scripts, and overrides
└── vercel.json             # Vercel deployment routing specification
```
