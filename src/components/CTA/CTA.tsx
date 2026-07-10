import "./CTA.css";

// import ctaImage from "../../assets/images/cta.png";

export default function CTA() {
  return (
    <section className="cta">

      <div className="container">

        <div className="cta-box">

          <div className="cta-left">

            <span className="cta-tag">
              ❤️ Trusted Tamil Matrimony
            </span>

            <h2>
              Begin Your Beautiful
              <br />
              Journey Today
            </h2>

            <p>
              Join thousands of happy couples who found their soulmate
              through Valluvan Matrimony.
            </p>

            <button className="primary-btn">
              Register Free
            </button>

          </div>

          <div className="cta-right">
{/* 
            <img
              src={ctaImage}
              alt="Happy Couple"
            /> */}

          </div>

        </div>

      </div>

    </section>
  );
}