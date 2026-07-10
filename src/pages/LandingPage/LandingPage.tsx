import { useState } from "react";

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
      <FeaturedProfiles />
      <SuccessStories />
      <CTA />
      <Footer />

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