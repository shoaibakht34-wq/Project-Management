import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // ✅ Always safely get values
    const storedRole = localStorage.getItem("role") || "";
    const storedEmail = localStorage.getItem("email") || "";

    setRole(storedRole);
    setEmail(storedEmail);

    // ✅ API calls
    API.get("/api/projects")
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));

    API.get("/api/tasks/my-tasks")
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const count = (status) =>
    tasks.filter(t => t.status === status).length;

  const statusColor = (status) => {
    if (status === "COMPLETED") return "bg-green-100 text-green-600";
    if (status === "IN_PROGRESS") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">

      {/* 🔹 Sidebar */}
      <div className="w-64 bg-gray-800 shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-indigo-400">PM Tool</h2>

        <ul className="space-y-4">
          <li className="font-semibold text-white">Dashboard</li>
          <li className="text-gray-400 hover:text-indigo-400 cursor-pointer">Projects</li>
          <li className="text-gray-400 hover:text-indigo-400 cursor-pointer">Tasks</li>
        </ul>
      </div>

      {/* 🔹 Main */}
      <div className="flex-1 p-6">

        {/* 🔹 Topbar */}
        <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-xl shadow">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex gap-4 items-center">

            {/* ✅ NEVER undefined */}
            <span className="text-sm text-gray-300">
              {email ? email : "Guest User"}
            </span>

            {/* ✅ Safe role check */}
            {role && role.toUpperCase() === "ADMIN" && (
              <button
                onClick={() => window.location.href = "/admin"}
                className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-white"
              >
                Admin
              </button>
            )}

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔹 Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Pending</h3>
            <p className="text-2xl font-bold text-red-500">
              {count("PENDING")}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">In Progress</h3>
            <p className="text-2xl font-bold text-yellow-500">
              {count("IN_PROGRESS")}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-gray-400">Completed</h3>
            <p className="text-2xl font-bold text-green-500">
              {count("COMPLETED")}
            </p>
          </div>
        </div>

        {/* 🔹 Projects */}
        <h2 className="text-xl font-semibold mb-3">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {projects.length === 0 ? (
            <p className="text-gray-400">No projects yet</p>
          ) : (
            projects.map(p => (
              <div
                key={p.id}
                className="p-5 bg-gray-800 rounded-xl shadow hover:-translate-y-1 transition"
              >
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-400 mt-2">
                  {p.description}
                </p>
              </div>
            ))
          )}
        </div>

        {/* 🔹 Tasks */}
        <h2 className="text-xl font-semibold mb-3">My Tasks</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks assigned</p>
          ) : (
            tasks.map(t => (
              <div
                key={t.id}
                className="p-5 bg-gray-800 rounded-xl shadow"
              >
                <h3 className="font-bold text-lg">{t.title}</h3>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm rounded ${statusColor(t.status)}`}
                >
                  {t.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}