import { Request, Response } from 'express';
import pool from '../config/db';

export const createTask = async (req: Request, res: Response) => {
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
    console.error('Error creating task:', err);
    res.status(500).send('Error creating task');
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving tasks:', err);
    res.status(500).send('Error retrieving tasks');
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedCompleted = completed !== undefined ? completed : false;

    const result = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING id, title, completed',
      [title, updatedCompleted, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Error updating task');
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Error deleting task');
  }
};
