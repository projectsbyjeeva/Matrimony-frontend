import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export default function Navbar({
  onLoginClick,
  onRegisterClick,
}: NavbarProps) {
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

        {/* Navigation */}

        <nav className="nav-menu">

          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>

          <button className="nav-link">
            Membership
          </button>

          <button className="nav-link">
            Success Stories
          </button>

          <button className="nav-link">
            Contact
          </button>

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

          <button className="mobile-menu">
            <HiOutlineMenuAlt3 />
          </button>

        </div>

      </div>
    </header>
  );
}