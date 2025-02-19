"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/signup", { email, password });

      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-600">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/20 text-white p-3 rounded-lg focus:outline-none placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/20 text-white p-3 rounded-lg focus:outline-none placeholder-gray-300"
            required
          />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg shadow-md hover:scale-105 transition">
            Sign Up
          </button>
        </form>
        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
