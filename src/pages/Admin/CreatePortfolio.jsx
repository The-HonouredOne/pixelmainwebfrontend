// src/pages/AdminCreatePortfolio.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = () => {
  const [form, setForm] = useState({
    title: "",
    // subtitle: "",
    description: "",
    technologies: "",
    howBuilt: "",
    why: "",
    // projectUrl: "",
    // category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((p) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      Swal.fire("Error", "Please provide a title", "error");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    // data.append("subtitle", form.subtitle);
    data.append("description", form.description);
    data.append("technologies", form.technologies);
    data.append("howBuilt", form.howBuilt);
    data.append("why", form.why);
    // data.append("projectUrl", form.projectUrl);
    // data.append("category", form.category);
    if (form.image) data.append("image", form.image);

    try {
      setLoading(true);
      await axios.post("https://pixelmainwebbackend.onrender.com/api/portfolios", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success", "Portfolio created", "success");
      navigate("/admin/portfoliolist"); // adjust route
    } catch (err) {
      console.error("create portfolio err", err.response || err.message);
      Swal.fire("Error", err.response?.data?.msg || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Add Portfolio Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        {/* <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle / short description" className="w-full border p-2 rounded" /> */}

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Full description" className="w-full border p-2 rounded" rows={4} />

        <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="Technologies (comma separated)" className="w-full border p-2 rounded" />

        <textarea name="howBuilt" value={form.howBuilt} onChange={handleChange} placeholder="How we built it" className="w-full border p-2 rounded" rows={3} />
        <textarea name="why" value={form.why} onChange={handleChange} placeholder="Why this is better for you" className="w-full border p-2 rounded" rows={3} />

        {/* <input name="projectUrl" value={form.projectUrl} onChange={handleChange} placeholder="Project URL (optional)" className="w-full border p-2 rounded" /> */}
        {/* <input name="category" value={form.category} onChange={handleChange} placeholder="Category (optional)" className="w-full border p-2 rounded" /> */}

        <div>
          <label className="block text-sm mb-1">Image</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" className="border-1 rounded bg-gray-300" />
        </div>

        <button disabled={loading} className={`bg-green-600 text-white px-4 py-2 rounded ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"}`}>
          {loading ? "Creating..." : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
