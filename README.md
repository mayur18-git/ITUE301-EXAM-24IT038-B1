# QuickBite – Food Ordering System

## Project Description
QuickBite is a full-stack food ordering web application built for the ITUE301 Advanced Web Development Frameworks practical examination at CHARUSAT – CSPIT. It demonstrates React component architecture, REST APIs, JWT authentication, MongoDB with Mongoose, and modern full-stack development practices.

---

## Features
- Browse restaurants fetched from a real MongoDB database
- Client-side search/filter by name or cuisine
- JWT-based login (creates account on first login)
- Protected order page (redirects if not logged in)
- Controlled order form with live preview
- Admin panel loaded with React.lazy() and Suspense
- Global error handling and request logging middleware
- Mongoose validation with clean error responses
- populate() to join Customer and Restaurant data in orders

---

## Technology Stack
| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, React Router v6   |
| State      | Context API, useState, useEffect  |
| Backend    | Node.js, Express.js               |
| Auth       | JWT (jsonwebtoken)                |
| Database   | MongoDB, Mongoose                 |
| Dev Tools  | nodemon, VS Code                  |

---

## Folder Structure
```
QuickBite/
├── frontend/src/
│   ├── components/   Navbar, RestaurantCard, ProtectedRoute
│   ├── context/      AuthContext
│   ├── pages/        HomePage, RestaurantsPage, OrderPage, AdminPanel
│   ├── App.jsx       Router + lazy + Suspense
│   └── index.css
├── backend/
│   ├── config/       db.js
│   ├── controllers/  authController, restaurantController, orderController
│   ├── middleware/   authGuard, requestLogger, errorHandler
│   ├── models/       Customer, Restaurant, Order
│   ├── routes/       authRoutes, restaurantRoutes, orderRoutes
│   ├── seed.js
│   └── server.js
```

---

## Prerequisites
- Node.js v18+
- MongoDB (local) OR MongoDB Atlas account
- VS Code
- Git

---

## MongoDB Setup

### Option A – Local MongoDB
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. Use connection string: `mongodb://127.0.0.1:27017/quickbite`

### Option B – MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user with password
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Copy the connection string and replace `<password>` with your password
6. Set it as `MONGO_URI` in `backend/.env`

---

## Backend Installation
```bash
cd QuickBite/backend
npm install
```

---

## Frontend Installation
```bash
cd QuickBite/frontend
npm install
```

---

## Environment Variables

### backend/.env  ⚠️ DO NOT COMMIT THIS FILE
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickbite
JWT_SECRET=quickbite_exam_secret_2026
```

### frontend/.env  ⚠️ DO NOT COMMIT THIS FILE
```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Seed Database
```bash
cd QuickBite/backend
npm run seed
```
This inserts 4 sample restaurants: Spice Garden, Pizza Palace, Burger Hub, Green Bowl.

---

## Start Backend
```bash
cd QuickBite/backend
npm run dev
# Server runs on http://localhost:5000
```

---

## Start Frontend
```bash
cd QuickBite/frontend
npm run dev
# App runs on http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint                        | Auth Required | Description              |
|--------|---------------------------------|---------------|--------------------------|
| POST   | /api/v1/auth/login              | No            | Login / register customer|
| GET    | /api/v1/restaurants             | No            | Get all restaurants      |
| POST   | /api/v1/orders                  | Yes (Bearer)  | Create new order         |
| GET    | /api/v1/orders                  | Yes (Bearer)  | Get my orders (populated)|
| PATCH  | /api/v1/orders/:id/status       | Yes (Bearer)  | Update order status      |

---

## Authentication
1. POST to `/api/v1/auth/login` with `{ "email": "..." }`
2. Server returns a JWT token valid for 24 hours
3. Frontend stores token in localStorage via AuthContext
4. Protected requests send `Authorization: Bearer <token>` header
5. authGuard middleware verifies the token on protected routes

---

## Testing
1. Start backend: `npm run dev` in `/backend`
2. Seed database: `npm run seed` in `/backend`
3. Start frontend: `npm run dev` in `/frontend`
4. Open http://localhost:5173
5. Login with any email
6. Browse restaurants and search
7. Place an order
8. Visit /admin to see lazy loading

---

## GitHub Instructions
```bash
git init
git add .
git commit -m "feat: initial QuickBite project setup"
git branch -M main
git remote add origin https://github.com/<username>/quickbite.git
git push -u origin main
```

---

## License
MIT – For educational purposes, CHARUSAT CSPIT ITUE301
