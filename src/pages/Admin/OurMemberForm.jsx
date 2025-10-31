import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const OurMemberForm = ({ onMemberAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Get token for admin-protected route
  const token = localStorage.getItem("adminToken");

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      Swal.fire("Error", "Name and Image are required", "error");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("image", formData.image);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://pixelmainwebbackend.onrender.com/api/ourmember",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      Swal.fire("Success", res.data.msg || "Member created successfully", "success");

      // refresh list in parent
      onMemberAdded && onMemberAdded(res.data.member);

      // Reset form
      setFormData({ name: "", role: "", image: null });
      e.target.reset();
    } catch (error) {
      console.error("Error creating member:", error);
      Swal.fire(
        "Error",
        error.response?.data?.msg || error.message || "Failed to create member",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Member</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none"
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        {loading ? "Uploading..." : "Add Member"}
      </button>
    </form>
  );
};

export default OurMemberForm;
