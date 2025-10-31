import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/contact"); // backend route
        const contacts = res.data?.contacts || []; // ✅ fallback to empty array
        setQueries(contacts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch queries:", error);
        setQueries([]); // fallback
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading queries...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Contact Queries</h1>

      {queries.length === 0 ? (
        <p className="text-center text-gray-500">No queries found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div key={query._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-2">{query.name}</h2>
              <p><strong>Email:</strong> {query.email}</p>
              <p><strong>Phone:</strong> {query.phone || "N/A"}</p>
              <p className="mt-2"><strong>Message:</strong> {query.message}</p>
              <p className="text-sm text-gray-400 mt-2">
                Submitted: {new Date(query.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactQueries;
