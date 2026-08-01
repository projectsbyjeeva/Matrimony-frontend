import { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaMapMarkerAlt,
  FaRing,
  FaShieldAlt,
  FaUserFriends,
} from "react-icons/fa";
import storyOne from "../../assets/images/cp-1.png";
import storyTwo from "../../assets/images/cpi.png";
import storyThree from "../../assets/images/Hero.jpeg";
import "./SuccessStories.css";

const stories = [
  {
    image: storyOne,
    name: "Arun & Priya",
    location: "Coimbatore",
    text: "We found each other when we least expected. Thank you Valluvan Matrimony for making our journey so special.",
    joined: "Feb 2024",
    married: "Jun 2024",
    tone: "rose",
  },
  {
    image: storyTwo,
    name: "Karthik & Divya",
    location: "Madurai",
    text: "A trusted platform with genuine profiles. Our families connected instantly and the rest is our beautiful story.",
    joined: "Jan 2024",
    married: "May 2024",
    tone: "gold",
  },
  {
    image: storyThree,
    name: "Vignesh & Harini",
    location: "Erode",
    text: "The best decision we made. We found our soulmate through Valluvan Matrimony.",
    joined: "Mar 2024",
    married: "Jul 2024",
    tone: "green",
  },
];

const trustItems = [
  { icon: <FaUserFriends />, title: "Thousands of Stories", text: "Many happy couples found their perfect match" },
  { icon: <FaShieldAlt />, title: "Trusted by Families", text: "Trusted by families across communities" },
  { icon: <FaHeart />, title: "Built on Trust", text: "Safe, secure and genuine connections every day" },
  { icon: <FaRing />, title: "Happily Ever After", text: "Every love story deserves a beautiful start" },
];

export default function SuccessStories() {
  const [start, setStart] = useState(0);
  const visibleStories = stories.map((_, index) => stories[(start + index) % stories.length]);

  const move = (direction: number) => {
    setStart((current) => (current + direction + stories.length) % stories.length);
  };

  return (
    <section className="stories section">
      <span className="stories-sparkle stories-sparkle-one">✦</span>
      <span className="stories-sparkle stories-sparkle-two">♥</span>
      <div className="container stories-container">
        <header className="stories-heading">
          <span>Real Stories. Real Connections.</span>
          <h2>Success Stories</h2>
          <div className="stories-title-divider"><FaHeart /></div>
          <p>Every love story is unique and beautiful.<br />Here are some of the happy couples who found their perfect match with Valluvan Matrimony.</p>
        </header>

        <div className="stories-carousel">
          <button type="button" className="story-arrow story-arrow-left" onClick={() => move(-1)} aria-label="Previous stories"><FaChevronLeft /></button>
          <div className="stories-grid">
            {visibleStories.map((story, index) => (
              <article className={`story-card story-${story.tone}`} key={`${story.name}-${index}`}>
                <div className="story-main">
                  <img src={story.image} alt={`${story.name} success story`} />
                  <div className="story-content">
                    <span className="story-quote">“</span>
                    <p>{story.text}</p>
                    <i />
                    <h3>{story.name}</h3>
                    <small><FaMapMarkerAlt /> {story.location}</small>
                  </div>
                </div>
                <footer className="story-timeline">
                  <div><FaCalendarAlt /><span>Joined<strong>{story.joined}</strong></span></div>
                  <div><FaHeart /><span>Married<strong>{story.married}</strong></span></div>
                  <b><FaHeart /></b>
                </footer>
              </article>
            ))}
          </div>
          <button type="button" className="story-arrow story-arrow-right" onClick={() => move(1)} aria-label="Next stories"><FaChevronRight /></button>
        </div>

        <div className="stories-trust-row">
          {trustItems.map((item) => <div key={item.title}><span>{item.icon}</span><p><strong>{item.title}</strong><small>{item.text}</small></p></div>)}
        </div>

      </div>
    </section>
  );
}
