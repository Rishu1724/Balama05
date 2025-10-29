# Balama Marketplace - Getting Started Guide

## Overview
This guide will help you set up and run the Balama Marketplace application locally.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git
- A Firebase account

## Project Structure
The project consists of two main parts:
1. **Client** - React frontend application
2. **Server** - Node.js/Express backend API

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd balama-marketplace
```

### 2. Set up the Client (Frontend)

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a Firebase project:
1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Register a web app in your Firebase project
4. Copy the Firebase configuration and add it to `client/src/firebase.js`

### 3. Set up the Server (Backend)

Navigate to the server directory:
```bash
cd ../server
```

Install dependencies:
```bash
npm install
```

Set up Firebase Admin SDK:
1. In your Firebase project, go to Project Settings
2. Navigate to the Service Accounts tab
3. Generate a new private key
4. Save the downloaded JSON file as `server/firebase-service-account.json`

Set up environment variables:
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Edit the `.env` file and fill in the required values:
   - JWT_SECRET: Generate a random secret string
   - STRIPE_SECRET_KEY: Your Stripe secret key
   - TWILIO_ACCOUNT_SID: Your Twilio account SID
   - TWILIO_AUTH_TOKEN: Your Twilio auth token
   - SENDGRID_API_KEY: Your SendGrid API key
   - GOOGLE_MAPS_API_KEY: Your Google Maps API key

### 4. Run the Application

Start the backend server:
```bash
npm run dev
```

In a new terminal, start the frontend development server:
```bash
cd ../client
npm run dev
```

The application should now be running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Development

### Frontend Development
The frontend uses:
- React with Vite for fast development
- Tailwind CSS for styling
- Zustand for state management
- React Hook Form for form handling

Key directories:
- `client/src/components/` - React components
- `client/src/pages/` - Page components
- `client/src/services/` - API service functions

### Backend Development
The backend uses:
- Node.js with Express
- Firebase Admin SDK for database operations
- JWT for authentication
- Stripe for payments

Key directories:
- `server/controllers/` - Request handlers
- `server/models/` - Data models
- `server/routes/` - API route definitions
- `server/middleware/` - Express middleware

## Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
cd server
npm test
```

## Deployment

### Frontend Deployment
The frontend can be built for production:
```bash
cd client
npm run build
```

The built files will be in the `client/dist/` directory, which can be deployed to any static hosting service.

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
```bash
cd server
npm start
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support
For support, please open an issue on the GitHub repository or contact the development team.

## License
This project is licensed under the MIT License.