import "./SuccessStories.css";

// import story1 from "../../assets/images/story1.jpg";
// import story2 from "../../assets/images/story2.jpg";
// import story3 from "../../assets/images/story3.jpg";

import { FaStar } from "react-icons/fa";

const stories = [
  {
    // image: story1,
    name: "Arun & Priya",
    text:
      "We found each other through Valluvan Matrimony. Thank you for making our journey beautiful.",
  },
  {
    // image: story2,
    name: "Karthik & Divya",
    text:
      "A trusted platform with genuine profiles. Our families connected instantly.",
  },
  {
    // image: story3,
    name: "Vignesh & Harini",
    text:
      "The best decision we made. We found our soulmate through Valluvan Matrimony.",
  },
];

export default function SuccessStories() {
  return (
    <section className="stories section">

      <div className="container">

        <div className="section-title">

          <h2>Success Stories</h2>

          <p>
            Thousands of happy couples began their journey with us.
          </p>

        </div>

        <div className="stories-grid">

          {stories.map((story, index) => (

            <div className="story-card" key={index}>

              {/* <img
                src={story.image}
                alt={story.name}
              /> */}

              <div className="story-content">

                <div className="rating">

                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                </div>

                <h3>{story.name}</h3>

                <p>{story.text}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}