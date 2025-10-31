import { 
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaStar, FaFacebook, FaGlobe 
} from "react-icons/fa";
import image from '../assets/logo.jpg';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10 font-sans">
      {/* ===== Logo Section ===== */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <img
            src={image}
            alt="PixelGenix Logo"
            className="h-12 w-12 object-contain rounded-full"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            PixelGenix
          </span>
          <span className="hidden sm:inline text-2xl text-white font-semibold">
            IT SOLUTIONS Pvt. Ltd.
          </span>
        </div>
        <span className="sm:hidden text-sm text-white font-semibold mt-1">
          IT SOLUTIONS Pvt. Ltd.
        </span>
      </div>

      {/* ===== Main Content ===== */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-10">
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 border-b border-indigo-600 inline-block pb-1 font-mono">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["/", "/services", "/portfolio", "/contact"].map((path, idx) => {
              const names = ["Home", "Services", "Portfolio", "Contact"];
              return (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-indigo-400 transition"
                  onClick={() => handleNavigate(path)}
                >
                  {names[idx]}
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 border-b border-indigo-600 inline-block pb-1 font-serif">
            Solutions
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              "Mobile App Development",
              "iOS App Development",
              "Android App Development",
              "Hybrid App Development",
              "Software Consulting",
              "Web Development",
              "UI/UX Development",
              "Data Analytics Services",
              "Ecommerce App Development",
            ].map((service, index) => (
              <li key={index} className="hover:text-indigo-400 cursor-pointer">
                {service}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 border-b border-indigo-600 inline-block pb-1">
            Technologies
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>React JS</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>PHP & MySQL</li>
            <li>Laravel</li>
            <li>AI / ML</li>
            <li>Digital Marketing</li>
            <li>Cloud & DevOps</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 border-b border-indigo-600 inline-block pb-1 font-sans">
            Contact Us
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <p>
              <ion-icon name="location-outline" class="text-blue-500 text-lg"></ion-icon>{" "}
              P.no 148, Laxman Colony, New Sanganer Road, Sodala, Jaipur - 302019
            </p>
            <p>
              <ion-icon name="call-outline" class="text-blue-500 text-lg"></ion-icon>{" "}
              <a href="tel:+919079001762" className="hover:text-green-400">
                +91 9079001762
              </a>
            </p>
            <p>
              <ion-icon name="call-outline" class="text-blue-500 text-lg"></ion-icon>{" "}
              <a href="tel:+918306615443" className="hover:text-green-400">
                +91 8306615443
              </a>
            </p>
            <p>
              <ion-icon name="mail-outline" class="text-blue-500 text-lg"></ion-icon>{" "}
              <a
                href="mailto:pixelgenixitsolutions@gmail.com"
                className="hover:text-yellow-300"
              >
                pixelgenixitsolutions@gmail.com
              </a>
            </p>
            <p>
              <ion-icon name="mail-outline" class="text-blue-500 text-lg"></ion-icon>{" "}
              <a
                href="mailto:oneroofedu@gmail.com"
                className="hover:text-yellow-300"
              >
                oneroofedu@gmail.com
              </a>
            </p>
            <p>
              <FaGlobe className="inline text-blue-500 text-lg" />{" "}
              <a
                href="https://pixelgenixedutech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                PixelGenix Edutech
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== Social Media + Ratings ===== */}
      <div className="flex flex-col items-center gap-6 text-center mt-8">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 text-2xl sm:text-3xl">
          <a
            href="https://www.facebook.com/profile.php?id=61577101538076"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-blue-500 hover:text-blue-400 transition" />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 hover:text-blue-300 transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/pixelgenix-itsolutions-0b0607378"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-blue-500 hover:text-blue-400 transition" />
          </a>
          <a
            href="https://www.instagram.com/pixelgenixitsolutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-500 hover:text-pink-400 transition" />
          </a>
        </div>

        {/* Ratings */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Google", rating: 4.8 },
            { name: "Clutch", rating: 4.6 },
            { name: "GoodFirms", rating: 4.8 },
          ].map((platform, idx) => (
            <div
              key={idx}
              className="bg-gray-800 px-6 py-3 rounded-lg shadow-inner border border-indigo-500 w-[140px] sm:w-[160px]"
            >
              <p className="text-white font-semibold text-lg mb-1">
                {platform.name}
              </p>
              <div className="flex items-center justify-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(platform.rating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }
                  />
                ))}
                <span className="ml-1 text-white text-sm">
                  {platform.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs sm:text-sm text-gray-400 font-light tracking-wider bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-3 w-full text-center">
          &copy; {new Date().getFullYear()} PixelGenix IT Solutions Pvt. Ltd. — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
