# Expensy - Modern Expense Tracker

A premium, full-stack expense tracking application built with Node.js, Express, MongoDB, and React.

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Expense Management**: Add, view, and delete expenses.
- **Data Visualization**: Beautiful charts (Pie and Bar) using Recharts.
- **Premium UI**: Glassmorphism design with Framer Motion animations.
- **Responsive**: Works on desktop and mobile.

## Tech Stack
- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs.
- **Frontend**: React (Vite), Axios, Recharts, Lucide-React, Framer Motion.
- **Styling**: Vanilla CSS (Modern CSS variables and glassmorphism).

## How to Run

### 1. Backend
```bash
cd backend
npm install
npm start
```
*Note: Ensure MongoDB is running on `mongodb://localhost:27017/expense_tracker`*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense_tracker
JWT_SECRET=your_secret_key
```
