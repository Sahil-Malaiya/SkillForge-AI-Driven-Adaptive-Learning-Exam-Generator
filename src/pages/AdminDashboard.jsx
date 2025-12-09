import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>Admin Panel</h2>

        <Link to="/admin/dashboard" className="active">Dashboard</Link>

        {/* Manage Courses */}
        <Link to="/admin/manage-courses">Manage Courses</Link>

        {/* Manage Users */}
        <Link to="/admin/manage-users">Manage Users</Link>

        <Link to="/admin/reports">Reports</Link>

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Logout
        </button>
      </div>

      <div className="content">
        <h2>Welcome Admin 👑</h2>

        <div className="cards">

          <div className="card">
            <h3>Manage Users</h3>
            <p>Approve instructors and control user access.</p>
            <button onClick={() => navigate("/admin/manage-users")}>
              View Users
            </button>
          </div>

          <div className="card">
            <h3>Manage Courses</h3>
            <p>Control course uploads and quality checks.</p>
            <button onClick={() => navigate("/admin/manage-courses")}>
              View Courses
            </button>
          </div>

          <div className="card">
            <h3>Analytics</h3>
            <p>Track system statistics and reports.</p>
            <button onClick={() => navigate("/admin/reports")}>
              View Stats
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
