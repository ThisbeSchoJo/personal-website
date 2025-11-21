import React from "react";
import "./Projects.css";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="section projects-section">
      <div className="section-content">
        <h2 className="section-title">Portfolio</h2>
        <p className="projects-intro">
          I love planning events, making websites, and working on projects. Here
          you will find a collection of my work across internships, classes,
          personal projects, and extracurriculars.
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.image && (
                <>
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                  </div>
                  {project.status === "In Progress" && (
                    <span className="project-badge project-badge-wip">WIP</span>
                  )}
                </>
              )}
              <div className="project-title-container">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-description">
                {project.description} Technologies used:{" "}
                {project.technologies.map((tech, index) => (
                  <React.Fragment key={index}>
                    <strong>{tech}</strong>
                    {index < project.technologies.length - 1 ? ", " : "."}
                  </React.Fragment>
                ))}
              </p>
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
                {project.demoVideo && (
                  <a
                    href={project.demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-demo"
                  >
                    Demo
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link-demo"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
