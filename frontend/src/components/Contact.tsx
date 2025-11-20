import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaSpotify, FaWordpress } from 'react-icons/fa';
import './Contact.css';

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
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
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
            href="https://wordpress.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaWordpress className="contact-icon" />
            Blog
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaSpotify className="contact-icon" />
            Spotify
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

