import "./Features.css";

import {
  FaUserCheck,
  FaSearch,
  FaLock,
  FaComments,
  FaHandshake,
  FaHeart,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserCheck />,
    title: "Verified Profiles",
    desc: "Every profile is manually verified for authenticity and trust.",
  },
  {
    icon: <FaSearch />,
    title: "Smart Match",
    desc: "Advanced search filters help you find your perfect partner.",
  },
  {
    icon: <FaLock />,
    title: "Privacy Control",
    desc: "Your personal information remains safe and secure.",
  },
  {
    icon: <FaComments />,
    title: "Easy Communication",
    desc: "Express interest and communicate with confidence.",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Service",
    desc: "Helping Tamil families build relationships for years.",
  },
  {
    icon: <FaHeart />,
    title: "Happy Marriages",
    desc: "Thousands of successful marriages through our platform.",
  },
];

export default function Features() {
  return (
    <section className="features section">

      <div className="container">

        <div className="section-title">

          <h2>Why Choose Valluvan Matrimony?</h2>

          <p>
            Trusted by thousands of Tamil families to find their perfect life partner.
          </p>

        </div>

        <div className="features-grid">

          {features.map((item, index) => (

            <div className="feature-box" key={index}>

              <div className="feature-icon">

                {item.icon}

              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}