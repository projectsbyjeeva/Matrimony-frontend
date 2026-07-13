import { useState } from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export default function Navbar({
  onLoginClick,
  onRegisterClick,
}: NavbarProps) {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">

      <div className="container navbar-container">

        {/* Logo */}

        <div className="logo">
          <div className="logo-text">
            <h2>VALLUVAN</h2>
            <span>MATRIMONY</span>
          </div>
        </div>

        {/* Desktop Menu */}

        <nav className="nav-menu">

          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>

          <NavLink to="/membership" className="nav-link">
            Membership
          </NavLink>

          <NavLink to="/stories" className="nav-link">
            Success Stories
          </NavLink>

          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>

        </nav>

        {/* Right */}

        <div className="nav-right">

          <button
            className="login-btn"
            onClick={onLoginClick}
          >
            <FaUserCircle />
            Login
          </button>

          <button
            className="register-btn"
            onClick={onRegisterClick}
          >
            Register Free
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation */}

      <div className={`mobile-nav ${menuOpen ? "show" : ""}`}>

        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/search" onClick={closeMenu}>
          Search
        </NavLink>

        <NavLink to="/membership" onClick={closeMenu}>
          Membership
        </NavLink>

        <NavLink to="/stories" onClick={closeMenu}>
          Success Stories
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        <button
          className="mobile-login"
          onClick={()=>{
            closeMenu();
            onLoginClick();
          }}
        >
          Login
        </button>

        <button
          className="mobile-register"
          onClick={()=>{
            closeMenu();
            onRegisterClick();
          }}
        >
          Register Free
        </button>

      </div>

    </header>
  );
}