# Toy Town - Engineering Standards & Coding Rules

This document outlines the coding standards, design patterns, naming conventions, and best practices expected across the **Toy Town** codebase.

---

## 1. General Principles

- **Single Responsibility**: Each module, service, controller, and component should have a single, clearly defined purpose.
- **Fail-Safe & Resilient**: Gracefully handle missing data, network timeouts, and asynchronous errors without crashing the process.
- **Zero Vulnerability Standard**: Every new dependency must be vetted for security advisories. The workspace must always pass `npm audit`.

---

## 2. Backend Conventions (Express & Mongoose)

### 2.1 Modular Structure
Features are organized into domain modules under `server/src/app/modules/<domain>/`:
- `<domain>.controller.js`: Handles HTTP request decoding, calls services, sends HTTP responses.
- `<domain>.service.js`: Contains business logic and database query execution.
- `<domain>.route.js`: Declares endpoints, attaches authentication guards and Zod validators.
- `<domain>.model.js`: Defines Mongoose schema, methods, statics, and lifecycle hooks.
- `<domain>.validation.js`: Declares Zod schemas for request validation.

### 2.2 Controller Pattern
Always wrap controller methods with `catchAsync`:
```javascript
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import httpStatus from 'http-status';

export const getItems = catchAsync(async (req, res) => {
  const result = await ItemServices.getAllItems();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Items retrieved successfully',
    data: result,
  });
});
```

### 2.3 Error Handling
Throw `AppError` instances for operational errors:
```javascript
import AppError from '../../errors/AppError.js';
import httpStatus from 'http-status';

if (!user) {
  throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
}
```

### 2.4 Mongoose Model Rules
- Always guard password hashing in `pre('save')` hooks with `this.isModified('password')`.
- Suppress reserved key warnings when using fields like `collection`:
  ```javascript
  { timestamps: true, suppressReservedKeysWarning: true }
  ```

---

## 3. Frontend Conventions (React & Redux)

### 3.1 Component Architecture
- Prefer functional components with React Hooks.
- Organize views under `src/Pages/` and reusable presentation elements under `src/components/`.
- Manage tab and modal states locally with controlled components.

### 3.2 Server State Management (RTK Query)
- Never use direct `fetch` or `axios` inside UI components when an RTK Query endpoint is available.
- Always declare appropriate `tagTypes` on `baseApi.js` and specify `providesTags` on queries and `invalidatesTags` on mutations:
  ```javascript
  // Query
  getCartProducts: builder.query({
    query: (email) => `/cartProducts/${email}`,
    providesTags: ['Cart'],
  }),

  // Mutation
  deleteCartProduct: builder.mutation({
    query: (id) => ({
      url: `/deleteCartProduct/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Cart'],
  }),
  ```

### 3.3 Form Handling
- Utilize `react-hook-form` for form state and validation.
- Provide clear inline error messages using Tailwind typography (`text-xs text-red-500`).

---

## 4. Git & Commit Guidelines

- Commit messages must follow the Conventional Commits specification:
  - `feat: add order invoice generation`
  - `fix: prevent password double hashing on user profile update`
  - `docs: update API documentation for cart routes`
  - `refactor: extract user role promotion logic into service`
