import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'task_manager',
  password: 'root',
  port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to the database');
  });

  pool.on('error', (err, client) => {
    console.error('Error connecting to the database:', err);
    client.release();
  });

export default pool;
