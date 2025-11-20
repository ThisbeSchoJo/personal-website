import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { PortfolioData, TimelineItem } from '../types';
import './TimelinePage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const TimelinePage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

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

  const toggleEntry = (entryId: string) => {
    setExpandedEntries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryId)) {
        newSet.delete(entryId);
      } else {
        newSet.add(entryId);
      }
      return newSet;
    });
  };

  if (loading || !portfolioData || !portfolioData.timeline) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  return (
    <>
      <section className="section timeline-section">
        <div className="section-content">
          <h2 className="section-title">Timeline</h2>
          <p className="timeline-intro">
            Here's what I've been up to. Greyed out bullets means that these are not new positions. Click on any box to see details.
          </p>
          <div className="timeline-container">
            {portfolioData.timeline.map((item: TimelineItem) => (
              <div key={`${item.season}-${item.year}`} className="timeline-item">
                <div className="timeline-season">{item.season} {item.year}</div>
                {item.entries.map((entry) => {
                  const isExpanded = expandedEntries.has(entry.id);
                  const isGreyed = !entry.isNew;
                  
                  return (
                    <div key={entry.id} className="timeline-entry-wrapper">
                      <div 
                        className={`timeline-category ${isGreyed ? 'greyed-out' : ''} ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => toggleEntry(entry.id)}
                      >
                        <div className="timeline-category-header">
                          <span className="timeline-category-name">{entry.category}</span>
                          <span className="timeline-category-icon">{isExpanded ? '−' : '+'}</span>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="timeline-entry-details">
                          <h3 className="timeline-entry-title">{entry.title}</h3>
                          <p className="timeline-entry-description">{entry.description}</p>
                          {entry.details && entry.details.length > 0 && (
                            <ul className="timeline-entry-list">
                              {entry.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer name={portfolioData.name} />
    </>
  );
};

export default TimelinePage;

