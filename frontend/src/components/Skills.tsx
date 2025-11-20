import React from 'react';
import './Skills.css';
import { Skills as SkillsType } from '../types';

interface SkillsProps {
  skills: SkillsType;
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section className="section skills-section">
      <div className="section-content">
        <h2 className="section-title">Skills</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3 className="skill-category-title">Frontend</h3>
            <div className="skill-tags">
              {skills.frontend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Backend</h3>
            <div className="skill-tags">
              {skills.backend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skill-category">
            <h3 className="skill-category-title">Tools & Technologies</h3>
            <div className="skill-tags">
              {skills.tools.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

