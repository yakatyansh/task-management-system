import Sidebar from "@/components/Sidebar";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Task Management Dashboard
        </h1>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
