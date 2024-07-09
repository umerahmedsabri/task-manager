import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import createTasksTable from './migrations/createTasksTable';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

createTasksTable();

app.get('/', (req, res) => {
  res.send('Database Connected');
});

app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
