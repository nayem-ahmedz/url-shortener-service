# URL Shortener API

The backend service for the URL Shortener, built with Express, TypeScript (ESM), and MySQL.

## Tech Stack
- Language: TypeScript (NodeNext / ES Modules)
- Framework: Express.js
- Database: MySQL
- Security: Bcrypt (Password Hashing) & JWT (Authentication)

## Used Packages
- bcrypt
- cors
- dotenv
- jsonwebtoken
- mysql2
- axios

## API Documentation
All protected routes require the `JWT token`. Frontend requests must use Authorization header with proper token.

---

### Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new account | No |
| `POST` | `/api/auth/login` | Login & send JWT token | No |
| `GET` | `/api/auth/me` | Get current user data | Yes |
| `POST` | `/api/auth/logout` | Clear logged in user | Yes |


### URL Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/url/` | Create a shortened URL (Max 10/free) | Yes |
| `GET` | `/api/url/` | Fetch all links for the dashboard | Yes |
| `DELETE` | `/api/url/:id` | Remove a specific shortened link | Yes |
| `GET` | `/:shortCode` | Public redirect to original URL | No |


### Example Shorten Response:
```json
{
  "status": true,
  "shortCode": "x7K9mP2"
}
```

## Database Setup and Schema
- For localhost testing, use config/db.ts

### Create Database
```sql
CREATE DATABASE url_shortener;
USE url_shortener;
```
### Create Users Table
- Stores registered users

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create Users Table
- Stores shortened URLs with click tracking and foreign key reference to users.

```sql
CREATE TABLE IF NOT EXISTS urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    long_url TEXT NOT NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE,
    clicks INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);
-- Optimization Indexes: creating index for faster access
CREATE INDEX idx_user_urls ON urls(user_id);
CREATE INDEX idx_short_code ON urls(short_code);
```


## Setup
1. Configure your .env file using the provided .env.example.
2. Run npm install.
3. Start the dev server: npm run dev.
4. Build for production: npm run build.

```bash
cd backend
npm install
# Copy .env.example to .env and fill with your credentials
npm run dev
```