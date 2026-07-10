import "./FeaturedProfiles.css";

// import bride1 from "../../assets/images/bride1.jpg";
// import groom1 from "../../assets/images/groom1.jpg";
// import bride2 from "../../assets/images/bride2.jpg";
// import groom2 from "../../assets/images/groom2.jpg";
// import bride3 from "../../assets/images/bride3.jpg";
// import groom3 from "../../assets/images/groom3.jpg";

import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart
} from "react-icons/fa";

const profiles = [
  {
    // image: bride1,
    name: "Priya",
    age: "24 Years",
    city: "Chennai",
    education: "B.E",
    job: "Software Engineer"
  },
  {
    // image: groom1,
    name: "Arun",
    age: "28 Years",
    city: "Coimbatore",
    education: "MBA",
    job: "Business Owner"
  },
  {
    // image: bride2,
    name: "Divya",
    age: "25 Years",
    city: "Madurai",
    education: "M.Tech",
    job: "IT Professional"
  },
  {
    // image: groom2,
    name: "Karthik",
    age: "29 Years",
    city: "Salem",
    education: "B.Tech",
    job: "Civil Engineer"
  },
  {
    // image: bride3,
    name: "Harini",
    age: "23 Years",
    city: "Erode",
    education: "B.Sc",
    job: "Teacher"
  },
  {
    // image: groom3,
    name: "Vignesh",
    age: "30 Years",
    city: "Trichy",
    education: "MCA",
    job: "Project Manager"
  }
];

export default function FeaturedProfiles() {
  return (
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

                <button className="view-btn">
                  View Profile
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}