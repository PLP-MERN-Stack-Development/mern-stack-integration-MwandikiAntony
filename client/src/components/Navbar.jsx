import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: "1rem", background: "#e6f2ff" }}>
      <Link to="/">Home</Link>{" | "}
      {user ? (
        <>
          <Link to="/add">Add Patient</Link>{" | "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
