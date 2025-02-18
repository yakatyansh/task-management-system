import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        <TaskList />
      </div>
    </div>
  );
}
