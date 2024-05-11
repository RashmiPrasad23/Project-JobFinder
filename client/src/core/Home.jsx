import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../module/Home/HeroSection/HeroSection";
import FeatureSection from "../module/Home/FeatureSection/FeatureSection";
import ContactUsSection from "../module/Home/ContactUs/ContactUsSection";
import FooterSection from "../components/Footer/Footer";
const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeatureSection />
      <ContactUsSection />
      <FooterSection />
    </div>
  );
};

export default Home;
