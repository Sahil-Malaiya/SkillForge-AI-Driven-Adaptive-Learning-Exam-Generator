import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function StudentDashboard() {
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
        <h2>Student Panel</h2>

        <Link to="/student/dashboard" className="active">Dashboard</Link>

        {/* My Enrolled Courses */}
        <Link to="/student/courses">My Courses</Link>

        <Link to="#">AI Quiz</Link>
        <Link to="#">Profile</Link>

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

      <div className="content">
        <h2>Welcome Student!</h2>

        <div className="cards">

          <div className="card">
            <h3>Continue Learning</h3>
            <p>Explore your enrolled courses and continue your journey.</p>
            <button onClick={() => navigate("/student/courses")}>
              View Courses
            </button>
          </div>

          <div className="card">
            <h3>AI Quiz</h3>
            <p>Take adaptive AI generated quizzes based on your progress.</p>
            <button disabled>Start Quiz</button>
          </div>

          <div className="card">
            <h3>Your Performance</h3>
            <p>Check your learning growth and analytics.</p>
            <button disabled>View Stats</button>
          </div>

        </div>
      </div>

    </div>
  );
}
