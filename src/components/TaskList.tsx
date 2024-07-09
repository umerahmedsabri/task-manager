import React, { useState } from "react";
import { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
  };

  const handleSaveClick = async (id: number) => {
    if (newTitle.trim()) {
      await onEdit(id, newTitle);
      setEditingTaskId(null);
    }
  };

  const handleCancelClick = () => {
    setEditingTaskId(null);
  };

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {editingTaskId === task.id ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: "1", padding: "5px", fontSize: "16px" }}
            />
          ) : (
            <span style={{ flex: "1", fontSize: "16px" }}>{task.title}</span>
          )}
          <div>
            {editingTaskId === task.id ? (
              <>
                <button
                  onClick={() => handleSaveClick(task.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditClick(task)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
