import React from "react";
import "../styles/Projects.css";
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
        Please enjoy this selection of current and past projects, 
        which together reflect my ongoing learning journey—from 
        simple frontend applications to fully deployed, 
        production-ready full-stack apps, with a focus on clean 
        architecture, 
        usability, and real-world constraints.
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.image && (
                <>
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-image"
                      loading="lazy"
                      decoding="async"
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
