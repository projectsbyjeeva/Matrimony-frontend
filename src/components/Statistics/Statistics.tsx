import "./Statistics.css";

import {
  FaUsers,
  FaHeart,
  FaUserCheck,
  FaStar,
} from "react-icons/fa";

export default function Statistics() {
  return (
    <section className="statistics">

      <div className="container">

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <h2>50K+</h2>

            <p>Registered Members</p>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaHeart />
            </div>

            <h2>25K+</h2>

            <p>Successful Marriages</p>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaUserCheck />
            </div>

            <h2>100%</h2>

            <p>Verified Profiles</p>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaStar />
            </div>

            <h2>4.9 ★</h2>

            <p>Customer Rating</p>

          </div>

        </div>

      </div>

    </section>
  );
}