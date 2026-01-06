# URL Shortener API

The backend service for the URL Shortener, built with Express, TypeScript (ESM), and MySQL.

## Tech Stack
- Language: TypeScript (NodeNext / ES Modules)
- Framework: Express.js
- Database: MySQL
- Security: Bcrypt (Hashing) & JWT (Authentication)

## 📋 API Documentation



### Example Register Request:


### URL Endpoints

### Example Shorten Response:

## Database Schema

### Users Table
- id: INT (Primary Key)
- email: VARCHAR (Unique)
- password: VARCHAR (Hashed)
- created_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)

### URLs Table
- id: INT (Primary Key)
- user_id: INT (Foreign Key referencing Users)
- original_url: TEXT
- short_code: VARCHAR (Unique)
- click_count: INT (Default: 0)
- created_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)
- updated_at: TIMESTAMP (On Update: CURRENT_TIMESTAMP)

## ⚙️ Setup
1. Configure your .env file using the provided .env.example.
2. Run npm install.
3. Start the dev server: npm run dev.
4. Build for production: npm run build.