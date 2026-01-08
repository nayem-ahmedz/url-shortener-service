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
- cookie-parser

## API Documentation
All protected routes require the `token` HttpOnly cookie. Frontend requests must use `withCredentials: true`.

---

### Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create new account | No |
| `POST` | `/api/auth/login` | Login & set auth cookies | No |
| `GET` | `/api/auth/me` | Get current user data | Yes |
| `POST` | `/api/auth/logout` | Clear all auth cookies | Yes |


### URL Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/urls/shorten` | Create a shortened URL (Max 100/free) | Yes |
| `GET` | `/api/urls/my-links` | Fetch all links for the dashboard | Yes |
| `DELETE` | `/api/urls/delete/:id` | Remove a specific shortened link | Yes |
| `GET` | `/:shortCode` | Public redirect to original URL | No |


### Example Shorten Response:
```json
{
  "status": true,
  "shortCode": "x7K9mP2",
  "shortUrl": "http://localhost:5000/x7K9mP2"
}
```

## Database Setup and Schema

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


## ⚙️ Setup
1. Configure your .env file using the provided .env.example.
2. Run npm install.
3. Start the dev server: npm run dev.
4. Build for production: npm run build.