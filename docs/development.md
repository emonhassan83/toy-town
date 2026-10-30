# Toy Town - Local Development Setup Guide

This document walks through setting up, configuring, and running the **Toy Town** project locally on Windows, macOS, or Linux.

---

## 1. System Prerequisites

Before beginning, ensure your local workstation has the following installed:
- **Node.js**: `v18.0.0` or higher (`node -v`)
- **npm**: `v9.0.0` or higher (`npm -v`)
- **Git**: `v2.30.0` or higher
- **MongoDB**: (Optional) Local MongoDB or free MongoDB Atlas cloud connection string.

---

## 2. Step-by-Step Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/emonhassan83/toy-town.git
cd toy-town
```

---

### Step 2: Configure & Start the Backend (`server/`)

1. Change into the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server/` with the following template:
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
4. Start the server:
   ```bash
   # Development mode with nodemon auto-restart
   npm run server

   # Or standard node execution
   npm start
   ```
   > The API server will be listening at: `http://localhost:5000`  
   > Healthcheck test: `http://localhost:5000/` returns `"Toy town server is running!"`

---

### Step 3: Configure & Start the Frontend (`client/`)

1. Open a new terminal and change into the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in `client/` with your Firebase & API configuration:
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
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > The client interface will be available at: `http://localhost:5173`

---

## 3. Available npm Scripts

### Backend (`server/`)
- `npm start`: Starts the server using Node.js (`node src/server.js`).
- `npm run server`: Starts the server with live-reloading via Nodemon.
- `npm run build`: Verification script for deployment pipelines.

### Frontend (`client/`)
- `npm run dev`: Launches Vite development server on port 5173 with Hot Module Replacement (HMR).
- `npm run build`: Bundles the React application for production into `dist/`.
- `npm run preview`: Previews the compiled production build locally.
- `npm run lint`: Executes ESLint rules across `src/`.

---

## 4. Troubleshooting Common Issues

### MongoDB Connection Timeout
If you encounter `ECONNREFUSED` or DNS SRV errors connecting to MongoDB Atlas:
- The server automatically engages its **Offline Resilient Mode**, reading toy catalog data from `server/data/productData.json`. The store remains fully browsable while you verify your network connection or IP whitelist on MongoDB Atlas.

### CORS Origin Errors
If the browser console displays a CORS policy block:
- Ensure `server/.env` has `CLIENT_URL=http://localhost:5173` matching the client origin.

### Firebase OAuth Domain Error
If Google Social Login shows `auth/unauthorized-domain`:
- In your Firebase Console, navigate to **Authentication** > **Settings** > **Authorized Domains**, and verify that `localhost` is present in the list.
