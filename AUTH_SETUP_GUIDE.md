# Authentication System Setup Guide

## Overview
Complete authentication system with signup, login, forgot password, and reset password functionality using MongoDB, bcrypt for password encryption, and JWT for authentication.

## Backend Setup

### 1. Database Schema
**File:** `/backend/models/userSchema.js`

User model includes:
- name (required)
- email (required, unique, lowercase)
- password (required, min 8 characters, bcrypt encrypted)
- mobilenumber (required)
- resetPasswordToken (for password reset)
- resetPasswordExpires (token expiry time)

### 2. Authentication Routes
**File:** `/backend/routes/authRoutes.js`

Available endpoints:

#### POST `/api/auth/signup`
Creates a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobilenumber": "1234567890"
}
```

#### POST `/api/auth/login`
Authenticates user and returns JWT token
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/forgot-password`
Sends password reset token
```json
{
  "email": "john@example.com"
}
```

#### POST `/api/auth/reset-password`
Resets password using token
```json
{
  "resetToken": "token-from-forgot-password",
  "newPassword": "newpassword123"
}
```

#### GET `/api/auth/me`
Gets current user profile (requires JWT token)
```
Headers: { Authorization: "Bearer <token>" }
```

### 3. JWT Middleware
**File:** `/backend/middleware/authMiddleware.js`

Protects routes by verifying JWT tokens in Authorization header.

## Frontend Setup

### 1. Authentication Context
**File:** `/frontend/src/context/AuthContext.jsx`

Provides authentication state and methods throughout the app:
- `user` - Current user object
- `login(email, password)` - Login function
- `signup(name, email, password, mobilenumber)` - Signup function
- `logout()` - Logout function
- `forgotPassword(email)` - Send password reset
- `resetPassword(token, newPassword)` - Reset password
- `isAuthenticated` - Boolean authentication status

### 2. Components

#### SignupForm
**File:** `/frontend/src/components/auth/SignupForm.jsx`
- Collects user registration data
- Validates all fields
- On success, redirects to login form

#### LoginForm
**File:** `/frontend/src/components/auth/LoginForm.jsx`
- User authentication
- Stores JWT token in localStorage
- Includes "Forgot Password" link
- Integrated forgot password flow

#### ForgotPasswordPage
**File:** `/frontend/src/pages/ForgotPasswordPage.jsx`
- Request password reset via email
- Reset password with token
- Route: `/forgot-password`

## Authentication Flow

### Signup Flow
1. User fills signup form with name, email, password, mobile number
2. Frontend validates input (email format, password length, mobile number)
3. Sends POST request to `/api/auth/signup`
4. Backend validates data
5. Password is hashed using bcrypt (10 salt rounds)
6. User saved to MongoDB
7. Success message shown
8. User redirected to login form

### Login Flow
1. User enters email and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend finds user by email
4. Password compared using bcrypt.compare()
5. If valid, JWT token generated (expires in 7 days)
6. Token and user data returned to frontend
7. Token stored in localStorage
8. User object stored in localStorage and context
9. User redirected to homepage

### Forgot Password Flow
1. User clicks "Forgot Password" in login form
2. User enters email address
3. Frontend sends POST request to `/api/auth/forgot-password`
4. Backend generates random reset token
5. Token hashed and stored in user document
6. Token expires in 1 hour
7. Reset token returned (in production, send via email)
8. User can use token to reset password

### Reset Password Flow
1. User accesses `/forgot-password?token=<reset-token>`
2. User enters new password (min 8 characters)
3. Frontend sends POST request to `/api/auth/reset-password`
4. Backend validates token and expiry
5. New password hashed using bcrypt
6. Password updated in database
7. Reset token cleared
8. User redirected to login

## Security Features

### Password Security
- Minimum 8 characters required
- Encrypted using bcrypt with 10 salt rounds
- Never stored in plain text
- Never returned in API responses

### JWT Security
- Tokens expire after 7 days
- Stored in localStorage
- Sent in Authorization header as Bearer token
- Verified on protected routes

### Email Security
- All emails converted to lowercase
- Unique constraint in database
- Validated format before processing

### Reset Token Security
- Cryptographically random tokens
- Hashed before storage
- Expire after 1 hour
- Single-use tokens

## Environment Variables

Create `.env` file in backend directory:
```
MONGO_URL=mongodb://localhost:27017/travel-app
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=8000
```

## Testing the System

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```

### 3. Test Signup
- Open application in browser
- Click "Sign Up"
- Fill all fields
- Submit form
- Verify redirect to login

### 4. Test Login
- Use credentials from signup
- Click "Login"
- Verify successful authentication
- Check localStorage for token and user data

### 5. Test Forgot Password
- Click "Forgot Password"
- Enter email
- Copy the resetToken from response
- Navigate to `/forgot-password?token=<resetToken>`
- Enter new password
- Verify password reset successful

## API Response Examples

### Signup Success
```json
{
  "success": true,
  "message": "Account created successfully! Please login.",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "mobilenumber": "1234567890"
  }
}
```

### Login Success
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "mobilenumber": "1234567890"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Email already exists. Please use a different email."
}
```

## Common Issues and Solutions

### Issue: Bcrypt Installation Error
Solution: Rebuild bcrypt package
```bash
npm rebuild bcrypt
```

### Issue: MongoDB Connection Failed
Solution: Check MONGO_URL in .env file and ensure MongoDB is running

### Issue: Token Invalid/Expired
Solution: User needs to login again to get new token

### Issue: CORS Error
Solution: Backend already configured with cors(), ensure frontend uses correct API URL

## Files Modified/Created

### Backend
- ✅ Created: `models/userSchema.js`
- ✅ Created: `middleware/authMiddleware.js`
- ✅ Created: `routes/authRoutes.js`
- ✅ Updated: `server.js`
- ❌ Removed: `models/signupSchema.js`
- ❌ Removed: `routes/singnupRoutes.js`

### Frontend
- ✅ Updated: `src/components/auth/SignupForm.jsx`
- ✅ Updated: `src/components/auth/LoginForm.jsx`
- ✅ Updated: `src/components/auth/AuthModal.jsx`
- ✅ Updated: `src/context/AuthContext.jsx`
- ✅ Updated: `src/utils/api.js`
- ✅ Created: `src/pages/ForgotPasswordPage.jsx`
- ✅ Updated: `src/App.jsx`

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Test all authentication flows
4. Add email service for password reset (optional)
5. Add additional user profile features (optional)
