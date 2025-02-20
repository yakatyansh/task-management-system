"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function AuthPage({ type }: { type: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await axios.post(endpoint, { email, password });
      if (res.status === 200 || res.status === 201) {
        if (type === "login") {
          localStorage.setItem("token", res.data.token);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {type === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 text-white p-3 rounded-md focus:ring focus:ring-blue-300 placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/20 text-white p-3 rounded-md focus:ring focus:ring-blue-300 placeholder-gray-300"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:scale-105 transition"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-sm mt-4">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link href={type === "login" ? "/signup" : "/login"} className="text-blue-300 hover:underline">
            {type === "login" ? "Sign up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
