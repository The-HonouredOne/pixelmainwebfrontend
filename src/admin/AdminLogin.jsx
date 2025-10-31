// src/pages/AdminLogin.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://pixelmainwebbackend.onrender.com/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg mt-10 bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
