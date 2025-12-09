import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Instructor Panel</h2>

        <Link to="/instructor/dashboard" className="active">Dashboard</Link>
        <Link to="/instructor/upload-course">Upload Course</Link>
        <Link to="/instructor/courses">Manage Courses</Link>

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="content">
        <h2>Welcome Instructor</h2>

        <div className="cards">

          <div className="card">
            <h3>Upload Course</h3>
            <p>Add new course content and topics.</p>
            <button onClick={() => navigate("/instructor/upload-course")}>
              Upload
            </button>
          </div>

          <div className="card">
            <h3>Manage Courses</h3>
            <p>View, edit, delete existing courses.</p>
            <button onClick={() => navigate("/instructor/courses")}>
              Manage
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
