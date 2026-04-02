import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'interchange.proxy.rlwy.net',
  port: parseInt(process.env.DB_PORT || '50020'),
  database: process.env.DB_NAME || 'fluxive_db',
  user: process.env.DB_USER || 'fluxive_user',
  password: process.env.DB_PASSWORD || 'Fluxive@2026!',
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

export default pool;
