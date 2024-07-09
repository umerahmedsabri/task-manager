import pool from '../config/db';

const createTasksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT false
    );
  `;

  try {
    await pool.query(query);
    console.log('Tasks table created successfully');
  } catch (error) {
    console.error('Error creating tasks table:', error);
  }
};

export default createTasksTable;
