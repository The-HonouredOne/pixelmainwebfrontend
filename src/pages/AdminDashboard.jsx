import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/admin/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Not authorized:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Invalid credentials");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    };

    fetchProtectedData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {data ? (
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">👤 Admin Info</h2>
          <p><strong>Email:</strong> {data.admin.email}</p>
          <p><strong>ID:</strong> {data.admin._id}</p>
          <hr className="my-4" />
          <p className="text-green-600">{data.message}</p>
        </div>
      ) : (
        <p>Loading or not authorized...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
