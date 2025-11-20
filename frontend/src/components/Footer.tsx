import React from 'react';
import './Footer.css';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} {name}. All rights reserved.</p>
      <p className="footer-subtitle">Built with React, TypeScript, Flask, and Python</p>
    </footer>
  );
};

export default Footer;

