import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaCity,
  FaGlobeAsia,
  FaGraduationCap,
  FaHeart,
  FaLandmark,
  FaMapMarkerAlt,
  FaRing,
  FaSearch,
  FaSlidersH,
  FaUserFriends,
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
  { id: "lookingFor", label: "Looking For", icon: FaUserFriends, options: toOptions(["Any", "Bride", "Groom"]) },
  { id: "age", label: "Age", icon: FaUsers, options: toOptions(["Any", "18 - 25", "26 - 30", "31 - 35", "36 - 40"]) },
  { id: "religion", label: "Religion", icon: FaLandmark, options: toOptions(["Any", "Hindu", "Christian", "Muslim"]) },
  { id: "community", label: "Community", icon: FaUserFriends, options: toOptions(["Any", "Vanniyar", "Gounder", "Nadar"]) },
  { id: "maritalStatus", label: "Marital Status", icon: FaRing, options: toOptions(["Any", "Never Married", "Divorced", "Widowed"]) },
  { id: "education", label: "Education", icon: FaGraduationCap, options: toOptions(["Any", "BE", "MBA", "Doctor"]) },
  { id: "occupation", label: "Occupation", icon: FaBriefcase, options: toOptions(["Any", "Engineer", "Teacher", "Business"]) },
  { id: "country", label: "Country", icon: FaGlobeAsia, options: toOptions(["Any", "India", "Singapore", "Malaysia"]) },
  { id: "state", label: "State", icon: FaBuilding, options: toOptions(["Any", "Tamil Nadu", "Karnataka", "Kerala"]) },
  { id: "city", label: "City", icon: FaCity, options: toOptions(["Any", "Chennai", "Coimbatore", "Madurai", "Salem", "Erode", "Trichy"]) },
];

export default function SearchPopup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterValues>(() => ({
    lookingFor: searchParams.get("lookingFor") || "Any",
    city: searchParams.get("city") || "Any",
  }));
  const results = useMemo(
    () => profiles.filter((profile) =>
      searchFilters.every(({ id }) => {
        const selected = filters[id];
        if (!selected || selected === "Any") return true;

        if (id === "age") {
          const [minimum, maximum] = selected.split(" - ").map(Number);
          return profile.age >= minimum && profile.age <= maximum;
        }

        return String(profile[id as keyof typeof profile]) === selected;
      })
    ),
    [filters]
  );

  return (
    <>
      <Navbar
        onLoginClick={() => {}}
        onRegisterClick={() => {}}
      />

      <section className="search-page">
        <div className="container">

          <div className="search-card-area">
            <aside className="search-journey-panel">
              <span className="journey-filter-icon"><FaSlidersH /></span>
              <h1>Find your <strong>perfect match</strong></h1>
              <div className="journey-divider"><span>♥</span></div>
              <p>Discover verified Valluvan brides and grooms who match your preferences.</p>
              <div className="journey-verified">
                <span>✓</span>
                <div><strong>100% Verified Profiles</strong><small>Safe • Secure • Trusted</small></div>
              </div>
            </aside>
              <form
                className="search-filter-card"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="filter-card-header">
                  <div className="filter-card-title">
                    <div>
                      <h2>Let's find your life partner</h2>
                    </div>
                  </div>

                  <div className="profile-count">
                    <FaUsers aria-hidden="true" />
                    <span><strong>250+</strong> verified profiles</span>
                  </div>
                </div>

                <div className="search-filter-bar">
                  {searchFilters.map((filter) => {
                    const FilterIcon = filter.icon;
                    const selectedValue = filters[filter.id] ?? "Any";
                    return (
                    <div className="filter-item" key={filter.id}>
                      <span className="filter-field-icon"><FilterIcon /></span>
                      <div className="filter-field-control">
                        <label htmlFor={filter.id}>{filter.label}</label>
                        <Select<FilterOption>
                          key={`${filter.id}-${selectedValue}`}
                          inputId={filter.id}
                          classNamePrefix="filter-select"
                          value={{ value: selectedValue, label: selectedValue }}
                          options={filter.options}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          formatOptionLabel={(option, meta) =>
                            meta.context === "value"
                              ? selectedValue
                              : option.label
                          }
                          onChange={(option) => {
                            const nextValue = option?.value ?? "Any";
                            setFilters((current) => ({
                              ...current,
                              [filter.id]: nextValue,
                            }));
                          }}
                          isClearable={false}
                          isSearchable={false}
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                        />
                      </div>
                    </div>
                  )})}

                  <div className="filter-action">
                    <span><b>❖</b> Ready to meet your match?</span>
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
