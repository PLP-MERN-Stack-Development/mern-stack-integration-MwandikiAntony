import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Patients() {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await API.get("/patients", { headers: { Authorization: `Bearer ${token}` } });
      setPatients(res.data);
    };
    fetchPatients();
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Patients</h2>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Patient
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        {patients.length === 0 ? (
          <p className="text-gray-500 text-center">No patients found.</p>
        ) : (
          <ul className="space-y-3">
            {patients.map((p) => (
              <li
                key={p._id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-gray-500 text-sm">
                    Age: {p.age} | Condition: {p.condition}
                  </p>
                </div>
                <div className="text-gray-400 text-sm">{p.notes}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
