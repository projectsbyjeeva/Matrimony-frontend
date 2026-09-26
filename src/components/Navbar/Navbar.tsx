import { useState } from "react";
import "./Navbar.css";

import { FaGlobe, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logoImage from "../../assets/images/vallu-2.png";
import { Language, useLanguage } from "../../context/LanguageContext";
import { useDemoAuth } from "../../context/DemoAuthContext";
import Notifications from "./Notifications";

type NavbarProps = {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
};

export default function Navbar({
  onLoginClick,
  onRegisterClick,
}: NavbarProps) {
  const { user, notifications, respond, logout, openLogin, openRegister } = useDemoAuth();
  const loginClick = onLoginClick || openLogin;
  const registerClick = onRegisterClick || openRegister;
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
    setLanguageOpen(false);
  };

  const chooseLanguage = (selected: Language) => {
    setLanguage(selected);
    setLanguageOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();

    // If already on landing page, directly scroll
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // If currently on another page, go home first
    navigate(`/#${sectionId}`);
  };

  return (
    <header className={`navbar${user ? " navbar-signed-in" : ""}`}>
      <div className="container navbar-container">

        {/* Logo */}
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <div className="logo-image-wrapper">
            <img
              src={logoImage}
              alt="Valluvan Matrimony Logo"
              className="logo-image"
            />
          </div>

          <div className="logo-text">
            <h2>VALLUVAN</h2>
            <span>MATRIMONY</span>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="nav-menu">

          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>

          {/* Success Stories - Same Page Scroll */}
          <button
            type="button"
            className="nav-link nav-scroll-btn"
            onClick={() => scrollToSection("success-stories")}
          >
            Success Stories
          </button>

          {/* Contact - Scroll to Footer */}
          <button
            type="button"
            className="nav-link nav-scroll-btn"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>

        </nav>

        {/* Right */}
        <div className="nav-right">

          <div className="language-picker" data-no-translate="true">
            <button
              type="button"
              className="language-button"
              aria-label="Choose language"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <FaGlobe />
              <span>{language === "ta" ? "தமிழ்" : "English"}</span>
            </button>

            {languageOpen && (
              <div className="language-menu">
                <button
                  type="button"
                  className={language === "en" ? "active" : ""}
                  onClick={() => chooseLanguage("en")}
                >
                  English
                </button>
                <button
                  type="button"
                  className={language === "ta" ? "active" : ""}
                  onClick={() => chooseLanguage("ta")}
                >
                  தமிழ்
                </button>
              </div>
            )}
          </div>

          {user ? <>
            <Notifications key={user.id} notifications={notifications} onRespond={respond} />
            <button type="button" data-no-translate="true" className="demo-account-button" onClick={openLogin}>Demo: {user.name}</button>
            <button type="button" className="login-btn" onClick={logout}>Log out</button>
          </> : <><button
            className="login-btn"
            onClick={loginClick}
          >
            <FaUserCircle />
            Login
          </button>

          <button
            className="register-btn"
            onClick={registerClick}
          >
            Register Free
          </button>
          </>}

          <button
            type="button"
            className="mobile-menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "show" : ""}`}>

        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/search" onClick={closeMenu}>
          Search
        </NavLink>

        <button
          type="button"
          className="mobile-scroll-link"
          onClick={() => scrollToSection("success-stories")}
        >
          Success Stories
        </button>

        <button
          type="button"
          className="mobile-scroll-link"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>

        {user ? <>
          <button type="button" data-no-translate="true" className="mobile-login" onClick={() => { closeMenu(); openLogin(); }}>Switch demo account ({user.name})</button>
          <button type="button" className="mobile-register" onClick={() => { closeMenu(); logout(); }}>Log out</button>
        </> : <><button
          className="mobile-login"
          onClick={() => {
            closeMenu();
            loginClick();
          }}
        >
          Login
        </button>

        <button
          className="mobile-register"
          onClick={() => {
            closeMenu();
            registerClick();
          }}
        >
          Register Free
        </button>
        </>}

      </div>
    </header>
  );
}
