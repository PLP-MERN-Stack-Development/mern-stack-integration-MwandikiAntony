import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Patients() {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await API.get("/patients", { headers: { Authorization: `Bearer ${token}` } });
      setPatients(res.data);
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((p) => (
          <li key={p._id}>{p.name} ({p.age}) — {p.condition}</li>
        ))}
      </ul>
    </div>
  );
}
