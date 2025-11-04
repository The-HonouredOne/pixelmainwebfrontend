import { useEffect, useState } from "react";
import axios from "axios";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: "", description: "" });

  const token = localStorage.getItem("adminToken");

  const fetchServices = async () => {
    const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/services", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setServices(res.data);
  };

  const createService = async () => {
    if (!newService.title) return alert("Title required");
    await axios.post("https://pixelmainwebbackend.onrender.com/api/services", newService, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewService({ title: "", description: "" });
    fetchServices();
  };

  const deleteService = async (id) => {
    await axios.delete(`https://pixelmainwebbackend.onrender.com/api/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>

      {/* Create Form */}
      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Service Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button
          onClick={createService}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Services List */}
      {services.map((srv) => (
        <div
          key={srv._id}
          className="border p-4 rounded mb-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{srv.title}</h3>
            <p className="text-gray-600">{srv.description}</p>
          </div>
          <button
            onClick={() => deleteService(srv._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminServices;
