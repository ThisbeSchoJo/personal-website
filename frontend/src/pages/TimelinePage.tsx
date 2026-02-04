import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { PortfolioData, TimelineItem } from "../types";
import "../styles/TimelinePage.css";

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
    null,
  );
  const [loading, setLoading] = useState(true);
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set(),
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
              {yearMarkers
                .slice()
                .reverse()
                .map((year, index) => {
                  // Position year marker at the start of the year
                  // If it's the last year (2026), position at top (0%) without extra space
                  let yearStartPosition;
                  if (year === yearRange.end) {
                    // Last year (2026) is just a marker at the top
                    yearStartPosition = 0;
                  } else {
                    // Calculate position for other years, reversing so 2018 is at bottom
                    const totalYears = yearRange.end - yearRange.start;
                    const yearIndex = year - yearRange.start;
                    const yearPercent = 100 / totalYears;
                    yearStartPosition = yearIndex * yearPercent;
                    // Invert position: 100% becomes 0%, 0% becomes 100%
                    yearStartPosition = 100 - yearStartPosition;
                  }

                  const yearEvents = eventsByYear[year] || [];

                  // Sort events by month if provided, otherwise maintain order
                  // Reverse so most recent events appear at top when timeline is inverted
                  const sortedYearEvents = [...yearEvents].sort((a, b) => {
                    if (a.month && b.month) return b.month - a.month; // Reverse: newer months first
                    if (a.month) return 1;
                    if (b.month) return -1;
                    return 0;
                  });

                  // Calculate the year's range on the timeline
                  let yearStart: number, yearEnd: number;
                  if (year === yearRange.end) {
                    // Last year (2026) - shouldn't have events, but handle it anyway
                    yearStart = 0;
                    yearEnd = 0;
                  } else {
                    const totalYears = yearRange.end - yearRange.start;
                    const yearPercent = 100 / totalYears;
                    yearStart = (year - yearRange.start) * yearPercent;
                    yearEnd = (year - yearRange.start + 1) * yearPercent;

                    // Invert positions: 100% becomes 0%, 0% becomes 100%
                    const invertedYearStart = 100 - yearEnd;
                    const invertedYearEnd = 100 - yearStart;
                    yearStart = invertedYearStart;
                    yearEnd = invertedYearEnd;
                  }

                  const yearRangePercent = yearEnd - yearStart;

                  // Stack all events starting below the year marker, with even spacing
                  // Higher month values (more recent) appear first, descending order
                  const numEvents = sortedYearEvents.length;
                  // Start entries below the year marker (offset of ~8% of year range)
                  const startOffset = 0.08;
                  // Spacing between entries (reduced)
                  const spacing =
                    numEvents > 1 ? Math.min(0.17, 0.9 / numEvents) : 0;
                  const adjustedPositions: number[] = sortedYearEvents.map(
                    (_, index) => {
                      // Start below year marker and stack downward
                      return startOffset + index * spacing;
                    },
                  );

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
                        const positionWithinYear =
                          adjustedPositions[eventIndex];
                        const eventPosition =
                          yearStart + positionWithinYear * yearRangePercent;

                        return (
                          <div
                            key={event.id}
                            className={`timeline-event-on-scale greyed-out ${
                              isExpanded ? "expanded" : ""
                            }`}
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
                              </div>
                              {isExpanded && (
                                <>
                                  <div className="timeline-connector-line"></div>
                                  <div className="timeline-entry-details">
                                    <p className="timeline-entry-description">
                                      {event.description}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              <div
                className="timeline-vertical-line"
                style={{
                  top: `0%`, // Start at top since 2026 is at 0%
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <Footer name={portfolioData.name} />
    </>
  );
};

export default TimelinePage;
