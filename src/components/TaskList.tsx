import React, { useState } from 'react';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
  };

  const handleEditSubmit = async (task: Task) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, completed: task.completed }),
      });

      if (response.ok) {
        onEdit(task.id, newTitle);
        setEditingTaskId(null);
        setNewTitle('');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#F2F2F2', borderRadius: '5px', padding: '10px' }}>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '3px',
            marginBottom: '5px',
          }}
        >
          <p style={{ marginRight: '10px', fontSize: '16px', color: '#333' }}>{task.id}</p>
          {editingTaskId === task.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: '1', fontSize: '16px', color: '#333' }}
            />
          ) : (
            <p style={{ flex: '1', fontSize: '16px', color: '#333' }}>{task.title}</p>
          )}
          <div style={{ display: 'flex', gap: '5px' }}>
            {editingTaskId === task.id ? (
              <button
                onClick={() => handleEditSubmit(task)}
                style={{
                  backgroundColor: '#F44336',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(task)}
                style={{
                  backgroundColor: '#F44336',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(task.id)}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
