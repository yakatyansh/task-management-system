"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3000/api/tasks", {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczOTYzNzc3OCwiZXhwIjoxNzQwMjQyNTc4fQ.otWReeBLIR1o_8olQ6GJn5yuo5TBVxtdrehPB2lUFrE` },
  });
  return res.data.data;
};

export default function TaskList() {
  const { data: tasks, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task: any) => (
        <div key={task.id} className="bg-white p-4 shadow rounded">
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
          <p className="text-xs text-blue-500">Priority: {task.priority}</p>
        </div>
      ))}
    </div>
  );
}
