export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Project Manager</h2>

      <ul className="space-y-4">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/tasks">Tasks</a></li>
      </ul>
    </div>
  );
}