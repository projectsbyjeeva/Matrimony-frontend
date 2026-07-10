import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./SearchPopup.css";

export default function SearchPopup() {
  return (
    <>
      <Navbar
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />

      <section className="search-page">

        <div className="container">

          {/* Horizontal Search Filters */}

          <div className="search-filter-bar">

            <div className="filter-item">
              <label>Looking For</label>
              <select>
                <option>Bride</option>
                <option>Groom</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Age</label>
              <select>
                <option>18 - 25</option>
                <option>26 - 30</option>
                <option>31 - 35</option>
                <option>36 - 40</option>
                <option>40+</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Religion</label>
              <select>
                <option>Any</option>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Muslim</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Community</label>
              <select>
                <option>Any</option>
                <option>Vanniyar</option>
                <option>Mudaliyar</option>
                <option>Nadar</option>
                <option>Chettiar</option>
                <option>Gounder</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Marital Status</label>
              <select>
                <option>Any</option>
                <option>Never Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Education</label>
              <select>
                <option>Any</option>
                <option>BE / BTech</option>
                <option>MBBS</option>
                <option>MBA</option>
                <option>MCA</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Occupation</label>
              <select>
                <option>Any</option>
                <option>Software Engineer</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Business</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Country</label>
              <select>
                <option>India</option>
                <option>Singapore</option>
                <option>Malaysia</option>
                <option>USA</option>
              </select>
            </div>

            <div className="filter-item">
              <label>State</label>
              <select>
                <option>Tamil Nadu</option>
                <option>Karnataka</option>
                <option>Kerala</option>
              </select>
            </div>

            <div className="filter-item">
              <label>City</label>
              <select>
                <option>Chennai</option>
                <option>Coimbatore</option>
                <option>Madurai</option>
                <option>Salem</option>
              </select>
            </div>

            <button className="search-filter-btn">
              Search Profiles
            </button>

          </div>

          {/* Results */}

          <div className="profiles-header">

            <h2>Matching Profiles</h2>

            <span>250 Profiles Found</span>

          </div>

          <div className="profiles-grid">

            {/* Step 3: Profile cards */}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}