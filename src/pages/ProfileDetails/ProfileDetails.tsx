import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { profiles } from "../../data/profileData";
import logoImage from "../../assets/images/vallu-2.png";
import "./ProfileDetails.css";

export default function ProfileDetails() {
  const { profileId } = useParams();
  const profile = profiles.find((item) => item.id === profileId);

  useEffect(() => {
    if (!profile) return;
    const previousTitle = document.title;
    document.title = `${profile.name} - Valluvan Matrimony`;
    return () => { document.title = previousTitle; };
  }, [profile]);

  if (!profile) {
    return (
      <>
        <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
        <main className="profile-details-page profile-not-found">
          <h1>Profile not found</h1>
          <Link to="/search">Back to Search</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      <main className="profile-details-page">
        <div className="profile-details-container">
          <div className="profile-page-actions">
            <Link to="/search" className="profile-back-link">
              <FaArrowLeft aria-hidden="true" /> Back to Search
            </Link>
          </div>

          <article className="profile-details-card">
            <div className="profile-print-brand">
              <img src={logoImage} alt="Valluvan Matrimony" />
              <div>
                <strong>VALLUVAN</strong>
                <span>MATRIMONY</span>
              </div>
            </div>

            <header className="profile-details-header">
              <div className="profile-details-summary">
                <span className="profile-registration">VM-{7420 + profiles.indexOf(profile)}</span>
                <h1>{profile.name}</h1>
                <p>{profile.age} Years · {profile.city}</p>
                <span className="verified-profile">Verified Profile</span>
              </div>
              <img src={profile.image} alt={profile.name} />
            </header>

            <div className="profile-details-body">
              <section className="profile-detail-section">
                <h2>Personal Details</h2>
                <dl className="profile-detail-grid">
                  <div><dt>Age</dt><dd>{profile.age} Years</dd></div>
                  <div><dt>Marital Status</dt><dd>{profile.maritalStatus}</dd></div>
                  <div><dt>Height</dt><dd>5′ 6″</dd></div>
                  <div><dt>Religion</dt><dd>{profile.religion}</dd></div>
                  <div><dt>Community</dt><dd>{profile.community}</dd></div>
                  <div><dt>Education</dt><dd>{profile.education}</dd></div>
                  <div><dt>Occupation</dt><dd>{profile.occupation}</dd></div>
                  <div><dt>Languages Known</dt><dd>Tamil, English</dd></div>
                  <div><dt>Country</dt><dd>{profile.country}</dd></div>
                  <div><dt>State</dt><dd>{profile.state}</dd></div>
                  <div><dt>City</dt><dd>{profile.city}</dd></div>
                  <div><dt>Horoscope Status</dt><dd>Available</dd></div>
                </dl>
              </section>

              <section className="profile-detail-section">
                <h2>Family Details</h2>
                <dl className="profile-detail-grid">
                  <div><dt>Father's Occupation</dt><dd>Business</dd></div>
                  <div><dt>Mother's Occupation</dt><dd>Homemaker</dd></div>
                  <div><dt>Siblings</dt><dd>One sibling</dd></div>
                  <div><dt>Native Place</dt><dd>{profile.city}</dd></div>
                  <div className="detail-wide"><dt>Family Background</dt><dd>Well-settled and respected family</dd></div>
                  <div className="detail-wide"><dt>Partner Expectations</dt><dd>Kind, educated and from a good family.</dd></div>
                </dl>
              </section>

              <section className="profile-detail-section">
                <h2>Contact Details</h2>
                <dl className="profile-detail-grid">
                  <div><dt>Contact Person</dt><dd>Parent / Guardian</dd></div>
                  <div><dt>Phone</dt><dd>+91 9XXXX XXXXX</dd></div>
                  <div><dt>Email</dt><dd>profile***@email.com</dd></div>
                  <div><dt>Location</dt><dd>{profile.city}, {profile.state}</dd></div>
                </dl>
                <p className="contact-note">Contact details are protected and shared only after mutual interest.</p>
              </section>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
