import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import IndustriesSection from '../components/IndustriesSection';
import PortfolioSection from '../components/PortfolioSection';
import TechnologiesSection from '../components/TechnologiesSection';
import PopupModal from '../components/PopupModal';
import OurMembers from '../components/OurMembers';
import OurTeam  from '../pages/OurTeam'

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Clean, Compact Welcome Section */}


      {/* Main Sections */}
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <OurTeam />
      <TechnologiesSection />
      <IndustriesSection />
      <StatsSection />
      <OurMembers />
      <PopupModal />
    </div>
  );
};

export default Home;
