import { ChangeEvent, FormEvent, useState } from "react";
import "./SearchBar.css";

import {
  FaBirthdayCake,
  FaChevronDown,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

type SearchData = {
  lookingFor: "bride" | "groom";
  ageFrom: string;
  ageTo: string;
  religion: string;
  community: string;
  location: string;
};

const ages = Array.from({ length: 43 }, (_, index) => index + 18);

export default function SearchBar() {
  const [searchData, setSearchData] = useState<SearchData>({
    lookingFor: "bride",
    ageFrom: "21",
    ageTo: "30",
    religion: "",
    community: "",
    location: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setSearchData((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      if (
        name === "ageFrom" &&
        Number(value) > Number(previous.ageTo)
      ) {
        updated.ageTo = value;
      }

      return updated;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Search data:", searchData);

    // Navigate to your profiles page here.
  };

  return (
    <section className="elite-search-section">
      <div className="container">
        <form
          className="elite-search-card"
          onSubmit={handleSubmit}
        >
          <div className="elite-search-header">
            <div className="elite-heading-left">
              <span className="elite-heading-icon">
                <FaSearch />
              </span>

              <div>
                <span className="elite-eyebrow">
                  DISCOVER YOUR PARTNER
                </span>

                <h2>Find Profiles Matching Your Preferences</h2>
              </div>
            </div>

            <div className="elite-verification">
              <FaShieldAlt />

              <span>
                <strong>50,000+</strong>
                Verified profiles
              </span>
            </div>
          </div>

          <div className="elite-search-main">
            <div className="elite-looking-for">
              <label>Looking for</label>

              <div className="elite-gender-switch">
                <button
                  type="button"
                  className={
                    searchData.lookingFor === "bride"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSearchData((previous) => ({
                      ...previous,
                      lookingFor: "bride",
                    }))
                  }
                >
                  <FaFemale />
                  Bride
                </button>

                <button
                  type="button"
                  className={
                    searchData.lookingFor === "groom"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSearchData((previous) => ({
                      ...previous,
                      lookingFor: "groom",
                    }))
                  }
                >
                  <FaMale />
                  Groom
                </button>
              </div>
            </div>

            <div className="elite-field elite-age-field">
              <label>
                <FaBirthdayCake />
                Preferred age
              </label>

              <div className="elite-age-group">
                <div className="elite-select-box">
                  <span>From</span>

                  <select
                    name="ageFrom"
                    value={searchData.ageFrom}
                    onChange={handleChange}
                  >
                    {ages.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>

                  <FaChevronDown />
                </div>

                <span className="elite-age-line"></span>

                <div className="elite-select-box">
                  <span>To</span>

                  <select
                    name="ageTo"
                    value={searchData.ageTo}
                    onChange={handleChange}
                  >
                    {ages
                      .filter(
                        (age) => age >= Number(searchData.ageFrom)
                      )
                      .map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                  </select>

                  <FaChevronDown />
                </div>
              </div>
            </div>

            <div className="elite-field">
              <label>
                <FaShieldAlt />
                Religion
              </label>

              <div className="elite-input-control">
                <select
                  name="religion"
                  value={searchData.religion}
                  onChange={handleChange}
                >
                  <option value="">Any Religion</option>
                  <option value="hindu">Hindu</option>
                  <option value="christian">Christian</option>
                  <option value="muslim">Muslim</option>
                  <option value="jain">Jain</option>
                  <option value="sikh">Sikh</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="other">Other</option>
                </select>

                <FaChevronDown />
              </div>
            </div>

            <div className="elite-field">
              <label>
                <FaUsers />
                Community
              </label>

              <div className="elite-input-control">
                <select
                  name="community"
                  value={searchData.community}
                  onChange={handleChange}
                >
                  <option value="">Any Community</option>
                  <option value="valluvan">Valluvan</option>
                  <option value="vanniyar">Vanniyar</option>
                  <option value="gounder">Gounder</option>
                  <option value="nadar">Nadar</option>
                  <option value="chettiar">Chettiar</option>
                  <option value="mudaliar">Mudaliar</option>
                  <option value="naidu">Naidu</option>
                  <option value="adi-dravidar">
                    Adi Dravidar
                  </option>
                  <option value="other">Other</option>
                </select>

                <FaChevronDown />
              </div>
            </div>

            <div className="elite-field elite-location-field">
              <label>
                <FaMapMarkerAlt />
                City or district
              </label>

              <div className="elite-input-control">
                <input
                  type="text"
                  name="location"
                  value={searchData.location}
                  placeholder="Enter location"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="elite-search-button"
            >
              <span className="elite-button-icon">
                <FaSearch />
              </span>

              <span className="elite-button-text">
                <strong>Search Profiles</strong>
                <small>Find your perfect match</small>
              </span>
            </button>
          </div>

          <div className="elite-search-footer">
            <div className="elite-private-note">
              <FaShieldAlt />
              Your preferences remain private and secure.
            </div>

            <div className="elite-popular">
              <span>Popular locations</span>

              {[
                "Chennai",
                "Coimbatore",
                "Madurai",
                "Bangalore",
                "NRI",
              ].map((location) => (
                <button
                  type="button"
                  key={location}
                  onClick={() =>
                    setSearchData((previous) => ({
                      ...previous,
                      location,
                    }))
                  }
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}