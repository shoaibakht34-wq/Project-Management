import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await API.post("/api/auth/login", form);

    const token = res.data.token;

    // ✅ save token
    localStorage.setItem("token", token);

    // ✅ extract email from JWT manually (no library needed)
    const payload = JSON.parse(atob(token.split(".")[1]));

    const email = payload.sub; // JWT subject = email

    localStorage.setItem("email", email);

    // ✅ TEMP ROLE LOGIC (frontend only)
    if (email === "shoaibak0189@gmail.com") {
      localStorage.setItem("role", "ADMIN");
    } else {
      localStorage.setItem("role", "MEMBER");
    }

    window.location.href = "/dashboard";

  } catch (err) {
    console.log(err.response?.data);
    alert("Invalid email or password ❌");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="h-screen flex items-center justify-center
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="w-full max-w-md p-8 rounded-2xl
        bg-gray-800/20 backdrop-blur-xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/80 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full p-3 rounded-lg bg-black text-white
            hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <a href="/register" className="underline font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}