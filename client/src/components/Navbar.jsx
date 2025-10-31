import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Home Link */}
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-200 transition">
            HealthApp
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/add"
                className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100 transition"
              >
                + Add Patient
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
