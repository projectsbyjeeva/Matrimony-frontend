import "./Hero.css";

import {
  FaShieldAlt,
  FaHeart,
  FaUserCheck,
} from "react-icons/fa";

import hero from "../../assets/images/cpi-2.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <span className="hero-badge">
            ❤️ Trusted Tamil Matrimony
          </span>

          <h1>
            Find Your
            <br />
            Perfect
            <span> Life Partner</span>
          </h1>

          <p>
            Discover verified bride and groom profiles from trusted families.
            Safe, secure and designed to help you find your perfect life partner.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Register Free
            </button>

            <button className="secondary-btn">
              Browse Profiles
            </button>
          </div>

          <div className="hero-features">

            <div className="feature-card">
              <FaShieldAlt />
              <span>Verified Profiles</span>
            </div>

            <div className="feature-card">
              <FaHeart />
              <span>Trusted Families</span>
            </div>

            <div className="feature-card">
              <FaUserCheck />
              <span>Privacy Protected</span>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image-wrapper">

          <div className="circle circle-one"></div>

          <div className="circle circle-two"></div>

          <div className="hero-image-blend">
            <img
              src={hero}
              alt="Bride and Groom"
              className="hero-img"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
