import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../styles/Header.css";

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const location = useLocation();

  // Pages where hero section should be hidden
  const pagesWithoutHero = [
    "/globe",
    "/contact",
    "/timeline",
    "/skills",
    "/projects",
    "/portfolio",
    "/ideas",
    "/books",
  ];
  const shouldShowHero = !pagesWithoutHero.includes(location.pathname);

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
            to="/portfolio"
            className={`nav-link ${
              location.pathname === "/portfolio" ||
              location.pathname === "/projects"
                ? "active"
                : ""
            }`}
          >
            portfolio
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
          <Link
            to="/ideas"
            className={`nav-link ${
              location.pathname === "/ideas" ? "active" : ""
            }`}
          >
            ideas
          </Link>
          <Link
            to="/books"
            className={`nav-link ${
              location.pathname === "/books" ? "active" : ""
            }`}
          >
            books
          </Link>
          <ThemeToggle />
        </nav>
      </div>
      {shouldShowHero && (
        <div className="hero-section">
          <h1 className="hero-title">{title}</h1>
        </div>
      )}
    </header>
  );
};

export default Header;
