import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  name: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ name, title }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-left">
          <div className="header-avatar">
            <div className="avatar-circle">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
          <span className="header-name">{name.split(' ')[0]} {name.split(' ')[1]?.charAt(0)}.</span>
        </Link>
        <nav className="header-nav">
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/' || location.pathname === '/about' ? 'active' : ''}`}
          >
            about
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
          >
            projects
          </Link>
          <Link 
            to="/skills" 
            className={`nav-link ${location.pathname === '/skills' ? 'active' : ''}`}
          >
            skills
          </Link>
          <Link 
            to="/timeline" 
            className={`nav-link ${location.pathname === '/timeline' ? 'active' : ''}`}
          >
            timeline
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            contact
          </Link>
        </nav>
      </div>
      <div className="hero-section">
        <h1 className="hero-title">{title}</h1>
      </div>
    </header>
  );
};

export default Header;

