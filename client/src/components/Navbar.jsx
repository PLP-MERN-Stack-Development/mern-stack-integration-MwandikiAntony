import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/add" className="hover:underline">
                Add Patient
              </Link>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
