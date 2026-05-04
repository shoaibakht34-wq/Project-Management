import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
  });

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", form);
      alert("Registered successfully ✅");
      window.location.href = "/";
    } catch {
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center
    bg-gradient-to-r from-green-400 to-blue-500">

      <div className="w-full max-w-md p-8 rounded-2xl
      bg-white/20 backdrop-blur-xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Email"
            className="w-full p-3 rounded bg-white/80"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/80"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full p-3 rounded bg-white/80"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            onClick={handleRegister}
            className="w-full p-3 bg-black text-white rounded"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}