# Secure API Endpoint – Express.js, JWT Authentication, and Role-Based Access Control

This project demonstrates how to build a secure backend API using Express.js, JSON Web Tokens (JWT), password hashing with bcrypt, structured logging with Winston, and role-based access control (RBAC). It also includes input validation, centralized error handling, rate limiting, and additional security middleware to create a more production-ready environment.

The purpose of this project is to show how a backend service can authenticate users, verify permissions, log requests, manage errors consistently, and restrict sensitive routes.

---

## Features

### Authentication
- User registration and login using JWT  
- Password hashing using bcrypt  
- JWT includes user ID, username, and role  

### Role-Based Access Control
- Certain routes require specific user roles  
- Middleware checks roles during request processing  

### Validation and Security
- Input validation using express-validator  
- Security headers using Helmet  
- Rate limiting to control API abuse  
- CORS enabled  

### Logging and Error Handling
- Structured logging with Winston and daily rotation  
- Centralized error-handling middleware  
- Logs written to console and rotating log files  

### Development Structure
- Built in TypeScript  
- Organized folder layout  
- In-memory user store for demonstration  

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd <project-folder>
```

Install dependencies: 
  npm install

---

## Environment Variables
Create a .env file in the project root:
  PORT=3000
  JWT_SECRET=your_secret_key_here
  JWT_EXPIRY=1h
  LOG_DIR=logs
  RATE_LIMIT_WINDOW_MS=60000
  RATE_LIMIT_MAX=100

---

## Running the Application
Development:
  npm run dev

Production: 
  npm run build
  npm start

If successful, the server will be available at:
  http://localhost:3000

---

### API Endpoints
## 1. User Signup
# POST /auth/signup
Example request body:
  {
    "username": "alice",
    "password": "alicepass",
    "role": "USER"
  }

Example response:
  {
    "id": "generated-uuid",
    "username": "alice",
    "role": "USER"
  }

---

## 2. User Login
# POST /auth/login
Example request body:
  {
    "username": "alice",
    "password": "alicepass"
  }

Example response:
  {
    "token": "jwt_token_here"
  }

---

## 3. Authenticated Route
# GET /secure/me
Requires:
  Authorization: Bearer <token>

---

## 4. Admin-Only Route
# GET /secure/admin
Authorization required. Must be an ADMIN user.

Possible outcomes:

-200 OK
-403 Forbidden
-401 Unauthorized

---

## 5. Public Route
# GET /secure/public
No authentication required

---

## Testing with cURL
Signup:
  curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass","role":"USER"}'

Login:
  curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

Access protected route:
  curl -X GET http://localhost:3000/secure/me \
  -H "Authorization: Bearer <token_here>"

---

## Logging

Logs are stored in the logs directory.
Daily rotation is handled with Winston's rotation transport.
Log entries are structured and formatted as JSON.

---

## Project Folder Structure

  src/
    config/
      logger.ts
    middleware/
      auth.ts
      errorHandler.ts
      requestLogger.ts
      rbac.ts
    routes/
      auth.ts
      secure.ts
    utils/
      users.ts
    server.ts
