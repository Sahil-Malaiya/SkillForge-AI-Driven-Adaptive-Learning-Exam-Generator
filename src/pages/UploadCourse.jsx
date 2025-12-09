import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export default function UploadCourse() {
  const navigate = useNavigate();

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: "",
    status: "PUBLISHED",
  });

  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(courseForm),
      });
      if (!res.ok) throw new Error();
      showMessage("Course Created Successfully!");
      setCourseForm({
        title: "",
        description: "",
        category: "",
        thumbnailUrl: "",
        status: "PUBLISHED",
      });
      navigate("/instructor/courses"); // auto redirect
    } catch {
      showMessage("Failed to create course");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create New Course</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <form
        onSubmit={handleCreateCourse}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <input
          name="title"
          placeholder="Course Title"
          value={courseForm.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={courseForm.description}
          onChange={handleChange}
        ></textarea>
        <input
          name="category"
          placeholder="Category"
          value={courseForm.category}
          onChange={handleChange}
        />
        <input
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={courseForm.thumbnailUrl}
          onChange={handleChange}
        />
        <select
          name="status"
          value={courseForm.status}
          onChange={handleChange}
        >
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        <button type="submit">Create Course</button>
      </form>

      <button
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/instructor/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
