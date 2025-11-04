import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const Industries = ({ refresh }) => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Fetch all industries
  const fetchIndustry = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/industries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIndustries(res.data.industry || []);
    } catch (err) {
      console.error("Error fetching industries:", err);
      Swal.fire("Error", "Failed to load industries", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustry();
  }, [refresh]);

  // Delete industry (Hybrid approach)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the industry",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      // ✅ Instantly update UI (feels fast)
      setIndustries((prev) => prev.filter((item) => item._id !== id));

      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/industries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire("Deleted!", "Industry deleted successfully", "success");
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", err.response?.data?.msg || "Failed to delete Industry", "error");

      // 🔁 Optional safety re-fetch (if backend deletion failed)
      fetchIndustry();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          All Industries
        </h1>
        <button
          onClick={() => navigate("/admin/createindustry")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <FaPlus className="text-sm" />
          <span>Add Industry</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500 mt-20">Loading industries...</p>
      )}

      {/* Empty state */}
      {!loading && industries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No industries"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-gray-600 mb-4">No industries found.</p>
          <button
            onClick={() => navigate("/admin/createindustry")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Your First Industry
          </button>
        </div>
      )}

      {/* Industries Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {industries.map((industry) => (
          <div
            key={industry._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-200"
          >
            <img
              src={industry.imageUrl}
              alt={industry.name}
              className="w-full h-52 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {industry.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                  {industry.description || "No description provided"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(industry._id)}
                className="mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
              >
                <FaTrashAlt className="text-sm" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;
