import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import Statistics from "../../components/Statistics/Statistics";
import Features from "../../components/Features/Features";
import FeaturedProfiles from "../../components/FeaturedProfiles/FeaturedProfiles";
import SuccessStories from "../../components/SuccessStories/SuccessStories";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

import { useDemoAuth } from "../../context/DemoAuthContext";

import "./LandingPage.css";

export default function LandingPage() {
  const { openRegister } = useDemoAuth();

  const location = useLocation();

  // Handles scrolling when coming from another page
  // Example: /search -> click Success Stories -> home -> scroll
  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = location.hash.replace("#", "");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, [location]);

  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar />

      <Statistics />

      <Features />

      <FeaturedProfiles onRegisterClick={openRegister} />

      {/* Success Stories Section */}
      <section
        id="success-stories"
        className="scroll-section"
      >
        <SuccessStories />
      </section>

      <CTA />

      {/* Contact/Footer Section */}
      <footer
        id="contact"
        className="scroll-section"
      >
        <Footer />
      </footer>

    </>
  );
}
