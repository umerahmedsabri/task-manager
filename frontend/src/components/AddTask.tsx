import React, { useState } from 'react';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (response.ok) {
          const data = await response.json();
          onAdd(data.title);
          setTitle('');
        } else {
          console.error('Failed to add task');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        disabled={isLoading}
        style={{ flex: '1', padding: '10px', fontSize: '16px' }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
