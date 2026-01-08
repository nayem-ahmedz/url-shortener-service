import mysql from 'mysql2/promise';

// validation check for env secrets
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Missing required database environment variables in .env');
}

const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});

export default pool;