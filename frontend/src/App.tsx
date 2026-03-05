import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./styles/App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ResumePage from "./pages/ResumePage";
import ContactPage from "./pages/ContactPage";
import BooksPage from "./pages/BooksPage";
import { PortfolioData } from "./types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`, {
          timeout: 10000, // 10s – avoid hanging if backend is down or slow
        });
        setPortfolioData(response.data);
      } catch (err) {
        setError("Failed to load portfolio data");
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Always render app shell (Router + Header + Routes) so nav works even when API fails or is slow.
  // Other browsers/networks may block or fail the portfolio request (e.g. ad blockers, backend down).
  const displayName = portfolioData?.name ?? "Portfolio";
  const displayTitle = portfolioData?.title ?? "—";
  const showGlobalError = !loading && (error || !portfolioData);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header name={displayName} title={displayTitle} />
          <main>
            {loading && !portfolioData && (
              <div className="loading-container loading-in-main">
                <div className="spinner"></div>
                <p>Loading portfolio...</p>
              </div>
            )}
            {showGlobalError && (
              <div className="error-container error-in-main">
                <p>{error || "Portfolio data not available"}</p>
                <p className="error-hint">
                  Check your connection or try again. Use the nav above to
                  browse.
                </p>
              </div>
            )}
            {/* Routes always mount so nav links work; hide content during initial load to avoid double spinner */}
            <div
              className="main-content"
              style={
                loading && !portfolioData
                  ? { visibility: "hidden", position: "absolute" }
                  : undefined
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <AboutPage
                      portfolioData={portfolioData}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <ProjectsPage
                      portfolioData={portfolioData}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <ProjectsPage
                      portfolioData={portfolioData}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/resume"
                  element={
                    <ResumePage
                      portfolioData={portfolioData}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ContactPage
                      portfolioData={portfolioData}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/books"
                  element={
                    <BooksPage
                      goodreadsUserId={portfolioData?.goodreads_user_id}
                      portfolioName={portfolioData?.name}
                    />
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
