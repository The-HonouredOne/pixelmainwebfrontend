import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    package1Name: "",
    package1Price: "",
    package1Features: "",
    package2Name: "",
    package2Price: "",
    package2Features: "",
    package3Name: "",
    package3Price: "",
    package3Features: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build packages array from the three package inputs
    const packages = [
      {
        name: formData.package1Name,
        price: formData.package1Price,
        features: formData.package1Features
          ? formData.package1Features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
      },
      {
        name: formData.package2Name,
        price: formData.package2Price,
        features: formData.package2Features
          ? formData.package2Features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
      },
      {
        name: formData.package3Name,
        price: formData.package3Price,
        features: formData.package3Features
          ? formData.package3Features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
      },
    ]
      // remove empty packages (no name or no price)
      .filter((p) => p.name || p.price || (p.features && p.features.length > 0));

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    data.append("packages", JSON.stringify(packages));

    try {
      setLoading(true);
      await axios.post("https://pixelmainwebbackend.onrender.com/api/services", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success", "Service created successfully", "success");
      navigate("/admin/allservices");
    } catch (error) {
      console.error("Create service error:", error.response?.data || error.message);
      Swal.fire("Error", error.response?.data?.msg || "Failed to create service", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Service</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Service title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Service description"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Packages — keep same 3-column inputs but include features */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium mb-2">Packages</label>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Package 1 */}
              <div className="space-y-2">
                <input
                  type="text"
                  name="package1Name"
                  value={formData.package1Name}
                  onChange={handleChange}
                  placeholder="Basic Package Name"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="number"
                  name="package1Price"
                  value={formData.package1Price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  name="package1Features"
                  value={formData.package1Features}
                  onChange={handleChange}
                  placeholder="Features (comma separated)"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* Package 2 */}
              <div className="space-y-2">
                <input
                  type="text"
                  name="package2Name"
                  value={formData.package2Name}
                  onChange={handleChange}
                  placeholder="Standard Package Name"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="number"
                  name="package2Price"
                  value={formData.package2Price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  name="package2Features"
                  value={formData.package2Features}
                  onChange={handleChange}
                  placeholder="Features (comma separated)"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* Package 3 */}
              <div className="space-y-2">
                <input
                  type="text"
                  name="package3Name"
                  value={formData.package3Name}
                  onChange={handleChange}
                  placeholder="Premium Package Name"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="number"
                  name="package3Price"
                  value={formData.package3Price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  name="package3Features"
                  value={formData.package3Features}
                  onChange={handleChange}
                  placeholder="Features (comma separated)"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-md transition ${
              loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating..." : "Create Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
