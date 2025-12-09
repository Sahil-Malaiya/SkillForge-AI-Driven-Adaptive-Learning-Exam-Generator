import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import InstructorDashboard from "./pages/InstructorDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManageCourses from "./pages/ManageCourses.jsx";
import UploadCourse from "./pages/UploadCourse.jsx";

function App() {

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const ProtectedRoute = ({ allowedRoles, children }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(role)) {
      if (role === "STUDENT") return <Navigate to="/student/dashboard" replace />;
      if (role === "INSTRUCTOR") return <Navigate to="/instructor/dashboard" replace />;
      if (role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>

        {/* Redirect based on role */}
        <Route path="/" element={
          isLoggedIn ? (
            role === "STUDENT" ? <Navigate to="/student/dashboard" replace /> :
            role === "INSTRUCTOR" ? <Navigate to="/instructor/dashboard" replace /> :
            role === "ADMIN" ? <Navigate to="/admin/dashboard" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />

        {/* Instructor */}
        <Route path="/instructor/dashboard" element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        } />

        <Route path="/instructor/upload-course" element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <UploadCourse />
          </ProtectedRoute>
        } />

        <Route path="/instructor/courses" element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <ManageCourses />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
