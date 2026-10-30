# Toy Town - System Architecture & Engineering Blueprint

This document details the architectural design, component boundaries, state management, asynchronous data flows, and database modeling for the **Toy Town** e-commerce marketplace.

---

## 1. High-Level System Architecture

Toy Town uses a decoupled client-server architecture:
- **Frontend**: Single Page Application (SPA) built with **React 18**, bundled with **Vite 6**, styled using **Tailwind CSS** and **DaisyUI**, and state-managed via **Redux Toolkit (RTK Query)**.
- **Backend**: RESTful API server powered by **Node.js** and **Express.js**, adhering to ES Modules and a domain-driven modular structure.
- **Persistence**: **MongoDB** database managed through **Mongoose 8** with fallback JSON seeding for offline resiliency.
- **Third-Party Services**:
  - **Firebase Authentication**: Client-side identity provider for Google OAuth popup and email authentication.
  - **ImgBB API**: Image hosting for seller toy uploads.
  - **Google SMTP (Nodemailer)**: Password recovery link dispatch.

```mermaid
graph TD
    Client["Client: React 18 / Vite 6 (Redux Toolkit, Tailwind, DaisyUI)"]
    Server["API Server: Node.js / Express.js (ES Modules)"]
    DB[("MongoDB Atlas (Mongoose 8)")]
    Firebase["Firebase Auth (Google OAuth & Email/Pass)"]
    ImgBB["ImgBB API (Toy Image Storage)"]
    SMTP["Google SMTP (Nodemailer Reset Service)"]

    Client -->|Social Login / Identity| Firebase
    Client -->|Image Uploads (multipart)| ImgBB
    Client -->|REST API Requests / JWT Bearer| Server
    Server -->|Mongoose ODM Queries| DB
    Server -->|Password Recovery Emails| SMTP
```

---

## 2. Layered Backend Application Architecture

The server adheres to a strict separation of concerns across request lifecycles:

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant Router as Express Router (/api/v1)
    participant Auth as Auth & RBAC Middleware
    participant Validator as Zod Request Validator
    participant Controller as Express Controller
    participant Service as Business Service Layer
    participant Model as Mongoose Model / DB

    Client->>Router: HTTP Request (Method, Route, Headers)
    Router->>Auth: Verify JWT & User Roles (if protected)
    Auth->>Validator: Validate Request Body (Zod Schema)
    Validator->>Controller: Route to Controller Handler
    Controller->>Service: Call Business Logic with Sanitized Payload
    Service->>Model: Execute Query or Mutation
    Model-->>Service: Return Document / Hydrated Object
    Service-->>Controller: Return Business Data
    Controller-->>Client: Standardized JSON Response Envelope
```

---

## 3. Frontend State & RTK Query Architecture

The client manages server-side data fetching and local UI state through Redux Toolkit:

```mermaid
graph LR
    subgraph UI Components
        ShopView["Shop / Catalog View"]
        CartView["Cart & Checkout"]
        SellerDash["Seller Dashboard"]
        AdminDash["Admin Dashboard"]
    end

    subgraph RTK Query [baseApi]
        ProductsApi["productsApi (Tag: Product)"]
        UserApi["userApi (Tag: Users)"]
        FeedbackApi["feedbackApi (Tag: Feedback)"]
    end

    subgraph Redux Slices
        UserSlice["userSlice (Firebase auth state)"]
        CartSlice["cartProductSlice (Active checkout item)"]
    end

    ShopView -->|Query: getProducts| ProductsApi
    CartView -->|Mutation: savePayment| ProductsApi
    SellerDash -->|Mutation: saveProduct| ProductsApi
    AdminDash -->|Mutation: makeAdmin| UserApi

    ProductsApi -.->|Invalidates: Product, Cart| CartView
    UserApi -.->|Invalidates: Users| AdminDash
```

---

## 4. Database Schema Modeling

The MongoDB database is organized into six core collections:

```mermaid
erDiagram
    USER ||--o{ PRODUCT : "sells"
    USER ||--o{ CART : "owns"
    USER ||--o{ PAYMENT : "purchases"
    USER ||--o{ FEEDBACK : "submits"
    PRODUCT ||--o{ REVIEW : "receives"

    USER {
        ObjectId _id PK
        string username
        string email UK
        string role "user | seller | admin"
        string password
        string photoURL
        string status "active | blocked"
        boolean isDeleted
        date createdAt
        date updatedAt
    }

    PRODUCT {
        ObjectId _id PK
        string product_name
        string img
        string product_category
        string category
        number price
        number quantity
        string SKU
        string seller_email
        string status "pending | approved | rejected"
        number rating
        date createdAt
    }

    CART {
        ObjectId _id PK
        string productId
        string customer_email
        string name
        string img
        number price
        number quantity
        boolean isPurchase
        date date
    }

    PAYMENT {
        ObjectId _id PK
        string product_id
        string product_name
        string customer_email
        string customer_name
        number price
        string transactionId
        string status
        date date
    }

    FEEDBACK {
        ObjectId _id PK
        string name
        string email
        string photoURL
        number rating
        string feedback
        date createdAt
    }

    REVIEW {
        ObjectId _id PK
        string product_id
        string product_name
        string name
        string email
        string photoURL
        number rating
        string review
        date createdAt
    }
```

---

## 5. High-Availability & Fallback Design

To prevent system crashes in constrained local environments or during remote database connection interruptions:
1. **Mongoose State Awareness**: The backend checks `mongoose.connection.readyState`. If the connection is down, fallback logic activates automatically.
2. **Catalog Fallback**: Product queries gracefully read from `server/data/productData.json`, ensuring the store UI remains fully browsable.
3. **In-Memory Store**: Cart, User, and Payment endpoints maintain safe in-memory collections when database connectivity is offline, preventing 500 runtime exceptions during development and demonstration.
