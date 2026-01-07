# URL Shortener API

The backend service for the URL Shortener, built with Express, TypeScript (ESM), and MySQL.

## Tech Stack
- Language: TypeScript (NodeNext / ES Modules)
- Framework: Express.js
- Database: MySQL
- Security: Bcrypt (Hashing) & JWT (Authentication)

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

**Success Response (Login/Me):**
```json
{
  "status": true,
  "user": { "id": 1, "name": "John", "email": "john@example.com" }
}
```


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