# Toy Town - Production Deployment Guide

This guide covers deployment instructions for the **Toy Town** client and server across cloud providers including Vercel, Firebase Hosting, Render, and Netlify.

---

## 1. Architecture & Deployment Topology

```mermaid
graph LR
    User([User Browser])
    CDN["Vercel CDN / Firebase Hosting (Client SPA)"]
    API["Vercel / Render / Node Runtime (Express Server)"]
    DB[("MongoDB Atlas (Cloud Cluster)")]

    User -->|Static Assets & HTML| CDN
    User -->|API Requests (/api/v1)| API
    API -->|Encrypted Mongoose Connection| DB
```

---

## 2. Server Deployment (Vercel Serverless)

The backend is configured for deployment as a Vercel Serverless Node function via `server/vercel.json` and `server/index.js`.

### Configuration Files
- **`server/vercel.json`**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"]
    }
  ]
}
```

- **`server/index.js`**: Connects to MongoDB on warm execution and exports the Express `app` instance.

### Steps to Deploy Server on Vercel:
1. Navigate to `server/` directory:
   ```bash
   cd server
   ```
2. Link or import the repository in your Vercel Dashboard.
3. Configure the **Root Directory** as `server` (or run `vercel` from inside the `server/` folder).
4. Set required Environment Variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=mongodb+srv://<user>:<pass>@...`
   - `CLIENT_URL=https://your-client-domain.web.app`
   - `JWT_ACCESS_SECRET=...`
   - `JWT_REFRESH_SECRET=...`
   - `RESET_PASS_TOKEN=...`
   - `EMAIL=...`
   - `APP_PASS=...`
5. Click **Deploy**.

---

## 3. Client Deployment (Firebase Hosting / Vercel)

### Building the Client
From the `client/` directory:
```bash
cd client
npm install
npm run build
```
The output directory will be `client/dist/`.

### Option A: Firebase Hosting
The client includes `client/firebase.json` pre-configured for SPA rewrites:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```
Deploy via Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

### Option B: Vercel / Netlify
1. Select repository and set **Root Directory** to `client`.
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_APIKEY=...`
   - `VITE_AUTHDOMAIN=...`
   - `VITE_PROJECTID=...`
   - `VITE_STORAGEBUCKET=...`
   - `VITE_MESSAGINGSENDERID=...`
   - `VITE_APPID=...`
   - `VITE_IMGBB_KEY=...`
   - `VITE_API_URL=https://your-server-domain.vercel.app`

---

## 4. Production Checklist

- [x] Zero dependencies with known security vulnerabilities (`npm audit`).
- [x] CORS configured to accept only the production frontend URL.
- [x] Cookies set with `secure: true` and `sameSite: 'none'`.
- [x] Single Page Application routing rewrite active so deep links (e.g. `/shop`, `/dashboard/my-cart`) resolve to `/index.html`.
- [x] ImgBB API key active and validated for image uploads.
