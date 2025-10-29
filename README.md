# Balama Marketplace

A full-featured marketplace application with separate dashboards for buyers and sellers.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Firebase account

### Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database and Storage
3. Update the Firebase configuration in `client/src/firebase.js` with your project credentials
4. Deploy the security rules from `firebase.rules` to your Firebase project

### Environment Variables

Create `.env` files in both client and server directories:

**Client (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Server (.env)**
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
SENDGRID_API_KEY=your_sendgrid_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Running the Application

1. Start the backend server:
   ```bash
   cd server && npm run dev
   ```

2. Start the frontend:
   ```bash
   cd client && npm run dev
   ```

3. Visit `http://localhost:3000` in your browser

## Features

### Seller Dashboard
- Product Management (Upload products with images)
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

## Troubleshooting

### Firebase Permissions Error
If you see "Missing or insufficient permissions" errors:
1. Make sure you've deployed the Firebase security rules from `firebase.rules`
2. Ensure your Firebase project has Firestore Database and Storage enabled
3. Check that your Firebase configuration in `client/src/firebase.js` is correct

### React Router Warnings
The warnings about future flags are normal and can be ignored for now. They indicate upcoming changes in React Router v7.

### Image Upload Issues
If images are not uploading:
1. Check that Firebase Storage is enabled in your project
2. Verify the storage bucket name in your Firebase configuration
3. Ensure the security rules allow write access for authenticated users

## Technologies Used

- Frontend: React, Vite, Firebase SDK
- Backend: Node.js, Express.js, Firebase Admin SDK
- Database: Firebase Firestore
- Storage: Firebase Storage
- Authentication: Firebase Authentication

## Known Issues

1. Firebase service account not configured for server-side operations (running in mock mode)
2. Some CSS vendor prefixes may cause warnings in development