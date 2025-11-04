import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pxlogo from "../assets/logo.jpg";
import {
  FaUserTie,
  FaLaptopCode,
  FaBriefcase,
  FaNetworkWired,
  FaCommentAlt,
  FaUserFriends,
  FaNewspaper,
  FaProjectDiagram,
  FaMobileAlt,
  FaCode,
  FaGlobe,
  FaGamepad,
  FaBullhorn,
  FaRocket,
  FaRobot,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const services = [
  {
    title: "Mobile App Development",
    description: "User-friendly mobile apps tailored to your business needs.",
    icon: <FaMobileAlt className="text-indigo-600 text-lg" />,
  },
  {
    title: "Software Development",
    description: "Custom software designed for scalability and efficiency.",
    icon: <FaCode className="text-indigo-600 text-lg" />,
  },
  {
    title: "Web Development",
    description: "Responsive, high-performance websites for all industries.",
    icon: <FaGlobe className="text-indigo-600 text-lg" />,
  },
  {
    title: "Game Development",
    description: "Immersive gaming experiences with cutting-edge tech.",
    icon: <FaGamepad className="text-indigo-600 text-lg" />,
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to boost visibility and growth.",
    icon: <FaBullhorn className="text-indigo-600 text-lg" />,
  },
  {
    title: "On-Demand",
    description: "Scalable on-demand solutions for instant service delivery.",
    icon: <FaRocket className="text-indigo-600 text-lg" />,
  },
  {
    title: "AI Development",
    description: "AI-powered automation, insights, and smart solutions.",
    icon: <FaRobot className="text-indigo-600 text-lg" />,
  },
  {
    title: "eCommerce Development",
    description: "Seamless, scalable shopping platforms built for growth.",
    icon: <FaShoppingCart className="text-indigo-600 text-lg" />,
  },
];

const dropdownItems = [
  {
    title: "About Us",
    description: "Learn about our app and software development services.",
    path: "/company/about",
    icon: <FaUserTie className="text-indigo-600 text-lg" />,
  },
  {
    title: "Case Studies",
    description: "Explore our successful real-world solutions.",
    path: "/company/case-studies",
    icon: <FaLaptopCode className="text-indigo-600 text-lg" />,
  },
  {
    title: "Career",
    description: "Join our team & grow in a dynamic environment.",
    path: "/company/career",
    icon: <FaBriefcase className="text-indigo-600 text-lg" />,
  },
  {
    title: "Infrastructure",
    description: "Modern setup that ensures efficiency & security.",
    path: "/company/infrastructure",
    icon: <FaNetworkWired className="text-indigo-600 text-lg" />,
  },
  {
    title: "Testimonials",
    description: "See how we’ve helped our clients succeed.",
    path: "/company/testimonials",
    icon: <FaCommentAlt className="text-indigo-600 text-lg" />,
  },
  {
    title: "Referral Partner",
    description: "Refer clients, earn rewards, grow your network.",
    path: "/company/referral-partner",
    icon: <FaUserFriends className="text-indigo-600 text-lg" />,
  },
  {
    title: "News",
    description: "Stay updated on achievements & trends.",
    path: "/company/news",
    icon: <FaNewspaper className="text-indigo-600 text-lg" />,
  },
  {
    title: "Portfolio",
    description: "Creative and expert project showcases.",
    path: "/company/portfolio",
    icon: <FaProjectDiagram className="text-indigo-600 text-lg" />,
  },
];

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localdata = localStorage.getItem("adminToken");
    if (localdata) setDashboard(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-indigo-200 shadow-md transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={pxlogo}
            alt="PixelGenix Logo"
            className="h-12 w-12 object-cover rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              PixelGenix
            </h1>
            <p className="text-xs font-semibold text-black">IT SOLUTIONS Pvt Ltd</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Services */}
          <div
            className="relative"
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <button className="text-gray-700 hover:duration-1000 font-medium hover:text-indigo-600 flex items-center gap-1">
              Services <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {serviceOpen && (
              <div className="absolute left-0 mt-4 w-[800px] bg-white border border-gray-200 rounded-lg shadow-xl grid grid-cols-2 gap-4 p-6">
                <div className="space-y-2 border-r border-gray-200 pr-4">
                  {services.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => navigate("/services")}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 text-left"
                    >
                      {item.icon}
                      <div>
                        <h4 className="font-semibold text-indigo-700">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 text-gray-700 text-sm">
                  Explore our full range of custom software, mobile app, and digital development services tailored to your business growth.
                </div>
              </div>
            )}
          </div>

          {/* Company */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-gray-700 font-medium hover:text-indigo-600 flex items-center gap-1">
              Company <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-4 w-[640px] bg-white border border-gray-200 rounded-lg shadow-xl grid grid-cols-2 gap-4 p-5">
                {dropdownItems.map(({ title, description, path, icon }, i) => (
                  <Link
                    key={i}
                    to={path}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50"
                  >
                    {icon}
                    <div>
                      <h4 className="font-semibold text-indigo-700">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link to="/services" className="text-gray-700 hover:text-indigo-600 font-medium">All Services</Link>
          <Link to="/portfolio" className="text-gray-700 hover:text-indigo-600 font-medium">Portfolio</Link>
          <Link to="/client" className="text-gray-700 hover:text-indigo-600 font-medium">Client</Link>
          <Link to="/blog" className="text-gray-700 hover:text-indigo-600 font-medium">Blog</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/contact" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Contact</Link>

          {dashboard && (
            <Link to="/admin" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700">D</Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 py-4 px-6 space-y-3 animate-slideDown">
          <details>
            <summary className="cursor-pointer font-semibold text-gray-700 flex items-center justify-between">
              Services
            </summary>
            <div className="pl-3 mt-2 space-y-2">
              {services.map((s, i) => (
                <Link
                  key={i}
                  to="/services"
                  className="block text-sm text-gray-700 hover:text-indigo-600"
                  onClick={() => setMobileMenu(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </details>

          <details>
            <summary className="cursor-pointer font-semibold text-gray-700 flex items-center justify-between">
              Company
            </summary>
            <div className="pl-3 mt-2 space-y-2">
              {dropdownItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className="block text-sm text-gray-700 hover:text-indigo-600"
                  onClick={() => setMobileMenu(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </details>

          <Link to="/portfolio" className="block font-semibold text-gray-700 hover:text-indigo-600" onClick={() => setMobileMenu(false)}>Portfolio</Link>
          <Link to="/client" className="block font-semibold text-gray-700 hover:text-indigo-600" onClick={() => setMobileMenu(false)}>Client</Link>
          <Link to="/blog" className="block font-semibold text-gray-700 hover:text-indigo-600" onClick={() => setMobileMenu(false)}>Blog</Link>
          <Link to="/about" className="block font-semibold text-gray-700 hover:text-indigo-600" onClick={() => setMobileMenu(false)}>About</Link>
          <Link to="/contact" className="block text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:scale-[1.02] transition-transform" onClick={() => setMobileMenu(false)}>Get Quote</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
