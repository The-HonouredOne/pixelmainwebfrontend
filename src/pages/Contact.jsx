import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios"; // ✅ import axios

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setFormError("");
    setFieldErrors({});

    try {
      
      const res = await axios.post(
        "https://pixelmainwebbackend.onrender.com/api/contact", formData);

      if (res.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: res.data.message || "Contact form submitted successfully!",
        });
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
      if (data?.error) setFormError(data.error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 py-16 bg-gradient-to-br from-white to-indigo-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
          Get in <span className="text-indigo-600">Touch</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl px-6 md:px-10 py-10 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {fieldErrors.name && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+91 12345 67890"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
            {fieldErrors.message && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-block w-full md:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "📩 Sending..." : "📩 Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
