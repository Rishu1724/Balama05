# Balama Marketplace API Documentation

## Overview
This document provides documentation for the Balama Marketplace RESTful API.

## Authentication
Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get a product by ID
- `PUT /api/products/{id}` - Update a product
- `DELETE /api/products/{id}` - Delete a product
- `GET /api/products/search` - Search products
- `POST /api/products/{id}/views` - Increment product views

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get an order by ID
- `PUT /api/orders/{id}` - Update an order
- `DELETE /api/orders/{id}` - Delete an order
- `POST /api/orders/{id}/refund` - Request a refund for an order

### Users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get a user by ID
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user
- `GET /api/users/{id}/ratings` - Get user ratings

### Payments
- `POST /api/payments` - Process a payment
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/refund` - Process a refund

### Messages
- `GET /api/messages/{conversationId}` - Get messages in a conversation
- `POST /api/messages` - Send a new message
- `GET /api/conversations` - Get user conversations
- `POST /api/conversations` - Create a new conversation

### Reviews
- `POST /api/reviews` - Create a new review
- `GET /api/reviews/{userId}` - Get reviews for a user
- `PUT /api/reviews/{id}` - Update a review
- `DELETE /api/reviews/{id}` - Delete a review

### Wishlist
- `POST /api/wishlist` - Create a new wishlist
- `DELETE /api/wishlist/{id}` - Delete a wishlist
- `GET /api/wishlist` - Get user wishlists

### Search
- `GET /api/search/products` - Search products with filters
- `POST /api/search/products/{id}/views` - Increment product views

### Notifications
- `POST /api/notifications/{userId}` - Create a notification
- `GET /api/notifications/{userId}` - Get user notifications
- `PUT /api/notifications/{userId}/{id}/read` - Mark notification as read
- `DELETE /api/notifications/{userId}/{id}` - Delete a notification

### Offers
- `POST /api/offers` - Create a new offer
- `GET /api/offers/{id}` - Get an offer by ID
- `GET /api/offers/product/{productId}` - Get offers for a product
- `GET /api/offers/buyer/{buyerId}` - Get offers for a buyer
- `PUT /api/offers/{id}` - Update an offer
- `DELETE /api/offers/{id}` - Delete an offer

### Disputes
- `POST /api/disputes` - Create a new dispute
- `GET /api/disputes/{id}` - Get a dispute by ID
- `GET /api/disputes/order/{orderId}` - Get disputes for an order
- `GET /api/disputes/user/{userId}` - Get disputes for a user
- `PUT /api/disputes/{id}` - Update a dispute
- `DELETE /api/disputes/{id}` - Delete a dispute

### Store Profiles
- `POST /api/store/{sellerId}` - Create or update store profile
- `GET /api/store/{sellerId}` - Get store profile
- `PUT /api/store/{sellerId}` - Update store profile
- `DELETE /api/store/{sellerId}` - Delete store profile

### Saved Searches
- `POST /api/saved-searches/{userId}` - Create a saved search
- `GET /api/saved-searches/{userId}` - Get user saved searches
- `GET /api/saved-searches/{userId}/{id}` - Get a saved search by ID
- `PUT /api/saved-searches/{userId}/{id}` - Update a saved search
- `DELETE /api/saved-searches/{userId}/{id}` - Delete a saved search

### Promotions
- `POST /api/promotions` - Create a new promotion
- `GET /api/promotions/{id}` - Get a promotion by ID
- `GET /api/promotions` - Get all active promotions
- `GET /api/promotions/product/{productId}` - Get promotions for a product
- `PUT /api/promotions/{id}` - Update a promotion
- `DELETE /api/promotions/{id}` - Delete a promotion
- `POST /api/promotions/{id}/views` - Increment promotion views
- `POST /api/promotions/{id}/clicks` - Increment promotion clicks

### Earnings
- `POST /api/earnings/{sellerId}` - Create or update earnings
- `GET /api/earnings/{sellerId}` - Get seller earnings
- `PUT /api/earnings/{sellerId}` - Update earnings
- `POST /api/earnings/{sellerId}/transactions` - Add a transaction
- `POST /api/earnings/{sellerId}/payout` - Request a payout

### Analytics
- `GET /api/analytics/seller/{sellerId}` - Get seller performance metrics
- `GET /api/analytics/product/{productId}` - Get product analytics
- `GET /api/analytics/buyer/{buyerId}` - Get buyer analytics

## Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Description of the action",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Description of the error"
}
```

## Rate Limiting
The API implements rate limiting to prevent abuse. Exceeding the rate limit will result in a 429 (Too Many Requests) response.

## Error Codes
- `400` - Bad Request: The request was invalid
- `401` - Unauthorized: Authentication failed
- `403` - Forbidden: Access to the resource is forbidden
- `404` - Not Found: The requested resource was not found
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Something went wrong on our end

## Versioning
The API is currently at version 1. Versioning is done through the URL path:

```
/api/v1/endpoint
```

## Changelog
- v1.0.0: Initial release