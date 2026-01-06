# URL Shortener Service

A full-stack URL shortener application that allows authenticated users to create, manage, and track shortened URLs via a dashboard.

## 📂 Project Structure

This is a monorepo-style setup containing both the frontend and backend:

- **/frontend**: Next.js (React) application using Tailwind CSS.
- **/backend**: Express API using TypeScript (ESM) and MySQL.

## Getting Started

To run this project locally, follow these steps in order:

### 1. Database Setup
- Ensure you have a MySQL server running.
- Create a database named `url_shortener`.
- The table schemas are located in `/backend/src/config/schema.sql`.

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and fill in your database credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Tech Stack
- Frontend: Next.js (App Router), Tailwind CSS, Axios
- Backend: Node.js, Express, TypeScript (NodeNext/ESM)
- Database: MySQL (Relational)
- Auth: JWT (JSON Web Tokens) & Bcrypt (Password Hashing)

## Design Decisions
- NodeNext/ESM: Configured the backend to use modern ES Modules for better compatibility with the latest Node.js ecosystem.
- Relational Integrity: Used MySQL to ensure a strict one-to-many relationship between users and their shortened URLs.
- Middleware Security: Implemented custom JWT middleware to protect the user's dashboard and enforce the 100-URL limit.

## Timeline
**Created:** January 6, 2026  
**Last Updated:** January 7, 2026  

Feel free to provide any feedback, thanks