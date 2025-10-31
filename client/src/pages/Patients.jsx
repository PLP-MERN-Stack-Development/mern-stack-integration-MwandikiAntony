import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Patients() {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center pt-24 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Patient Records</h2>
          <Link
            to="/add"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Patient
          </Link>
        </div>

        {/* Patient List */}
        {patients.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border rounded-lg bg-gray-100">
            No patients found. Add your first patient above.
          </div>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {patients.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Age: {p.age} | Condition: {p.condition}
                  </p>
                  {p.notes && (
                    <p className="text-gray-500 text-sm mt-1 italic">Notes: {p.notes}</p>
                  )}
                </div>
                <div className="text-gray-400 text-sm">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    ID: {p._id.slice(-5)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
