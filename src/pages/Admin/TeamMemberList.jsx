import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, User, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamMemberList = () => {
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");


  const token = localStorage.getItem('adminToken')

  // Fetch all members
  const fetchMembers = async () => {
    try {
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/team" , {
        headers:{Authorization: `Bearer ${token}` }
      });
      setMembers(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setMessage("Error fetching team members");
    }
  };

  // Delete a member
  const handleDelete = async (id) => {
    // console.log(id)
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/team/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (error) {
      console.error("❌ Delete error:", error);
      setMessage("Error deleting team member");
    }
  };



  const navigate=useNavigate()




  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
       <button  className="flex flex-row text-right items-end rounded cursor-pointer p-1 justify-end bg-blue-500 mb-10 text-white text-xl"
        onClick={()=>navigate('/admin/addteammember')}
         >
          Add a Team Member
        </button>

      {message && (
        <p className="text-center text-red-600 font-medium mb-4">{message}</p>
      )}

      {members.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No team members found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Profile Image */}
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-56 bg-gray-100 text-gray-400">
                  <User size={48} />
                </div>
              )}

              {/* Info */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <Briefcase size={16} /> {member.role || "No role specified"}
                  </p>
                </div>

                {/* Action */}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="flex items-center gap-2 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberList;
