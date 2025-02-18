"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface TaskFormProps {
  task?: any; // If task is passed, we're editing
  onClose: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || 1);
  const [status, setStatus] = useState(task?.status || "pending");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, description, priority, status };

    try {
      if (task) {
        // Edit Task
        await axios.put(`/api/tasks/${task.id}`, payload, {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczOTg5OTgzNywiZXhwIjoxNzQwNTA0NjM3fQ._AP1NqznaI3mt-e5xXcNKjj1-QwMB2MX46FSEdB38tw` },
        });
      } else {
        // Create Task
        await axios.post("/api/tasks", payload, {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczOTg5OTgzNywiZXhwIjoxNzQwNTA0NjM3fQ._AP1NqznaI3mt-e5xXcNKjj1-QwMB2MX46FSEdB38tw` },
        });
      }

      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh tasks
      onClose(); // Close form
    } catch (error) {
      console.error("Task submission error:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold mb-2">{task ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="border p-2 rounded">
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{task ? "Update Task" : "Create Task"}</button>
      </form>
    </div>
  );
}
