"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import TaskForm from "./TaskForm";

const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3000/api/tasks", {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczOTg5OTgzNywiZXhwIjoxNzQwNTA0NjM3fQ._AP1NqznaI3mt-e5xXcNKjj1-QwMB2MX46FSEdB38tw` },
  });
  return res.data.data;
};

export default function TaskList() {
  const { data: tasks, error, isLoading } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczOTg5OTgzNywiZXhwIjoxNzQwNTA0NjM3fQ._AP1NqznaI3mt-e5xXcNKjj1-QwMB2MX46FSEdB38tw` },
      });
  
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh task list
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div>
      <button onClick={() => { setShowForm(true); setSelectedTask(null); }} className="bg-green-500 text-black p-2 rounded mb-4">
        + Add Task
      </button>

      {showForm && <TaskForm task={selectedTask} onClose={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="bg-white p-4 shadow rounded">
            <h3 className="font-bold text-blue-800">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.description}</p>
            <p className="text-xs text-blue-500">Priority: {task.priority}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => { setSelectedTask(task); setShowForm(true); }} className="bg-yellow-500 text-white p-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white p-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
