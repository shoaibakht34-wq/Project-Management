import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => alert("Error"));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Projects</h2>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}