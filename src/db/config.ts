import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  user: import.meta.env.VITE_DB_USER || 'root',
  password: import.meta.env.VITE_DB_PASSWORD || '6290984l',
  database: import.meta.env.VITE_DB_NAME || 'shopease',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;