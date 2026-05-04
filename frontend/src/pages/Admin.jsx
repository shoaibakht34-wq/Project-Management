import { useState } from "react";
import API from "../api/axios";

export default function Admin() {

  const [project, setProject] = useState({ name: "", description: "" });
  const [task, setTask] = useState({
    title: "",
    description: "",
    projectId: "",
  });

  const createProject = async () => {
    try {
      await API.post("/api/projects", project);
      alert("Project created ✅");
    } catch {
      alert("Error creating project ❌");
    }
  };

  const createTask = async () => {
    try {
      await API.post("/api/tasks", task);
      alert("Task created ✅");
    } catch {
      alert("Error creating task ❌");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="grid grid-cols-2 gap-6">

        {/* Project */}
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-bold mb-4">Create Project</h2>

          <input
            placeholder="Name"
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setProject({ ...project, name: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />

          <button
            onClick={createProject}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>

        {/* Task */}
        <div className="p-6 bg-white rounded shadow">
          <h2 className="font-bold mb-4">Create Task</h2>

          <input
            placeholder="Title"
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setTask({ ...task, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />

          <input
            placeholder="Project ID"
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setTask({ ...task, projectId: e.target.value })
            }
          />

          <button
            onClick={createTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}