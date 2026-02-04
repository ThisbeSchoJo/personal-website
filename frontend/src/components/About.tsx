import React from "react";
import "../styles/About.css";

interface AboutProps {
  bio: string;
}

const About: React.FC<AboutProps> = ({ bio }) => {
  return (
    <section className="section about-section">
      <div className="section-content">
        <h2 className="section-title">About Me</h2>
        <p className="about-bio">{bio}</p>
      </div>
    </section>
  );
};

export default About;
