import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../styles/Header.css";

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Pages where hero section should be hidden (all pages use same top spacing for section titles)
  const pagesWithoutHero = [
    "/",
    "/about",
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
        <Link to="/" className="header-left" onClick={closeMenu}>
          <div className="header-avatar">
            <div className="avatar-circle">{name.charAt(0).toUpperCase()}</div>
          </div>
          <span className="header-name">
            {name.split(" ")[0]} {name.split(" ")[1]?.charAt(0)}.
          </span>
        </Link>
        <div
          className={`header-nav-wrapper ${menuOpen ? "header-nav-wrapper-open" : ""}`}
        >
          <button
            type="button"
            className="header-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="header-menu-icon" aria-hidden>
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
          <div className="header-mobile-theme" aria-hidden="true">
            <ThemeToggle />
          </div>
          <nav className={`header-nav ${menuOpen ? "header-nav-open" : ""}`}>
            <Link
              to="/about"
              className={`nav-link ${
                location.pathname === "/" || location.pathname === "/about"
                  ? "active"
                  : ""
              }`}
              onClick={closeMenu}
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
              onClick={closeMenu}
            >
              portfolio
            </Link>
            <Link
              to="/skills"
              className={`nav-link ${
                location.pathname === "/skills" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              skills
            </Link>
            <Link
              to="/timeline"
              className={`nav-link ${
                location.pathname === "/timeline" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              timeline
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${
                location.pathname === "/contact" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              contact
            </Link>
            <Link
              to="/globe"
              className={`nav-link ${
                location.pathname === "/globe" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              globe
            </Link>
            <Link
              to="/ideas"
              className={`nav-link ${
                location.pathname === "/ideas" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              ideas
            </Link>
            <Link
              to="/books"
              className={`nav-link ${
                location.pathname === "/books" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              books
            </Link>
            <ThemeToggle />
          </nav>
        </div>
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
