import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-6">Task Manager</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link href="/tasks" className="hover:bg-gray-700 p-2 rounded">Tasks</Link>
        <Link href="/projects" className="hover:bg-gray-700 p-2 rounded">Projects</Link>
        <Link href="/categories" className="hover:bg-gray-700 p-2 rounded">Categories</Link>
      </nav>
    </div>
  );
}
