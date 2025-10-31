import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddPatient() {
  const [form, setForm] = useState({ name: "", age: "", gender: "", condition: "", notes: "" });
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/patients", form, { headers: { Authorization: `Bearer ${token}` } });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100">
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-blue-600">Add Patient</h2>
        {["name", "age", "gender", "condition", "notes"].map((f) => (
          <div key={f}>
            <label className="block text-gray-700 mb-1">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
            <input
              placeholder={f}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Add</button>
      </form>
    </div>
  );
}
