# Toy Town - API Guidelines & Route Specification

This document details the RESTful conventions, standard request/response envelopes, error contracts, and complete endpoint specifications for the **Toy Town** backend.

---

## 1. Base URL & Route Mounting

All endpoints are hosted under semantic versioning `/api/v1` and are also accessible via root path aliases for backward compatibility:

- **Local Base URL**: `http://localhost:5000/api/v1` or `http://localhost:5000`
- **Production Base URL**: `https://toy-town-server-emon83.vercel.app`

### Authorization Header
Endpoints marked with `[Protected]` require a valid JWT Bearer token:
```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

## 2. Standard Response Envelopes

### Success Envelope
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Envelope
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation Error",
  "errorMessages": [
    {
      "path": "email",
      "message": "Invalid email address format"
    }
  ],
  "stack": "..." // Present only in development mode
}
```

---

## 3. Endpoints Specification

### 3.1 Authentication Module (`/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Public | Authenticates user; returns accessToken & sets refreshToken cookie. |
| `POST` | `/api/v1/auth/change-password` | Protected | Changes account password after verifying current password. |
| `POST` | `/api/v1/auth/refresh-token` | Public | Exchanges HttpOnly `refreshToken` cookie for a fresh access token. |
| `POST` | `/api/v1/auth/forget-password` | Public | Dispatches password reset link via Nodemailer SMTP. |
| `POST` | `/api/v1/auth/reset-password` | Protected | Verifies reset token signature and commits new password. |

#### Example: Login Request
```json
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "user123"
}
```

---

### 3.2 User Management Module (`/user` & `/users`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/user/register` | Public | Registers a new user with email and hashed password. |
| `PUT` | `/api/v1/user/:email` | Public | Upserts user record from Firebase Social Login. |
| `GET` | `/api/v1/users` | Admin | Retrieves all active users for administrative dashboard. |
| `GET` | `/api/v1/users/:email` | Protected | Retrieves single user profile by email address. |
| `PATCH` | `/api/v1/users/user/:id` | Admin | Sets specified user role to `user`. |
| `PATCH` | `/api/v1/users/seller/:id` | Admin | Promotes specified user role to `seller`. |
| `PATCH` | `/api/v1/users/admin/:id` | Admin | Promotes specified user role to `admin`. |
| `DELETE`| `/api/v1/users/user/:id` | Admin | Removes a user from the platform. |

---

### 3.3 Product Catalog Module (`/` & `/api/v1`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/allProducts` | Public | Retrieves all approved products (supports `?category=`, `?search=`). |
| `GET` | `/api/v1/allProducts/:category`| Public | Filters products by category name or tag. |
| `GET` | `/api/v1/productDetails/:id` | Public | Retrieves detailed metadata and reviews for a single product. |
| `GET` | `/api/v1/myProducts/:email` | Seller | Retrieves all products uploaded by the specified seller email. |
| `POST` | `/api/v1/saveProduct` | Seller/Admin | Creates a new toy listing with auto-generated SKU. |
| `PATCH` | `/api/v1/updateProduct/:id` | Seller/Admin | Modifies toy price, title, category, or inventory quantity. |
| `PATCH` | `/api/v1/approveProduct/:id` | Admin | Updates product approval state to `approved`. |
| `DELETE`| `/api/v1/deleteProduct/:id` | Seller/Admin | Permanently deletes a toy listing. |
| `GET` | `/api/v1/scienceSubCategory` | Public | Subcategory helper for Science toys. |
| `GET` | `/api/v1/languageSubCategory`| Public | Subcategory helper for Language toys. |
| `GET` | `/api/v1/engineeringSubCategory` | Public | Subcategory helper for Engineering toys. |

#### Example: Product Submission Payload
```json
POST /api/v1/saveProduct
Content-Type: application/json

{
  "product_name": "Eco Wooden Building Blocks",
  "img": "https://i.ibb.co/example/blocks.jpg",
  "product_category": "Wood Toys",
  "category": "Educational Toy",
  "quantity": 25,
  "price": 49.99,
  "description": "Premium solid-beech building blocks finished with non-toxic waterborne color.",
  "seller": "WonderToys Studio",
  "seller_email": "seller@toytown.com",
  "tags": ["Wood", "Creative", "Blocks"]
}
```

---

### 3.4 Cart Module

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/cartProduct` | Customer | Adds a toy item to customer's personal cart. |
| `GET` | `/api/v1/cartProducts/:email` | Customer | Lists all cart items for customer email. |
| `DELETE`| `/api/v1/deleteCartProduct/:id`| Customer | Removes an item from the cart. |

---

### 3.5 Payment & Purchase History Module

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/payment` | Customer | Records a completed toy order with shipping address & transaction ID. |
| `GET` | `/api/v1/payment/:email` | Customer | Fetches chronological purchase history for the specified customer. |

---

### 3.6 Reviews & Feedback Module

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/reviewProduct` | Customer | Submits a star rating and written review for a product. |
| `GET` | `/api/v1/reviewProduct/:id` | Public | Retrieves all approved reviews for a toy product ID. |
| `POST` | `/api/v1/feedback` | Customer | Submits global platform feedback with star rating. |
| `GET` | `/api/v1/feedbacks` | Public | Retrieves testimonials displayed on the homepage. |
