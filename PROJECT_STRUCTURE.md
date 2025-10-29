# Balama Marketplace - Project Structure

## Overview
This document explains the structure of the Balama Marketplace project, which consists of a React frontend and a Node.js/Express backend.

## Directory Structure

```
balama-marketplace/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # State management (Zustand)
│   │   ├── utils/         # Utility functions
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # Entry point
│   │   └── firebase.js    # Firebase configuration
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend documentation
├── README.md              # Main project documentation
└── .gitignore             # Git ignore file
```

## Frontend (client/)

The frontend is built with React and uses several key technologies:

- **React.js 18+**: For building the user interface
- **Vite**: For fast development and building
- **Tailwind CSS**: For styling
- **Firebase SDK**: For authentication and database
- **Zustand**: For state management
- **React Hook Form**: For form handling
- **Axios**: For HTTP requests
- **Socket.io**: For real-time communication

### Key Components

1. **Authentication**: Sign up, login, and logout functionality
2. **Dashboard**: Separate dashboards for buyers and sellers
3. **Product Management**: Create, view, edit, and delete products
4. **Order Management**: View and manage orders
5. **Messaging**: Real-time chat between buyers and sellers
6. **Reviews**: Product and seller reviews
7. **Wishlist**: Save and manage favorite products
8. **Search**: Advanced product search with filters
9. **Payments**: Integration with Stripe for secure payments

## Backend (server/)

The backend is built with Node.js and Express, and uses Firebase for data storage:

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Firebase Admin SDK**: For server-side Firebase integration
- **Multer**: For file uploads
- **JWT**: For authentication
- **Nodemailer**: For email notifications
- **Socket.io**: For real-time communication

### API Endpoints

The backend provides RESTful API endpoints for all marketplace functionality:

1. **Auth**: User registration and authentication
2. **Products**: CRUD operations for products
3. **Orders**: Manage buyer orders
4. **Users**: User profile management
5. **Payments**: Process payments and refunds
6. **Messages**: Real-time messaging
7. **Reviews**: Product and seller reviews
8. **Wishlist**: Manage user wishlists
9. **Search**: Product search functionality
10. **Notifications**: User notifications
11. **Offers**: Buyer offers on products
12. **Disputes**: Handle order disputes
13. **Store**: Seller store profiles
14. **Saved Searches**: Save user search queries
15. **Promotions**: Manage product promotions
16. **Earnings**: Track seller earnings
17. **Analytics**: Performance metrics

### Data Models

The application uses the following data models stored in Firebase Firestore:

1. **Users**: User profiles and authentication
2. **Products**: Product listings
3. **Orders**: Order information
4. **Messages**: Conversation and message data
5. **Reviews**: Product and seller reviews
6. **Wishlists**: User wishlists
7. **Saved Searches**: User search queries
8. **Notifications**: User notifications
9. **Offers**: Buyer offers
10. **Disputes**: Order disputes
11. **Store Profiles**: Seller store information
12. **Promotions**: Product promotions
13. **Earnings**: Seller earnings data

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Setup

1. Clone the repository
2. Install frontend dependencies: `cd client && npm install`
3. Install backend dependencies: `cd server && npm install`
4. Set up Firebase:
   - Create a Firebase project
   - Add your Firebase configuration to `client/src/firebase.js`
   - Download service account key and save as `server/firebase-service-account.json`
5. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Fill in the required values

### Running the Application

1. Start the backend server: `cd server && npm run dev`
2. Start the frontend development server: `cd client && npm run dev`

## Deployment

The application can be deployed to any platform that supports Node.js and static file hosting:

- **Backend**: Can be deployed to services like Heroku, AWS, Google Cloud, etc.
- **Frontend**: Can be deployed to services like Vercel, Netlify, Firebase Hosting, etc.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request