import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddPatient() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", condition: "", notes: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);

      // Show success toast for 1.5 seconds, then redirect
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Failed to add patient:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center pt-24 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 relative">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Patient
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Patient Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.age}
            onChange={handleChange}
            required
          />
          <textarea
            name="condition"
            placeholder="Condition / Notes"
            rows="3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.condition}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Additional Notes"
            rows="2"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.notes}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Save Patient
          </button>
        </form>

        {/* Success Toast */}
        {success && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Patient added successfully!
          </div>
        )}
      </div>
    </div>
  );
}
