import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import TimelinePage from './pages/TimelinePage';
import ContactPage from './pages/ContactPage';
import GlobePage from './pages/GlobePage';
import { PortfolioData } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`);
        setPortfolioData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load portfolio data');
        setLoading(false);
        console.error('Error fetching portfolio data:', err);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="error-container">
        <p>{error || 'Portfolio data not available'}</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header name={portfolioData.name} title={portfolioData.title} />
          <main>
            <Routes>
              <Route path="/" element={<AboutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/globe" element={<GlobePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

