import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/api/tasks/my-tasks")
      .then((res) => setTasks(res.data))
      .catch(() => alert("Error"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-white shadow mb-2 rounded">
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}