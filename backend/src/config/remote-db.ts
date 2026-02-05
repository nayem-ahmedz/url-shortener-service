import mysql from 'mysql2/promise';

// validation check for env secrets
const { TIDB_HOST, TIDB_USER, TIDB_PASSWORD, TIDB_DATABASE, TIDB_PORT } = process.env;

if (!TIDB_USER || !TIDB_PASSWORD || !TIDB_DATABASE) {
  throw new Error('Missing required TiDB environment variables in .env');
}

const pool = mysql.createPool({
  host: TIDB_HOST || '127.0.0.1',
  port: Number(TIDB_PORT) || 4000,
  user: TIDB_USER,
  password: TIDB_PASSWORD,
  database: TIDB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true, // This replaces the need for the CA file in most cloud environments
  },
  enableKeepAlive: true
});

export default pool;