import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaMapMarkerAlt,
  FaSearch,
  FaSlidersH,
  FaUsers,
} from "react-icons/fa";
import Select from "react-select";
import { profiles } from "../../data/profileData";

import "./SearchPopup.css";

type FilterOption = { value: string; label: string };
type FilterValues = Record<string, string>;

const toOptions = (values: string[]): FilterOption[] =>
  values.map((value) => ({ value, label: value }));

const searchFilters = [
  { id: "lookingFor", label: "Looking For", options: toOptions(["Any", "Bride", "Groom"]) },
  { id: "age", label: "Age", options: toOptions(["Any", "18 - 25", "26 - 30", "31 - 35", "36 - 40"]) },
  { id: "religion", label: "Religion", options: toOptions(["Any", "Hindu", "Christian", "Muslim"]) },
  { id: "community", label: "Community", options: toOptions(["Any", "Vanniyar", "Gounder", "Nadar"]) },
  { id: "maritalStatus", label: "Marital Status", options: toOptions(["Any", "Never Married", "Divorced", "Widowed"]) },
  { id: "education", label: "Education", options: toOptions(["Any", "BE", "MBA", "Doctor"]) },
  { id: "occupation", label: "Occupation", options: toOptions(["Any", "Engineer", "Teacher", "Business"]) },
  { id: "country", label: "Country", options: toOptions(["Any", "India", "Singapore", "Malaysia"]) },
  { id: "state", label: "State", options: toOptions(["Any", "Tamil Nadu", "Karnataka", "Kerala"]) },
  { id: "city", label: "City", options: toOptions(["Any", "Chennai", "Coimbatore", "Madurai", "Salem", "Erode", "Trichy"]) },
];

export default function SearchPopup() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValues>({});
  const [results, setResults] = useState(profiles);

  const handleSearch = () => {
    setResults(
      profiles.filter((profile) =>
        searchFilters.every(({ id }) => {
          const selected = filters[id];
          if (!selected || selected === "Any") return true;

          if (id === "age") {
            const [minimum, maximum] = selected.split(" - ").map(Number);
            return profile.age >= minimum && profile.age <= maximum;
          }

          return String(profile[id as keyof typeof profile]) === selected;
        })
      )
    );
  };

  return (
    <>
      <Navbar
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />

      <section className="search-page">
        <div className="container">

          <div className="search-card-area">
              <form
                className="search-filter-card"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSearch();
                }}
              >
                <div className="filter-card-header">
                  <div className="filter-card-title">
                    <span className="filter-title-icon">
                      <FaSlidersH aria-hidden="true" />
                    </span>
                    <div>
                      <h2>Partner Preferences</h2>
                      <span>Choose your preferences to find matching profiles</span>
                    </div>
                  </div>

                  <div className="profile-count">
                    <FaUsers aria-hidden="true" />
                    <span><strong>250+</strong> verified profiles</span>
                  </div>
                </div>

                <div className="search-filter-bar">
                  {searchFilters.map((filter) => (
                    <div className="filter-item" key={filter.id}>
                      <label htmlFor={filter.id}>{filter.label}</label>
                      <Select<FilterOption>
                        inputId={filter.id}
                        classNamePrefix="filter-select"
                        value={filter.options.find(
                          (option) => option.value === (filters[filter.id] || "Any")
                        )}
                        options={filter.options}
                        onChange={(option) =>
                          setFilters((current) => ({
                            ...current,
                            [filter.id]: option?.value || "Any",
                          }))
                        }
                        isClearable
                        isSearchable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        placeholder={`Select ${filter.label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  <div className="filter-action">
                    <span>Ready to meet your match?</span>
                    <button type="submit" className="search-filter-btn">
                      <FaSearch aria-hidden="true" />
                      Search Profiles
                    </button>
                  </div>
                </div>
              </form>
          </div>

          {/* Results */}

          <div className="profiles-header">

            <h2>Matching Profiles</h2>

            <span>{results.length} Profiles Found</span>

          </div>

          <div className="profiles-grid">
            {results.map((profile) => (
              <article className="search-profile-card" key={profile.name}>
                <div className="search-profile-image">
                  <img src={profile.image} alt={profile.name} />
                  <button type="button" className="search-like-btn" aria-label={`Like ${profile.name}`}>
                    <FaHeart aria-hidden="true" />
                  </button>
                </div>
                <div className="search-profile-content">
                  <h3>{profile.name}<span>{profile.age} Years</span></h3>
                  <p><FaMapMarkerAlt aria-hidden="true" />{profile.city}</p>
                  <p><FaGraduationCap aria-hidden="true" />{profile.education}</p>
                  <p><FaBriefcase aria-hidden="true" />{profile.occupation}</p>
                  <button
                    type="button"
                    className="search-view-btn"
                    onClick={() => navigate(`/profile/${profile.id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </article>
            ))}

            {results.length === 0 && (
              <div className="no-profile-results">
                <FaUsers aria-hidden="true" />
                <h3>No matching profiles</h3>
                <p>Try changing one or more filters and search again.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
