import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { PortfolioData, TimelineItem } from "../types";
import "./TimelinePage.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

interface TimelineEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  year: number;
  month?: number; // 1-12 for positioning within the year
  isNew: boolean;
}

const TimelinePage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`);
        setPortfolioData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching portfolio data:", err);
      }
    };

    fetchPortfolioData();
  }, []);

  const { timelineEvents, yearRange } = useMemo(() => {
    if (!portfolioData?.timeline)
      return { timelineEvents: [], yearRange: { start: 2018, end: 2026 } };

    const events: TimelineEvent[] = [];

    // Flatten timeline entries
    portfolioData.timeline.forEach((item: TimelineItem) => {
      item.entries.forEach((entry) => {
        events.push({
          id: entry.id,
          category: entry.category,
          title: entry.title,
          description: entry.description,
          year: item.year,
          month: entry.month, // Use month if provided, otherwise default to mid-year (6)
          isNew: entry.isNew || false,
        });
      });
    });

    // Find year range - extend to 2026
    const years = events.map((e) => e.year);
    const yearRange = {
      start: Math.min(...years),
      end: Math.max(2026, Math.max(...years, new Date().getFullYear())),
    };

    // Sort by year, newest first
    const sortedEvents = events.sort((a, b) => b.year - a.year);

    return { timelineEvents: sortedEvents, yearRange };
  }, [portfolioData]);

  const calculatePosition = (year: number, month?: number): number => {
    if (yearRange.end === yearRange.start) return 50;

    // Calculate position within the year (0-1, where 0 is start of year, 1 is end of year)
    const monthPosition = month ? (month - 1) / 12 : 0.5; // Default to mid-year (month 6)

    // Calculate base position for the year
    // Give 2025 (last year) more vertical space - allocate 50% more space to it
    const totalYears = yearRange.end - yearRange.start + 1;
    const yearIndex = year - yearRange.start;

    let yearStart, yearEnd;
    if (year === yearRange.end) {
      // Last year (2025) gets 50% more space for multiple events
      // Allocate space: other years get normal space, last year gets 1.5x
      const normalYearPercent = 100 / (totalYears - 1 + 1.5);
      yearStart = (totalYears - 1) * normalYearPercent;
      yearEnd = 100;
    } else {
      // Other years share space evenly
      const normalYearPercent = 100 / (totalYears - 1 + 1.5);
      yearStart = yearIndex * normalYearPercent;
      yearEnd = (yearIndex + 1) * normalYearPercent;
    }

    const yearRangePercent = yearEnd - yearStart;

    // Position within the year range
    return yearStart + monthPosition * yearRangePercent;
  };

  const toggleEntry = (entryId: string) => {
    setExpandedEntries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(entryId)) {
        newSet.delete(entryId);
      } else {
        newSet.add(entryId);
      }
      return newSet;
    });
  };

  // Generate year markers (oldest to newest for display - 2018 at top, 2025 at bottom)
  const yearMarkers = useMemo(() => {
    const markers = [];
    for (let year = yearRange.start; year <= yearRange.end; year++) {
      markers.push(year);
    }
    return markers;
  }, [yearRange]);

  // Group events by year
  const eventsByYear = useMemo(() => {
    const grouped: { [year: number]: TimelineEvent[] } = {};
    timelineEvents.forEach((event) => {
      if (!grouped[event.year]) {
        grouped[event.year] = [];
      }
      grouped[event.year].push(event);
    });
    return grouped;
  }, [timelineEvents]);

  if (loading || !portfolioData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <section className="section timeline-section">
        <div className="section-content">
          <h2 className="section-title">Timeline</h2>
          <p className="timeline-intro">
            Here's what I've been up to. Click on any entry to see details.
          </p>
          <div className="timeline-wrapper">
            <div className="timeline-scale">
              {yearMarkers.map((year, index) => {
                // Position year marker at the start of the year (use same calculation as events)
                const totalYears = yearRange.end - yearRange.start + 1;
                const yearIndex = year - yearRange.start;
                const normalYearPercent = 100 / (totalYears - 1 + 1.5);
                const yearStartPosition =
                  year === yearRange.end
                    ? (totalYears - 1) * normalYearPercent
                    : yearIndex * normalYearPercent;

                const yearEvents = eventsByYear[year] || [];

                // Sort events by month if provided, otherwise maintain order
                const sortedYearEvents = [...yearEvents].sort((a, b) => {
                  if (a.month && b.month) return a.month - b.month;
                  if (a.month) return -1;
                  if (b.month) return 1;
                  return 0;
                });

                return (
                  <div key={year}>
                    <div
                      className="timeline-year-marker"
                      style={{
                        top: `${yearStartPosition}%`,
                      }}
                    >
                      <div className="timeline-year-tick"></div>
                      <span className="timeline-year-label">{year}</span>
                    </div>
                    {sortedYearEvents.map((event, eventIndex) => {
                      const isExpanded = expandedEntries.has(event.id);

                      // Calculate the year's range on the timeline
                      const totalYears = yearRange.end - yearRange.start + 1;
                      const normalYearPercent = 100 / (totalYears - 1 + 1.5);
                      const yearStart =
                        event.year === yearRange.end
                          ? (totalYears - 1) * normalYearPercent
                          : (event.year - yearRange.start) * normalYearPercent;
                      const yearEnd =
                        event.year === yearRange.end
                          ? 100
                          : (event.year - yearRange.start + 1) *
                            normalYearPercent;
                      const yearRangePercent = yearEnd - yearStart;

                      // Calculate position: evenly space events within the year
                      // Divide the year by number of events, place each in the middle of its segment
                      const numEvents = sortedYearEvents.length;
                      // Position at (i + 0.5) / N - this places events evenly spaced
                      // For 1 event: 0.5 (middle)
                      // For 2 events: 0.25, 0.75
                      // For 3 events: 0.167, 0.5, 0.833
                      const positionWithinYear = (eventIndex + 0.5) / numEvents;
                      const eventPosition =
                        yearStart + positionWithinYear * yearRangePercent;

                      return (
                        <div
                          key={event.id}
                          className={`timeline-event-on-scale ${
                            !event.isNew ? "greyed-out" : ""
                          } ${isExpanded ? "expanded" : ""}`}
                          style={{
                            top: `${eventPosition}%`,
                          }}
                        >
                          <div className="timeline-event-bullet"></div>
                          <div className="timeline-event-popup">
                            <div
                              className="timeline-entry"
                              onClick={() => toggleEntry(event.id)}
                            >
                              <div className="timeline-entry-header">
                                <div className="timeline-entry-left">
                                  <span className="timeline-category-badge">
                                    {event.category}
                                  </span>
                                  <h3 className="timeline-entry-title">
                                    {event.title}
                                  </h3>
                                </div>
                                <span className="timeline-expand-icon">
                                  {isExpanded ? "−" : "+"}
                                </span>
                              </div>
                              {isExpanded && (
                                <div className="timeline-entry-details">
                                  <p className="timeline-entry-description">
                                    {event.description}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div className="timeline-vertical-line"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer name={portfolioData.name} />
    </>
  );
};

export default TimelinePage;
