import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/auth/register", {
      name, email, password, role,
    });
    alert("Registered! Please Login");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="INSTRUCTOR">Instructor</option>
        </select>

        <button type="submit">Create Account</button>
      </form>
      <p>Already registered? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;
