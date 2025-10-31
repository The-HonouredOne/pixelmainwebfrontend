import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '@fontsource/poppins';
import '@fontsource/poppins/600.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import PhoneAppButton from "./components/PhoneAppButton";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BlogSection from "./pages/BlogSection";
import BlogDetail from "./pages/BlogDetail";
import Company from "./pages/Company";
// import Client from "./components/Client";
import TestimonialsSection from "./components/TestimonialsSection";
import OurStory from "./pages/Ourstory";
import Whowe from "./pages/Whowe";
import Howwe from "./pages/Howwe";
import Meet from "./pages/Meet";
import Recog from "./pages/Recog";
import Business from "./pages/Business";

import AdminLogin from "./pages/Admin/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./admin/AdminServices";
// import CreateService from "./pages/Admin/ServiceBox";
import ServiceList from "./pages/Admin/DisplayService";
import TeamMemberList from "./pages/Admin/TeamMemberList";
import ContactQueries from "./pages/Admin/ContactQueries";
import AdminDashboard2 from "./pages/Admin/AdminDashboard2";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDashboard3 from "./pages/AdminDashboard";
import AddTeam from "./pages/Admin/AddTeam";
import BlogForm from "./pages/Admin/BlogForm";
import BlogList from "./pages/Admin/BlogList";
import Industries from "./pages/Admin/Industries";
import CreateIndustry from "./pages/Admin/CreateIndustry";
// import OurMember from ".";
import OurMemberForm from "./pages/Admin/OurMemberForm";
import OurMemberList from "./pages/Admin/OurMemberList";
import CreateServicebox from "./pages/Admin/ServiceBox";
import CreateService from "./pages/Admin/CreateService";
import AllServices from "./pages/Admin/AllServices";
import CreatePortfolio from "./pages/Admin/CreatePortfolio";
import Portfoliolist from "./pages/Admin/PortfolioList";
import AdminClientReviews from "./pages/Admin/AdminClientReviews";
import AddClientReview from "./pages/Admin/AddClientReview";
import Client from "./components/Client";
// import { createService } from "../../backend/controllers/serviceboxController";

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("adminToken"));

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   setIsAdmin(token);
  // }, []);

  // Protected Route wrapper
  const ProtectedRoute = ({ element }) => {
    return isAdmin ? element : <Navigate to="/" replace />;
  };

  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/client" element={<Client />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company/:section" element={<Company />} />
              <Route path="/testimonialsSection" element={<TestimonialsSection />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/who-we-serve" element={<Whowe />} />
              <Route path="/how-we-operate" element={<Howwe />} />
              <Route path="/meet-the-team" element={<Meet />} />
              <Route path="/business-modal" element={<Business />} />
              <Route path="/recognition" element={<Recog />} />

              {/* Admin Login (Public) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />}>

                <Route index element={<AdminDashboard3 />} />
                <Route path='dashboard' element={<AdminDashboard2 />} />

                <Route
                  path="teamlist"
                  element={<TeamMemberList />}
                />
                <Route
                  path="addteammember"
                  element={<AddTeam />}
                />


                <Route
                  path="createservicebox"
                  element={<CreateServicebox />}
                />

                <Route
                  path="allservicesbox"
                  element={<ServiceList />}
                />

                <Route
                  path="blogs"
                  element={<ProtectedRoute element={<BlogForm />} />}
                />
                <Route
                  path="bloglist"
                  element={<ProtectedRoute element={<BlogList />} />}
                />

                <Route
                  path="industries"
                  element={<ProtectedRoute element={<Industries />} />}
                />
                <Route
                  path="createindustry"
                  element={<ProtectedRoute element={<CreateIndustry />} />}
                />
                <Route
                  path="createourmember"
                  element={<ProtectedRoute element={<OurMemberForm />} />}
                />
                <Route
                  path="allourmember"
                  element={<ProtectedRoute element={<OurMemberList />} />}
                />

                <Route
                  path="createservice"
                  element={<ProtectedRoute element={<CreateService />} />}
                />
                <Route
                  path="allservices"
                  element={<ProtectedRoute element={<AllServices />} />}
                />
                <Route
                  path="createportfolio"
                  element={<ProtectedRoute element={<CreatePortfolio />} />}
                />
                <Route
                  path="portfoliolist"
                  element={<ProtectedRoute element={<Portfoliolist />} />}
                />
                <Route
                  path="clientreviews"
                  element={<ProtectedRoute element={<AdminClientReviews />} />}
                />
                <Route
                  path="addclientreview"
                  element={<ProtectedRoute element={<AddClientReview />} />}
                />
                <Route
                  path="contactqueries"
                  element={<ProtectedRoute element={<ContactQueries />} />}
                />

              </Route>

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

      {/* Floating Buttons */}
      <PhoneAppButton />
      <WhatsAppButton />
    </>
  );
}

export default App;
