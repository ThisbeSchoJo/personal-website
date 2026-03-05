import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Projects.css";
import { Project } from "../types";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [active, setActive] = useState<Project | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="section projects-section">
      <div className="section-content">
        <h2 className="section-title">Portfolio</h2>
        <p className="projects-intro">
          Please enjoy this selection of current and past projects, which
          together reflect my ongoing learning journey—from simple frontend
          applications to fully deployed, production-ready full-stack apps, with
          a focus on clean architecture, usability, and real-world constraints.
        </p>

        <div className="projects-grid expandable-grid">
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="expandable-overlay"
                style={{ background: "rgba(0,0,0,0.5)" }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active ? (
              <div className="expandable-card-wrapper">
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="expandable-card-content"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="expandable-close"
                    aria-label="Close"
                    style={{
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <div className="expandable-card-inner">
                    {active.image && (
                      <div className="expandable-card-image-wrap">
                        <img
                          src={active.image}
                          alt={`${active.title} screenshot`}
                          className="expandable-card-image"
                        />
                        {active.status === "In Progress" && (
                          <span className="project-badge project-badge-wip">
                            WIP
                          </span>
                        )}
                      </div>
                    )}
                    <div className="expandable-card-body">
                      <h3 className="expandable-card-title">{active.title}</h3>
                      <p className="expandable-card-description">
                        {active.description}
                      </p>
                      <p className="expandable-card-tech">
                        Technologies:{" "}
                        {active.technologies.map((tech, i) => (
                          <React.Fragment key={i}>
                            <strong>{tech}</strong>
                            {i < active.technologies.length - 1 ? ", " : "."}
                          </React.Fragment>
                        ))}
                      </p>
                      <div className="expandable-card-links">
                        <a
                          href={active.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          GitHub
                        </a>
                        {active.demoVideo && (
                          <a
                            href={active.demoVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link project-link-demo"
                          >
                            Demo
                          </a>
                        )}
                        {active.demo && (
                          <a
                            href={active.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link project-link-demo"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              onClick={() => setActive(project)}
              className="project-card expandable-trigger"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
