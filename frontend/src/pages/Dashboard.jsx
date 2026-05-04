import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  useEffect(() => {
    API.get("/api/projects").then(res => setProjects(res.data));
    API.get("/api/tasks/my-tasks").then(res => setTasks(res.data));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const count = (status) =>
    tasks.filter(t => t.status === status).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex gap-3 items-center">
          <span className="text-sm">{email}</span>

          {role === "ADMIN" && (
            <button
              onClick={() => window.location.href="/admin"}
              className="bg-yellow-500 px-3 py-1 rounded text-white"
            >
              Admin
            </button>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-xl font-bold">{count("PENDING")}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">In Progress</h3>
          <p className="text-xl font-bold">{count("IN_PROGRESS")}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-xl font-bold">{count("COMPLETED")}</p>
        </div>
      </div>

      {/* Projects */}
      <h2 className="text-xl mb-2 font-semibold">Projects</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {projects.map(p => (
          <div key={p.id} className="p-4 bg-white rounded shadow hover:scale-105 transition">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <h2 className="text-xl mb-2 font-semibold">My Tasks</h2>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map(t => (
          <div key={t.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{t.title}</h3>
            <p className="text-sm">Status: 
              <span className="ml-2 font-semibold text-blue-500">
                {t.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}