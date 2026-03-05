import React from "react";
import "../styles/Resume.css";
import { Skills as SkillsType } from "../types";

export interface ExperienceEntry {
  role: string;
  company: string;
  location?: string;
  dates: string;
  description?: string;
  bullets?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location?: string;
  dates: string;
  details?: string;
}

interface ResumeProps {
  name?: string;
  summary?: string;
  experience?: ExperienceEntry[];
  education?: EducationEntry[];
  skills?: SkillsType;
}

const Resume: React.FC<ResumeProps> = ({
  name,
  summary,
  experience = [],
  education = [],
  skills,
}) => {
  return (
    <section className="section resume-section">
      <div className="section-content resume-content">
        <h1 className="section-title resume-title">Resume</h1>

        {name && <p className="resume-name">{name}</p>}
        {summary && <p className="resume-summary">{summary}</p>}

        {experience.length > 0 && (
          <div className="resume-block">
            <h2 className="resume-block-title">Experience</h2>
            {experience.map((entry, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-header">
                  <span className="resume-entry-role">{entry.role}</span>
                  <span className="resume-entry-dates">{entry.dates}</span>
                </div>
                <p className="resume-entry-company">
                  {entry.company}
                  {entry.location && ` · ${entry.location}`}
                </p>
                {entry.description && (
                  <p className="resume-entry-description">{entry.description}</p>
                )}
                {entry.bullets && entry.bullets.length > 0 && (
                  <ul className="resume-entry-bullets">
                    {entry.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="resume-block">
            <h2 className="resume-block-title">Education</h2>
            {education.map((entry, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-header">
                  <span className="resume-entry-role">{entry.degree}</span>
                  {entry.dates && (
                    <span className="resume-entry-dates">{entry.dates}</span>
                  )}
                </div>
                <p className="resume-entry-company">
                  {entry.institution}
                  {entry.location && ` · ${entry.location}`}
                </p>
                {entry.details && (
                  <p className="resume-entry-description">{entry.details}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {skills && (
          <div className="resume-block">
            <h2 className="resume-block-title">Skills</h2>
            <div className="resume-skills-grid">
              <div className="resume-skill-category">
                <h3 className="resume-skill-category-title">Frontend</h3>
                <div className="resume-skill-tags">
                  {skills.frontend.map((skill, i) => (
                    <span key={i} className="resume-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="resume-skill-category">
                <h3 className="resume-skill-category-title">Backend</h3>
                <div className="resume-skill-tags">
                  {skills.backend.map((skill, i) => (
                    <span key={i} className="resume-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="resume-skill-category">
                <h3 className="resume-skill-category-title">Tools & Technologies</h3>
                <div className="resume-skill-tags">
                  {skills.tools.map((skill, i) => (
                    <span key={i} className="resume-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {skills.design && skills.design.length > 0 && (
                <div className="resume-skill-category">
                  <h3 className="resume-skill-category-title">Design</h3>
                  <div className="resume-skill-tags">
                    {skills.design.map((skill, i) => (
                      <span key={i} className="resume-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {experience.length === 0 && education.length === 0 && !skills && (
          <p className="resume-placeholder">
            Resume content will go here. Add your experience and education when
            you’re ready.
          </p>
        )}
      </div>
    </section>
  );
};

export default Resume;
