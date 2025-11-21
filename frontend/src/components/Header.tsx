import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const location = useLocation();
  const isGlobePage = location.pathname === "/globe";

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-left">
          <div className="header-avatar">
            <div className="avatar-circle">{name.charAt(0).toUpperCase()}</div>
          </div>
          <span className="header-name">
            {name.split(" ")[0]} {name.split(" ")[1]?.charAt(0)}.
          </span>
        </Link>
        <nav className="header-nav">
          <Link
            to="/about"
            className={`nav-link ${
              location.pathname === "/" || location.pathname === "/about"
                ? "active"
                : ""
            }`}
          >
            about
          </Link>
          <Link
            to="/projects"
            className={`nav-link ${
              location.pathname === "/projects" ? "active" : ""
            }`}
          >
            projects
          </Link>
          <Link
            to="/skills"
            className={`nav-link ${
              location.pathname === "/skills" ? "active" : ""
            }`}
          >
            skills
          </Link>
          <Link
            to="/timeline"
            className={`nav-link ${
              location.pathname === "/timeline" ? "active" : ""
            }`}
          >
            timeline
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            contact
          </Link>
          <Link
            to="/globe"
            className={`nav-link ${
              location.pathname === "/globe" ? "active" : ""
            }`}
          >
            globe
          </Link>
          <ThemeToggle />
        </nav>
      </div>
      {!isGlobePage && (
        <div className="hero-section">
          <h1 className="hero-title">{title}</h1>
        </div>
      )}
    </header>
  );
};

export default Header;
