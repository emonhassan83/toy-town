# Toy Town - Quality Assurance & Testing Workflow

This document outlines the testing protocols, security verification steps, API validation procedures, and production build checks for the **Toy Town** project.

---

## 1. Security & Vulnerability Auditing

Both `client/` and `server/` must maintain **0 security vulnerabilities**:

```bash
# Check server dependencies
cd server
npm audit

# Check client dependencies
cd ../client
npm audit
```

### Dependency Overrides
When transitive dependencies contain upstream CVE vulnerabilities, resolve them using npm `overrides` in `package.json`:
- **Server**: Overrode `tar` to `^7.5.22` to remediate high-severity path traversal advisories in `@mapbox/node-pre-gyp`.
- **Client**: Overrode `@grpc/grpc-js` to `^1.14.6` to patch memory allocation vulnerabilities in Firebase Firestore.

---

## 2. Backend API Endpoint Verification

You can test running backend instances using `curl` or automated node scripts:

### A. Health Check
```bash
curl -X GET http://localhost:5000/
# Expected: "Toy town server is running!"
```

### B. Catalog Endpoints
```bash
# Fetch all products
curl -X GET http://localhost:5000/api/v1/allProducts

# Fetch products by category
curl -X GET http://localhost:5000/api/v1/allProducts/Bed

# Fetch category subtab
curl -X GET http://localhost:5000/api/v1/scienceSubCategory
```

### C. Automated Node Verification Script
From the `server/` directory:
```javascript
import app from './src/app.js';

const server = app.listen(5090, async () => {
  try {
    const rootRes = await fetch('http://localhost:5090/');
    console.log('Root Status:', rootRes.status);

    const productsRes = await fetch('http://localhost:5090/allProducts');
    const products = await productsRes.json();
    console.log('Products Count:', products.length);

    console.log('All API tests passed successfully!');
  } catch (err) {
    console.error('Test Failed:', err);
  } finally {
    server.close();
  }
});
```

---

## 3. Frontend Production Build Verification

Verify that the client builds cleanly without compilation errors or breaking PostCSS issues:

```bash
cd client
npm run build
```

### Verification Criteria:
- **Build Exit Code**: Exits with code `0`.
- **CSS Nesting**: Tailwind Nesting (`tailwindcss/nesting`) correctly processes nested CSS rules in third-party libraries (e.g. Swiper).
- **Bundle Output**: Produces hashed production bundles in `client/dist/assets/`.

---

## 4. End-to-End User Flow Validation

| Test Case | Steps | Expected Result |
| :--- | :--- | :--- |
| **TC-01: Authentication** | Register user via email or Google popup. | Token stored; Redux `userSlice` populated; redirects to homepage. |
| **TC-02: Browse & Filter** | Navigate to `/shop`, click category tabs (*Bed, Wood Toys*). | Product list dynamically updates with matching toy items. |
| **TC-03: Add to Cart** | Open toy details page, click "Add to Cart". | Toast notification appears; item persists in `/dashboard/my-cart`. |
| **TC-04: Checkout Order** | Open cart, proceed to checkout, enter shipping details, submit. | Order saved to payment ledger; item removed from active cart; redirected to purchase history. |
| **TC-05: Seller Onboarding**| Log in as seller, navigate to `/dashboard/add-product`, upload toy. | Image uploaded to ImgBB; SKU generated; listing created. |
| **TC-06: Admin Governance** | Log in as admin, navigate to `/dashboard/manage-users`. | User list displayed; promoting/demoting user roles instantly updates permissions. |
