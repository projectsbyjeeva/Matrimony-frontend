import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaArrowRight,
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
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import Select from "react-select";
import { profiles } from "../../data/profileData";

import "./SearchPopup.css";
import "./SearchFilter.css";

type FilterOption = { value: string; label: string };
type FilterValues = Record<string, string>;

const toOptions = (values: string[]): FilterOption[] =>
  values.map((value) => ({ value, label: value }));

const additionalFilters = [
  { id: "religion", label: "Religion", icon: FaLandmark, options: toOptions(["Any", "Hindu", "Christian", "Muslim"]) },
  { id: "community", label: "Community", icon: FaUserFriends, options: toOptions(["Any", "Vanniyar", "Gounder", "Nadar"]) },
  { id: "maritalStatus", label: "Marital Status", icon: FaRing, options: toOptions(["Any", "Never Married", "Divorced", "Widowed"]) },
  { id: "education", label: "Education", icon: FaGraduationCap, options: toOptions(["Any", "BE", "MBA", "Doctor"]) },
  { id: "occupation", label: "Occupation", icon: FaBriefcase, options: toOptions(["Any", "Engineer", "Teacher", "Business"]) },
];

const locations: Record<string, Record<string, string[]>> = {
  India: {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Erode", "Trichy"],
    Karnataka: ["Bengaluru", "Mysuru"],
    Kerala: ["Kochi", "Thiruvananthapuram"],
  },
  Singapore: { Singapore: ["Singapore"] },
  Malaysia: { Selangor: ["Shah Alam", "Petaling Jaya"], "Kuala Lumpur": ["Kuala Lumpur"] },
};
const isSelected = (value?: string) => Boolean(value && value !== "Any");
const ages = Array.from({ length: 63 }, (_, index) => String(index + 18));
const labels: Record<string, string> = {
  lookingFor: "Looking For", country: "Country", state: "State", city: "City",
  ...Object.fromEntries(additionalFilters.map(({ id, label }) => [id, label])),
};
const findMatches = (values: FilterValues) => profiles.filter((profile) =>
  Object.entries(values).every(([id, value]) => {
    if (!isSelected(value)) return true;
    if (id === "ageFrom") return profile.age >= Number(value);
    if (id === "ageTo") return profile.age <= Number(value);
    return String(profile[id as keyof typeof profile]) === value;
  })
);

// Keep dependent locations valid when editing filters.
const updateFilter = (current: FilterValues, id: string, value: string): FilterValues => {
  const next = { ...current, [id]: value };
  if (id === "country") { next.state = "Any"; next.city = "Any"; }
  if (id === "state") next.city = "Any";
  if (id === "ageFrom" && isSelected(value) && isSelected(next.ageTo) && +value > +next.ageTo) next.ageTo = value;
  if (id === "ageTo" && isSelected(value) && isSelected(next.ageFrom) && +value < +next.ageFrom) next.ageFrom = value;
  return next;
};

export default function SearchPopup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterValues>(() => {
    const initial: FilterValues = {};
    const gender = searchParams.get("lookingFor");
    if (gender === "Bride" || gender === "Groom") initial.lookingFor = gender;
    const city = searchParams.get("city");
    if (city) {
      for (const [country, states] of Object.entries(locations)) {
        for (const [state, cities] of Object.entries(states)) {
          const match = cities.find((item) => item.toLowerCase() === city.trim().toLowerCase());
          if (match) Object.assign(initial, { country, state, city: match });
        }
      }
    }
    for (const id of ["ageFrom", "ageTo"]) {
      const value = searchParams.get(id);
      if (value && ages.includes(value)) Object.assign(initial, updateFilter(initial, id, value));
    }
    return initial;
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(filters);
  const results = useMemo(() => findMatches(appliedFilters), [appliedFilters]);
  const previewCount = useMemo(() => findMatches(filters).length, [filters]);
  const pendingChanges = [...Object.keys(labels), "ageFrom", "ageTo"].some(
    (id) => (filters[id] || "Any") !== (appliedFilters[id] || "Any")
  );
  const renderSelect = (
    id: string, label: string, Icon: typeof FaUsers, values: FilterOption[], disabled = false, placeholder?: string
  ) => {
    const value = filters[id] || "Any";
    return (
      <div className={`filter-item${disabled ? " filter-item-disabled" : ""}`} key={id}>
        <span className="filter-field-icon"><Icon aria-hidden="true" /></span>
        <div className="filter-field-control">
          <label htmlFor={id}>{label}</label>
          <Select<FilterOption>
            inputId={id}
            classNamePrefix="filter-select"
            value={isSelected(value) ? { value, label: value } : null}
            placeholder={placeholder || (id === "ageFrom" ? "Min age" : id === "ageTo" ? "Max age" : id === "maritalStatus" ? "Select status" : `Select ${label.toLowerCase()}`)}
            options={values.map((option) => option.value === "Any" ? { ...option, label: "No preference" } : option)}
            onChange={(option) => setFilters((current) => updateFilter(current, id, option?.value || "Any"))}
            isDisabled={disabled}
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </div>
      </div>
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

          <div className="search-card-area search-card-compact">
            <aside className="search-journey-panel">
              <span className="journey-filter-icon"><FaHeart aria-hidden="true" /></span>
              <h1>Your next <strong>chapter starts here.</strong></h1>
              <p>Find someone who shares your world.</p>
            </aside>
            <form className="search-filter-card" onSubmit={(event) => {
              event.preventDefault();
              setAppliedFilters({ ...filters });
            }}>
              <div className="filter-card-header">
                <div className="filter-card-title"><h2>Let's find your life partner</h2></div>
                <div className="profile-count"><FaUsers aria-hidden="true" /><span><strong>250+</strong> Verified Members</span></div>
              </div>
              <div className="match-filter-body">
                <div className="match-compact-grid">
                  <fieldset className="match-gender">
                    <legend><FaUserFriends aria-hidden="true" /> Looking For</legend>
                    <div className="match-gender-buttons">
                      {["Bride", "Groom"].map((gender) => (
                        <button key={gender} type="button" aria-label={gender} title={gender} aria-pressed={filters.lookingFor === gender}
                          onClick={() => setFilters((current) => ({ ...current, lookingFor: current.lookingFor === gender ? "Any" : gender }))}>
                          <span aria-hidden="true">{gender === "Bride" ? "👰" : "🤵"}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  {renderSelect("ageFrom", "Age From", FaUsers, toOptions(["Any", ...ages]))}
                  {renderSelect("ageTo", "Age To", FaUsers, toOptions(["Any", ...ages.filter((age) => !isSelected(filters.ageFrom) || +age >= +filters.ageFrom)]))}
                  {[...additionalFilters.slice(2), ...additionalFilters.slice(0, 2)].map(({ id, label, icon, options }) => renderSelect(id, label, icon, options))}
                <fieldset className="match-location-group">
                  <legend><FaMapMarkerAlt aria-hidden="true" /> Location <span>Choose where you’d like to find your match</span></legend>
                  <div className="match-location-grid">
                    {renderSelect("country", "Country", FaGlobeAsia, toOptions(["Any", ...Object.keys(locations)]))}
                    {renderSelect("state", "State", FaBuilding, toOptions(["Any", ...Object.keys(locations[filters.country] || {})]), !isSelected(filters.country), isSelected(filters.country) ? "Select state" : "Choose country first")}
                    {renderSelect("city", "City", FaCity, toOptions(["Any", ...(locations[filters.country]?.[filters.state] || [])]), !isSelected(filters.state), isSelected(filters.state) ? "Select city" : "Choose state first")}
                  </div>
                </fieldset>
                </div>
              </div>
              <div className="filter-action">
                <span>{pendingChanges ? "Preferences changed. Search to update your matches." : "A meaningful connection starts with a simple search."}</span>
                <button type="submit" className="search-filter-btn">
                  <FaSearch aria-hidden="true" /> View {previewCount} {previewCount === 1 ? "Match" : "Matches"} <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
          {/* Results */}

          <div className="profiles-header">

            <h2>Matching Profiles</h2>

            <span role="status">{results.length} Profiles Found</span>

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
