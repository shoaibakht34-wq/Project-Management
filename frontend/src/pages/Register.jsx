import { useState } from "react";
import API from "../api/axios";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER", // ✅ default role fixed
  });

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", form);

      alert("Registered successfully ✅");
      window.location.href = "/";

    } catch (err) {
      console.log(err.response?.data); // 🔥 debug
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center
    bg-gradient-to-r from-green-400 to-blue-500">

      <div className="w-full max-w-md p-8 rounded-2xl
      bg-white/20 backdrop-blur-xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          📝 Create Account
        </h2>

        <div className="space-y-4">

          {/* ✅ NAME */}
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* ✅ EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* ✅ PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ✅ ROLE FIXED (IMPORTANT) */}
          <select
            className="w-full p-3 rounded bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="MEMBER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* ✅ BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full p-3 bg-black text-white rounded
            hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>

        </div>

        {/* ✅ LOGIN LINK */}
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <a href="/" className="underline font-semibold">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}