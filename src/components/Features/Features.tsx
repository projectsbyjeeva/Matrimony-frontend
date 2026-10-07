import "./Features.css";

import {
  FaShieldAlt,
  FaLock,
  FaSearch,
  FaComments,
  FaCrown,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Verified Profiles",
    desc: "Every profile is manually verified for your safety.",
  },
  {
    icon: <FaLock />,
    title: "Privacy Protection",
    desc: "Your privacy is our top priority.",
  },
  {
    icon: <FaSearch />,
    title: "Advanced Search",
    desc: "Find matches with advanced filters.",
  },
  {
    icon: <FaComments />,
    title: "Easy Communication",
    desc: "Connect easily with interested matches.",
  },
  {
    icon: <FaCrown />,
    title: "Premium Membership",
    desc: "Get better visibility and priority.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    desc: "We are here to help you at every step.",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features-heading">
          <span>Why Choose</span>

          <h2>Valluvan Manamaalai?</h2>

          <div className="heading-design">
            <span></span>
            <i>♥</i>
            <span></span>
          </div>

          <p>
            We make your search for the perfect life partner simple, safe and successful
            <br />with trusted features that truly matter.
          </p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-box" key={index}>
              <div className="feature-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <div className="feature-divider"><span>♥</span></div>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
