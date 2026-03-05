import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCode, FaFlask, FaPaintBrush, FaChartLine } from "react-icons/fa";
import "../styles/About.css";
import { PortfolioData } from "../types";

interface AboutProps {
  portfolioData: PortfolioData;
}

const HIGHLIGHT_ICONS = [FaCode, FaFlask, FaPaintBrush, FaChartLine];

const About: React.FC<AboutProps> = ({ portfolioData }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const {
    title,
    bio,
    tagline,
    highlights,
    what_im_looking_for,
    resume_url,
    about_sections,
    github,
    linkedin,
  } = portfolioData;

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  return (
    <section className="section about-section">
      
        <div className="section-content">
          <h1 className="section-title about-title">{title}</h1>
          {tagline && <p className="about-tagline">{tagline}</p>}
          <p className="about-bio">{bio}</p>

          {highlights && highlights.length > 0 && (
            <div className="about-highlights">
              {highlights.map((highlight, index) => {
                const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
                return (
                  <div key={index} className="about-highlight-item">
                    <span className="about-highlight-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span>{highlight}</span>
                  </div>
                );
              })}
            </div>
          )}

          {what_im_looking_for && (
            <div className="about-looking-for">
              <h3 className="about-subtitle">What I&apos;m looking for</h3>
              <p className="about-looking-for-text">{what_im_looking_for}</p>
            </div>
          )}

          {about_sections && about_sections.length > 0 && (
            <div className="about-accordion">
              {about_sections.map((section) => {
                const isExpanded = expandedSection === section.title;
                return (
                  <div key={section.title} className="about-accordion-item">
                    <button
                      type="button"
                      className="about-accordion-trigger"
                      onClick={() => toggleSection(section.title)}
                      aria-expanded={isExpanded}
                      aria-controls={`accordion-${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <span>{section.title}</span>
                      <span className="about-accordion-icon">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id={`accordion-${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                      className={`about-accordion-content ${isExpanded ? "about-accordion-expanded" : ""}`}
                      role="region"
                      aria-hidden={!isExpanded}
                    >
                      <p>{section.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="about-resume-cta">
            <Link to="/resume" className="about-resume-btn">
              View my resume
            </Link>
          </div>

          <div className="about-links">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              GitHub
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              LinkedIn
            </a>
            <Link to="/portfolio" className="about-link">
              Portfolio
            </Link>
            <Link to="/contact" className="about-link">
              Contact
            </Link>
            {resume_url && (
              <a
                href={resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="about-link about-link-resume"
              >
                Resume
              </a>
            )}
          </div>

          <div className="about-cta">
            <Link to="/contact" className="about-cta-link">
              Let&apos;s connect →
            </Link>
          </div>
        </div>
    </section>
  );
};

export default About;
