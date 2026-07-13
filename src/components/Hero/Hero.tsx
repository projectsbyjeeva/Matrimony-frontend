import "./Hero.css";
import {
  FaShieldAlt,
  FaHeart,
  FaUserCheck,
} from "react-icons/fa";

// import hero from "../../assets/images/hero.png";

export default function Hero() {
  return (
    <section className="hero">

      <div className="container hero-container">

        {/* LEFT */}

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
            Safe, secure and designed to help you find your perfect life
            partner.
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

        {/* RIGHT */}

        <div className="hero-image-wrapper">

          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>

          <div className="hero-image">

            {/*
            <img
              src={hero}
              alt="Bride Groom"
            />
            */}

          </div>

          <div className="floating-card top-card">
            <h2>25K+</h2>
            <p>Happy Couples</p>
          </div>

          <div className="floating-card bottom-card">
            <h2>100%</h2>
            <p>Verified Profiles</p>
          </div>

        </div>

      </div>

    </section>
  );
}