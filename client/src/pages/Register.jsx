import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 text-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
