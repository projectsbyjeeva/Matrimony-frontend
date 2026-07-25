import "./FeaturedProfiles.css";
import { useEffect, useState } from "react";

 import bride1 from "../../assets/images/bride-1.png";
import groom1 from "../../assets/images/groom-1.png";
 import bride2 from "../../assets/images/bride-2.png";
import groom2 from "../../assets/images/groom-2.png";
import bride3 from "../../assets/images/bride-3.png";
// import groom3 from "../../assets/images/groom3.jpg";

import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaLock,
  FaTimes,
} from "react-icons/fa";

const profiles = [
  {
     image: bride1,
    name: "Priya",
    age: "24 Years",
    city: "Chennai",
    education: "B.E",
    job: "Software Engineer"
  },
  {
     image: groom1,
    name: "Arun",
    age: "28 Years",
    city: "Coimbatore",
    education: "MBA",
    job: "Business Owner"
  },
  {
    image: bride2,
    name: "Divya",
    age: "25 Years",
    city: "Madurai",
    education: "M.Tech",
    job: "IT Professional"
  },
  {
     image: groom2,
    name: "Karthik",
    age: "29 Years",
    city: "Salem",
    education: "B.Tech",
    job: "Civil Engineer"
  },
  {
     image: bride3,
    name: "Harini",
    age: "23 Years",
    city: "Erode",
    education: "B.Sc",
    job: "Teacher"
  },
  {
    image: groom1,
    name: "Vignesh",
    age: "30 Years",
    city: "Trichy",
    education: "MCA",
    job: "Project Manager"
  },
  {
    image: bride1,
    name: "Nithya",
    age: "26 Years",
    city: "Tirunelveli",
    education: "M.Com",
    job: "Banking Professional"
  },
  {
    image: groom2,
    name: "Surya",
    age: "27 Years",
    city: "Chennai",
    education: "B.E",
    job: "Product Designer"
  },
  {
    image: bride3,
    name: "Keerthana",
    age: "24 Years",
    city: "Coimbatore",
    education: "B.Arch",
    job: "Architect"
  },
  {
    image: groom1,
    name: "Pradeep",
    age: "31 Years",
    city: "Madurai",
    education: "M.Tech",
    job: "Senior Engineer"
  }
];

type FeaturedProfilesProps = {
  onRegisterClick: () => void;
};

export default function FeaturedProfiles({ onRegisterClick }: FeaturedProfilesProps) {
  const [showRegisterNotice, setShowRegisterNotice] = useState(false);
  const [previewProfile, setPreviewProfile] = useState<(typeof profiles)[number] | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(45);

  useEffect(() => {
    if (!previewProfile) return;

    if (secondsLeft <= 0) {
      setPreviewProfile(null);
      setShowRegisterNotice(true);
      return;
    }

    const timer = window.setTimeout(
      () => setSecondsLeft((seconds) => seconds - 1),
      1000
    );

    return () => window.clearTimeout(timer);
  }, [previewProfile, secondsLeft]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowRegisterNotice(false);
        setPreviewProfile(null);
      }
    };

    if (showRegisterNotice || previewProfile) {
      document.addEventListener("keydown", closeOnEscape);
    }
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showRegisterNotice, previewProfile]);

  return (
    <>
      <section className="profiles section">

      <div className="container">

        <div className="section-title">
          <h2>Featured Profiles</h2>
          <p>Meet some of our recently registered verified members.</p>
        </div>

        <div className="profiles-grid">

          {profiles.map((profile, index) => (

            <div className="profile-card" key={index}>

              <div className="profile-image">

                <img src={profile.image} alt={profile.name} />

                <button className="like-btn">
                  <FaHeart />
                </button>

              </div>

              <div className="profile-content">

                <h3>
                  {profile.name}
                  <span>{profile.age}</span>
                </h3>

                <p>
                  <FaMapMarkerAlt />
                  {profile.city}
                </p>

                <p>
                  <FaGraduationCap />
                  {profile.education}
                </p>

                <p>
                  <FaBriefcase />
                  {profile.job}
                </p>

                <button
                  type="button"
                  className="view-btn"
                  onClick={() => {
                    setSecondsLeft(45);
                    setPreviewProfile(profile);
                  }}
                >
                  View Profile
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      </section>

      {previewProfile && (
        <div className="featured-preview-backdrop">
          <article
            className="featured-profile-preview"
            role="dialog"
            aria-modal="true"
            aria-labelledby="featured-preview-title"
          >
            <button
              type="button"
              className="featured-preview-close"
              aria-label="Close profile preview"
              onClick={() => setPreviewProfile(null)}
            >
              <FaTimes aria-hidden="true" />
            </button>

            <div className="featured-preview-image">
              <img src={previewProfile.image} alt={previewProfile.name} />
              <span className="preview-timer">Preview ends in {secondsLeft}s</span>
            </div>

            <div className="featured-preview-content">
              <span className="preview-verified">Verified Profile</span>
              <h2 id="featured-preview-title">{previewProfile.name}</h2>
              <p className="preview-age">{previewProfile.age}</p>

              <dl className="featured-preview-details">
                <div><dt>Location</dt><dd>{previewProfile.city}</dd></div>
                <div><dt>Education</dt><dd>{previewProfile.education}</dd></div>
                <div><dt>Occupation</dt><dd>{previewProfile.job}</dd></div>
                <div><dt>Profile Type</dt><dd>Verified Member</dd></div>
              </dl>

              <p className="preview-message">
                Register free to continue viewing full biodata and protected contact details.
              </p>
            </div>
          </article>
        </div>
      )}

      {showRegisterNotice && (
        <div
          className="register-notice-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowRegisterNotice(false);
          }}
        >
          <div
            className="register-notice"
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-notice-title"
          >
            <button
              type="button"
              className="register-notice-close"
              aria-label="Close"
              onClick={() => setShowRegisterNotice(false)}
            >
              <FaTimes aria-hidden="true" />
            </button>

            <span className="register-notice-icon">
              <FaLock aria-hidden="true" />
            </span>
            <h2 id="register-notice-title">Register to View Profile</h2>
            <p>Please register first to view complete profile details and contact information.</p>

            <button
              type="button"
              className="register-notice-action"
              onClick={() => {
                setShowRegisterNotice(false);
                onRegisterClick();
              }}
            >
              Register Free
            </button>
          </div>
        </div>
      )}
    </>
  );
}
