import "./Footer.css";

// import logo from "../../assets/images/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Company */}

          <div className="footer-column">

            <div className="footer-logo">

              {/* <img src={logo} alt="logo" /> */}

              <div>

                <h2>VALLUVAN</h2>

                <span>MATRIMONY</span>

              </div>

            </div>

            <p>
              Tamil Nadu's trusted matrimonial service helping
              thousands of families find their perfect life partner.
            </p>

            <div className="social-icons">

              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul>

              <li><a href="/">Home</a></li>
              <li><a href="/">Search</a></li>
              <li><a href="/">Membership</a></li>
              <li><a href="/">Success Stories</a></li>
              <li><a href="/">Contact</a></li>

            </ul>

          </div>

          {/* Services */}

          <div className="footer-column">

            <h3>Services</h3>

            <ul>

              <li>Verified Profiles</li>
              <li>Premium Membership</li>
              <li>Privacy Protection</li>
              <li>Horoscope Match</li>
              <li>Customer Support</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Contact</h3>

            <p>

              <FaPhoneAlt />

              +91 98765 43210

            </p>

            <p>

              <FaEnvelope />

              support@valluvanmatrimony.com

            </p>

            <p>

              <FaMapMarkerAlt />

              Chennai, Tamil Nadu

            </p>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 Valluvan Matrimony. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}