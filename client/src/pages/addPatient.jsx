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
    <form onSubmit={handleSubmit}>
      <h2>Add Patient</h2>
      {["name", "age", "gender", "condition", "notes"].map((f) => (
        <input key={f} placeholder={f} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button>Add</button>
    </form>
  );
}
