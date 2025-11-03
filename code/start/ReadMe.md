Secure API Endpoint with Express.js, JWT, and RBAC
Overview

This project demonstrates a secure backend API using:

Express.js for routing

JWT-based authentication

Role-Based Access Control (RBAC)

bcrypt for password hashing

Winston for structured logging

Helmet, CORS, and rate-limiting for security

express-validator for request validation

Centralized error handling

Users can signup, login, and access endpoints depending on their role.

Requirements

Node.js >= 18

npm

(Optional) VS Code Dev Container for preconfigured environment

Setup

1.Clone the repository:
    git clone <your-repo-url>
    cd <repo-folder>

2.Install dependencies:
    npm install

3.Create .env in the project root:
    PORT=3000
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRY=1h
    LOG_DIR=logs
    RATE_LIMIT_WINDOW_MS=60000
    RATE_LIMIT_MAX=100

4.Run the server in development mode;
    npm run dev


API Endpoints
1.Public endpoint
    GET /secure/public

    Response:
    { "message": "public endpoint - no auth required" }

2.Signup
    POST /auth/signup

    Body (JSON):
    {
    "username": "bob",
    "password": "bobpass",
    "role": "USER"
    }

    Response:
    {
    "id": "uuid",
    "username": "bob",
    "role": "USER"
    }

3.Login
    POST /auth/login

    Body (JSON):
    {
    "username": "bob",
    "password": "bobpass"
    }

    Response:
    {
    "token": "<JWT_TOKEN>"
    }

4.Protected endpoints

    /secure/me → Requires authentication (any user)
    /secure/admin → Requires ADMIN role

    Example Header:
    Authorization: Bearer <JWT_TOKEN>

    Response:
    { "message": "hello admin - sensitive data" }



Logging & Errors

    All requests and errors are logged using Winston to both console and logs/ folder.

    Centralized error handling ensures consistent JSON error responses.



Testing

    Use curl, Postman, or VS Code REST client.

    Example:
        curl -X POST http://localhost:3000/auth/signup \
        -H "Content-Type: application/json" \
        -d '{"username":"bob","password":"bobpass","role":"USER"}'
    Login and use the returned token to access protected endpoints.