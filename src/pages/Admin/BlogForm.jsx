import React, { useState } from "react";
import axios from "axios";

const BlogForm = ({ onBlogCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // to show success/error messages

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const token = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // simple validation
    if (!formData.name || !formData.title || !formData.description|| !formData.category) {
      setMessage("Please fill all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      setLoading(true);
      const res = await axios.post("https://pixelmainwebbackend.onrender.com/api/blog", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Blog created:", res.data);
      setMessage("Blog created successfully!");
      setFormData({ name: "", title: "", description: "", image: null });
      onBlogCreated && onBlogCreated(res.data.blog);
    } catch (err) {
      console.error("❌ Error creating blog:", err.response || err);
      setMessage(err.response?.data?.msg || "Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-md space-y-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Add New Blog</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Author Name"
        className="border p-2 w-full rounded-md"
      />

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className="border p-2 w-full rounded-md"
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Blog category"
        className="border p-2 w-full rounded-md"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded-md h-24"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="border p-2 w-full rounded-md"
      />

      <button
        type="submit"
        disabled={loading}
        className={`text-white px-4 py-2 rounded-md w-full ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Create Blog"}
      </button>

      {/* Display inline messages */}
      {message && (
        <p
          className={`text-sm mt-2 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default BlogForm;
