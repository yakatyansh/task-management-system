import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Welcome to Task Manager
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Organize your tasks efficiently and boost your productivity with our modern task management system.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/login" className="bg-blue-600 px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition text-white font-bold">
            Login
          </Link>
          <Link href="/signup" className="bg-purple-600 px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition text-white font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
