import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const ManageCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses/instructor`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setCourses(data);
    } catch {
      showMessage("Error loading courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    setSelectedCourse(null);
    fetchCourses();
  };

  const openCourse = (course) => {
    setSelectedCourse(course);
    setSelectedSubject(null);
    setSelectedTopic(null);
    fetchSubjects(course.id);
  };

  const fetchSubjects = async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/api/subjects/by-course/${courseId}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    setSubjects(data);
  };

  const createSubject = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    await fetch(`${API_BASE_URL}/api/subjects`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        courseId: selectedCourse.id,
        name: e.target.name.value,
      }),
    });
    e.target.reset();
    fetchSubjects(selectedCourse.id);
  };

  const deleteSubjectById = async (id) => {
    await fetch(`${API_BASE_URL}/api/subjects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchSubjects(selectedCourse.id);
  };

  const selectSubject = (sub) => {
    setSelectedSubject(sub);
    fetchTopics(sub.id);
  };

  const fetchTopics = async (subjectId) => {
    const res = await fetch(`${API_BASE_URL}/api/topics/by-subject/${subjectId}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    setTopics(data);
  };

  const createTopic = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    await fetch(`${API_BASE_URL}/api/topics`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        subjectId: selectedSubject.id,
        name: e.target.name.value,
      }),
    });
    e.target.reset();
    fetchTopics(selectedSubject.id);
  };

  const deleteTopicById = async (id) => {
    await fetch(`${API_BASE_URL}/api/topics/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchTopics(selectedSubject.id);
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    fetchMaterials(topic.id);
  };

  const fetchMaterials = async (topicId) => {
    const res = await fetch(`${API_BASE_URL}/api/materials/by-topic/${topicId}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    setMaterials(data);
  };

  const createMaterial = async (e) => {
    e.preventDefault();
    if (!selectedTopic) return;
    const formData = new FormData(e.target);
    await fetch(`${API_BASE_URL}/api/materials`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        topicId: selectedTopic.id,
        type: formData.get("type"),
        url: formData.get("url"),
        difficulty: formData.get("difficulty"),
      }),
    });
    e.target.reset();
    fetchMaterials(selectedTopic.id);
  };

  const deleteMaterialById = async (id) => {
    await fetch(`${API_BASE_URL}/api/materials/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    fetchMaterials(selectedTopic.id);
  };

return (
  <div className="dashboard-container">

    {/* Sidebar */}
    <div className="sidebar">
      <h2>Instructor Panel</h2>
      <button
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          marginTop: "10px"
        }}
        onClick={() => navigate("/instructor/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>

    {/* Content area */}
    <div className="content" style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>Manage Courses</h2>

      <button
        style={{ marginBottom: "15px" }}
        onClick={() => navigate("/instructor/upload-course")}
      >
        + Create New Course
      </button>

      <h3>Your Courses</h3>
      {courses.length === 0 && <p>No courses yet. Create one above!</p>}

      {courses.map((course) => (
        <div key={course.id} style={{ marginBottom: "10px" }}>
          <strong>{course.title}</strong>
          <button style={{ marginLeft: "10px" }} onClick={() => openCourse(course)}>Manage</button>
          <button style={{ marginLeft: "6px", color: "red" }} onClick={() => deleteCourse(course.id)}>Delete</button>
        </div>
      ))}

      {/* If course selected */}
      {selectedCourse && (
        <>
          <hr style={{ margin: "20px 0" }} />
          <h3>Subjects for: {selectedCourse.title}</h3>

          {/* Subjects */}
          <form onSubmit={createSubject} style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
            <input name="name" placeholder="Subject Name" required />
            <button>Add</button>
          </form>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <div key={s.id} className="mini-box" onClick={() => selectSubject(s)}>
                {s.name}
                <button style={{ marginLeft: "10px", color: "red" }} onClick={() => deleteSubjectById(s.id)}>
                  x
                </button>
              </div>
            ))}
          </div>

          {/* Topics */}
          {selectedSubject && (
            <>
              <hr style={{ margin: "20px 0" }} />
              <h3>Topics ({selectedSubject.name})</h3>

              <form onSubmit={createTopic} style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                <input name="name" placeholder="Topic Name" required />
                <button>Add</button>
              </form>

              {topics.map((t) => (
                <div key={t.id} className="mini-box" onClick={() => selectTopic(t)}>
                  {t.name}
                  <button style={{ marginLeft: "10px", color: "red" }} onClick={() => deleteTopicById(t.id)}>
                    x
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Materials */}
          {selectedTopic && (
            <>
              <hr style={{ margin: "20px 0" }} />
              <h3>Materials ({selectedTopic.name})</h3>

              <form onSubmit={createMaterial} style={{ display: "flex", flexDirection: "column", gap: "6px", maxWidth: "400px" }}>
                <select name="type">
                  <option value="VIDEO">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="LINK">Link</option>
                </select>

                <input name="url" placeholder="Material URL" required />

                <select name="difficulty">
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>

                <button>Add Material</button>
              </form>

              {materials.map((m) => (
                <div key={m.id} style={{ marginTop: "6px" }}>
                  {m.type} - {m.difficulty}
                  <a href={m.url} target="_blank" rel="noreferrer" style={{ marginLeft: "6px" }}>
                    View
                  </a>
                  <button style={{ marginLeft: "10px", color: "red" }} onClick={() => deleteMaterialById(m.id)}>
                    x
                  </button>
                </div>
              ))}
            </>
          )}
        </>
      )}

    </div>
  </div>
);

};

export default ManageCourses;
