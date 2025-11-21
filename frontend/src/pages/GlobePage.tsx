import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobeComponent from '../components/Globe';
import { PortfolioData } from '../types';
import './GlobePage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const GlobePage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`);
        setPortfolioData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error fetching portfolio data:', err);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading || !portfolioData) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <>
      <section className="section globe-section">
        <div className="section-content">
          <div className="globe-wrapper">
            <GlobeComponent size="large" />
          </div>
        </div>
      </section>
    </>
  );
};

export default GlobePage;

