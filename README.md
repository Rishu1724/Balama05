# Balama Marketplace

A full-featured marketplace application with separate dashboards for buyers and sellers.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (for production) or MongoDB Community Server (for local development)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Balama005
```

### 2. Install Dependencies

#### Backend (Server)
```bash
cd server
npm install
```

#### Frontend (Client)
```bash
cd ../client
npm install
```

#### ML Engine
```bash
cd ../ml
npm install
```

### 3. Environment Variables

The .env files are already configured for development. You can modify them if needed:

- **Client**: `client/.env`
- **Server**: `server/.env`
- **ML Engine**: `ml/.env`

### 4. Start the Application

#### Option 1: Start All Services Separately

1. **Start Backend Server** (in a new terminal):
```bash
cd server
node server.js
```

2. **Start Frontend Application** (in a new terminal):
```bash
cd client
npm run dev
```

3. **Start ML Engine** (in a new terminal):
```bash
cd ml
node index.js
```

#### Option 2: Using Batch Script (Windows)
```bash
start-all.bat
```

### 5. Access the Application

Once all services are running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **ML Engine**: http://localhost:4000

## Features

### Seller Dashboard
- Product Management
- Order Management
- Messaging System
- Store Profile
- Promotions
- Earnings Tracking
- Analytics
- Dispute Management
- Notifications
- Settings

### Buyer Dashboard
- Product Search and Browsing
- Purchase History
- Wishlist
- Product Comparison
- Messaging System
- Profile Management
- Notifications
- Settings

## Technology Stack

### Frontend
- React.js 18+
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Firebase SDK
- Zustand (State Management)
- React Hook Form (Form Handling)
- Axios (HTTP Requests)
- Socket.io (Real-time Communication)

### Backend
- Node.js
- Express.js
- MongoDB (Primary Database)
- Firebase Admin SDK
- Multer (File Uploads)
- JWT (Authentication)
- Nodemailer (Email)
- Stripe (Payments)

### ML Engine
- Node.js
- Express.js
- TensorFlow.js (ML Library)
- CSV Parser (Data Processing)

## Database

The application uses MongoDB as the primary database. The connection is configured in `server/.env`:
```
MONGODB_URI=mongodb+srv://rishukumar1724rr_db_user:95KLe8FKh85mJzIQ@cluster0.jmngfes.mongodb.net/marketplace?retryWrites=true&w=majority
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order by ID

### Users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

## Machine Learning Features

### Seller Features
- Demand Forecasting
- Price Optimization
- Delivery Time Prediction
- Product Recommendations
- Stock Level Forecasting

### Buyer Features
- Personalized Recommendations
- Smart Search Ranking
- Dynamic Offers

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If ports 3000, 3001, or 4000 are in use, the application will automatically select alternative ports.

2. **MongoDB Connection**: Ensure you have internet connectivity and the MongoDB Atlas connection string is correct.

3. **CORS Errors**: The backend is configured to allow requests from http://localhost:3000.

### Need Help?

If you encounter any issues, please check the console logs for error messages and ensure all environment variables are correctly configured.