import express from 'express';
import pool from './db';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const existingTask = await pool.query('SELECT * FROM tasks WHERE title = $1', [title]);
    if (existingTask.rows.length > 0) {
      res.status(409).send('Task already exists');
      return;
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING id, title, completed',
      [title, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error creating task');
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving tasks');
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING id, title, completed',
      [title, completed, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating task');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error deleting task');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
