import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMedium,
} from "react-icons/fa";
import "../styles/Contact.css";

const StravaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.582l2.836 5.599h4.172L10.463 0 3.5 10.172h4.169" />
  </svg>
);

interface ContactProps {
  email: string;
  github: string;
  linkedin: string;
}

const Contact: React.FC<ContactProps> = ({ email, github, linkedin }) => {
  return (
    <section className="section contact-section">
      <div className="section-content">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-description">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
        <div className="contact-links">
          <a href={`mailto:${email}`} className="contact-link">
            <FaEnvelope className="contact-icon" />
            Email
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaGithub className="contact-icon" />
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaLinkedin className="contact-icon" />
            LinkedIn
          </a>
          <a
            href="https://medium.com/@thisbeschojo"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaMedium className="contact-icon" />
            Blog
          </a>
          <a
            href="https://www.strava.com/athletes/93340815"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <StravaIcon className="contact-icon contact-icon-strava" />
            Strava
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
