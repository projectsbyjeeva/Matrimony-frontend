import { useEffect, useState } from "react";
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

import Login from "../Login/Login";
import Register from "../Register/Register";

import "./LandingPage.css";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      <Hero />

      <SearchBar />

      <Statistics />

      <Features />

      <FeaturedProfiles onRegisterClick={() => setShowRegister(true)} />

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

      <Login
        open={showLogin}
        onClose={() => setShowLogin(false)}
      />

      <Register
        open={showRegister}
        onClose={() => setShowRegister(false)}
      />
    </>
  );
}
