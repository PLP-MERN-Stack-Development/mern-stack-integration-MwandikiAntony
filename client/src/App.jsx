import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Patients from './pages/Patients'
import AddPatient from './pages/AddPatient'
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Content area fills remaining space */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={user ? <Patients /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddPatient />} />
        </Routes>
      </div>
    </div>
  )
}
