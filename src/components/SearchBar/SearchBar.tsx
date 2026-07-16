import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

import "./SearchBar.css";

import {
  FaBriefcase,
  FaChevronDown,
  FaFemale,
  FaGraduationCap,
  FaHeart,
  FaIdCard,
  FaMale,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaSlidersH,
  FaUserFriends,
} from "react-icons/fa";

type LookingFor = "bride" | "groom";
type SearchMode = "matches" | "profileId";

type SearchData = {
  lookingFor: LookingFor;
  ageFrom: string;
  ageTo: string;
  maritalStatus: string;
  subCommunity: string;
  education: string;
  profession: string;
  location: string;
  profileId: string;
};

const ages = Array.from({ length: 43 }, (_, index) => index + 18);

const popularLocations = [
  "Chennai",
  "Coimbatore",
  "Erode",
  "Salem",
  "Madurai",
  "Bengaluru",
];

export default function SearchBar() {
  const [searchMode, setSearchMode] =
    useState<SearchMode>("matches");

  const [showAdvanced, setShowAdvanced] =
    useState(false);

  const [searchData, setSearchData] =
    useState<SearchData>({
      lookingFor: "bride",
      ageFrom: "21",
      ageTo: "30",
      maritalStatus: "",
      subCommunity: "",
      education: "",
      profession: "",
      location: "",
      profileId: "",
    });

  const availableToAges = useMemo(
    () =>
      ages.filter(
        (age) => age >= Number(searchData.ageFrom)
      ),
    [searchData.ageFrom]
  );

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

  const handleLookingForChange = (
    lookingFor: LookingFor
  ) => {
    setSearchData((previous) => ({
      ...previous,
      lookingFor,
    }));
  };

  const handlePopularLocation = (
    location: string
  ) => {
    setSearchData((previous) => ({
      ...previous,
      location,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (searchMode === "profileId") {
      console.log("Profile ID search:", {
        profileId: searchData.profileId,
      });
      return;
    }

    console.log("Advanced match search:", searchData);
  };

  return (
    <section className="advanced-search-section">
      <div className="container">
        <div className="advanced-search-shell">
          <aside className="advanced-search-intro">
            <span className="intro-eyebrow">
              VALLUVAN MATRIMONY
            </span>

            <h2>
              Find a match who feels
              <span> right for you.</span>
            </h2>

            <p>
              Search verified Valluvan bride and groom
              profiles using preferences that matter most.
            </p>

            <div className="intro-trust-list">
              <div>
                <span>
                  <FaShieldAlt />
                </span>
                <div>
                  <strong>Verified profiles</strong>
                  <small>
                    Better trust and genuine connections
                  </small>
                </div>
              </div>

              <div>
                <span>
                  <FaHeart />
                </span>
                <div>
                  <strong>Private preferences</strong>
                  <small>
                    Your search details stay protected
                  </small>
                </div>
              </div>
            </div>

            <div className="intro-decoration intro-decoration-one" />
            <div className="intro-decoration intro-decoration-two" />
          </aside>

          <form
            className="advanced-search-form"
            onSubmit={handleSubmit}
          >
            <div className="search-form-top">
              <div>
                <span className="form-kicker">
                  SMART MATCH SEARCH
                </span>
                <h3>Discover suitable profiles</h3>
              </div>

              <div className="search-mode-switch">
                <button
                  type="button"
                  className={
                    searchMode === "matches"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSearchMode("matches")
                  }
                >
                  <FaUserFriends />
                  Match search
                </button>

                <button
                  type="button"
                  className={
                    searchMode === "profileId"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSearchMode("profileId")
                  }
                >
                  <FaIdCard />
                  Profile ID
                </button>
              </div>
            </div>

            {searchMode === "matches" ? (
              <>
                <div className="primary-search-grid">
                  <div className="field-block looking-field">
                    <label>Looking for</label>

                    <div className="gender-selector">
                      <button
                        type="button"
                        className={
                          searchData.lookingFor ===
                          "bride"
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleLookingForChange(
                            "bride"
                          )
                        }
                      >
                        <span>
                          <FaFemale />
                        </span>
                        <div>
                          <small>Search for a</small>
                          <strong>Bride</strong>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={
                          searchData.lookingFor ===
                          "groom"
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleLookingForChange(
                            "groom"
                          )
                        }
                      >
                        <span>
                          <FaMale />
                        </span>
                        <div>
                          <small>Search for a</small>
                          <strong>Groom</strong>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="field-block">
                    <label>Preferred age</label>

                    <div className="age-range">
                      <div className="select-box">
                        <small>FROM</small>
                        <select
                          name="ageFrom"
                          value={searchData.ageFrom}
                          onChange={handleInputChange}
                        >
                          {ages.map((age) => (
                            <option
                              key={age}
                              value={age}
                            >
                              {age} years
                            </option>
                          ))}
                        </select>
                        <FaChevronDown />
                      </div>

                      <span className="age-line" />

                      <div className="select-box">
                        <small>TO</small>
                        <select
                          name="ageTo"
                          value={searchData.ageTo}
                          onChange={handleInputChange}
                        >
                          {availableToAges.map((age) => (
                            <option
                              key={age}
                              value={age}
                            >
                              {age} years
                            </option>
                          ))}
                        </select>
                        <FaChevronDown />
                      </div>
                    </div>
                  </div>

                  <div className="field-block">
                    <label>City or district</label>

                    <div className="input-box">
                      <FaMapMarkerAlt />
                      <input
                        type="text"
                        name="location"
                        value={searchData.location}
                        placeholder="Enter city or district"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={
                    showAdvanced
                      ? "advanced-filter-panel open"
                      : "advanced-filter-panel"
                  }
                >
                  <div className="advanced-filter-grid">
                    <div className="field-block">
                      <label>Marital status</label>
                      <div className="select-box icon-select">
                        <FaHeart />
                        <select
                          name="maritalStatus"
                          value={
                            searchData.maritalStatus
                          }
                          onChange={handleInputChange}
                        >
                          <option value="">
                            Any marital status
                          </option>
                          <option value="never-married">
                            Never married
                          </option>
                          <option value="divorced">
                            Divorced
                          </option>
                          <option value="widowed">
                            Widowed
                          </option>
                        </select>
                        <FaChevronDown />
                      </div>
                    </div>

                    <div className="field-block">
                      <label>Valluvan community</label>
                      <div className="select-box icon-select">
                        <FaUserFriends />
                        <select
                          name="subCommunity"
                          value={searchData.subCommunity}
                          onChange={handleInputChange}
                        >
                          <option value="">
                            Any Valluvan community
                          </option>
                          <option value="valluvan">
                            Valluvan
                          </option>
                          <option value="thiruvalluvar">
                            Thiruvalluvar
                          </option>
                          <option value="valluva-pandaram">
                            Valluva Pandaram
                          </option>
                          <option value="other">
                            Other Valluvan community
                          </option>
                        </select>
                        <FaChevronDown />
                      </div>
                    </div>

                    <div className="field-block">
                      <label>Education</label>
                      <div className="select-box icon-select">
                        <FaGraduationCap />
                        <select
                          name="education"
                          value={searchData.education}
                          onChange={handleInputChange}
                        >
                          <option value="">
                            Any education
                          </option>
                          <option value="school">
                            School
                          </option>
                          <option value="diploma">
                            Diploma
                          </option>
                          <option value="graduate">
                            Graduate
                          </option>
                          <option value="post-graduate">
                            Postgraduate
                          </option>
                          <option value="professional">
                            Professional degree
                          </option>
                        </select>
                        <FaChevronDown />
                      </div>
                    </div>

                    <div className="field-block">
                      <label>Profession</label>
                      <div className="select-box icon-select">
                        <FaBriefcase />
                        <select
                          name="profession"
                          value={searchData.profession}
                          onChange={handleInputChange}
                        >
                          <option value="">
                            Any profession
                          </option>
                          <option value="it">
                            IT / Software
                          </option>
                          <option value="government">
                            Government
                          </option>
                          <option value="business">
                            Business
                          </option>
                          <option value="medical">
                            Medical
                          </option>
                          <option value="education">
                            Education
                          </option>
                          <option value="other">
                            Other
                          </option>
                        </select>
                        <FaChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="search-actions-row">
                  <button
                    type="button"
                    className="advanced-toggle"
                    onClick={() =>
                      setShowAdvanced((previous) => !previous)
                    }
                  >
                    <FaSlidersH />
                    {showAdvanced
                      ? "Hide advanced filters"
                      : "More search filters"}
                    <span
                      className={
                        showAdvanced ? "rotate" : ""
                      }
                    >
                      <FaChevronDown />
                    </span>
                  </button>

                  <button
                    type="submit"
                    className="primary-search-button"
                  >
                    <span>
                      <FaSearch />
                    </span>
                    <div>
                      <strong>Find my matches</strong>
                      <small>
                        Browse verified Valluvan profiles
                      </small>
                    </div>
                  </button>
                </div>

                <div className="popular-location-row">
                  <span>Popular:</span>

                  <div>
                    {popularLocations.map((location) => (
                  <button type="button" key={location}  className={ searchData.location === location ? "active" : "" } onClick={() =>handlePopularLocation(location) } >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="profile-id-search">
                <div className="profile-id-icon">
                  <FaIdCard />
                </div>

                <div className="profile-id-content">
                  <span>DIRECT PROFILE SEARCH</span>
                  <h4>Already know the Profile ID?</h4>
                  <p>
                    Enter the Valluvan Matrimony profile ID
                    to open the matching profile directly.
                  </p>

                  <div className="profile-id-control">
                    <input type="text" name="profileId" value={searchData.profileId} placeholder="Example: VM10245" onChange={handleInputChange}/>

                    <button type="submit">
                      <FaSearch />
                      Search profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="privacy-note">
              <FaShieldAlt />
              Your preferences are secure and will not be
              shown publicly.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}