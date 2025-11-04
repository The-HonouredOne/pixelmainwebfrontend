import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";

const OurMemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Fetch members
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/ourmember", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(res.data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      Swal.fire("Error", "Failed to load members", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Delete member — instant UI update + backend check
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the member",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    // ⚡ Instantly remove from UI for faster feedback
    const previousMembers = [...members];
    setMembers((prev) => prev.filter((m) => m._id !== id));

    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/ourmember/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Deleted!", "Member deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error", "Failed to delete member", "error");

      // 🔁 Revert UI if deletion fails
      setMembers(previousMembers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          Our Team Members
        </h1>
        <button
          onClick={() => navigate("/admin/createourmember")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <FaPlus className="text-sm" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-gray-500 mt-20">Loading members...</p>
      )}

      {/* Empty state */}
      {!loading && members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No members"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-gray-600 mb-4">No team members found.</p>
          <button
            onClick={() => navigate("/admin/createourmember")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Your First Member
          </button>
        </div>
      )}

      {/* Members grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-200"
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-52 object-cover rounded-t-xl"
            />

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm">{member.role || "No role"}</p>
              </div>

              <button
                onClick={() => handleDelete(member._id)}
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

export default OurMemberList;
