import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { PortfolioData } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const ContactPage: React.FC = () => {
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
      <Contact 
        email={portfolioData.email}
        github={portfolioData.github}
        linkedin={portfolioData.linkedin}
      />
      <Footer name={portfolioData.name} />
    </>
  );
};

export default ContactPage;

