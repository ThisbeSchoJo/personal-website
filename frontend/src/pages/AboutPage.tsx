import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import { PortfolioData } from "../types";

interface AboutPageProps {
  portfolioData: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const AboutPage: React.FC<AboutPageProps> = ({
  portfolioData,
  loading,
  error,
}) => {
  if (loading && !portfolioData) {
    return null;
  }

  if (!portfolioData || error) {
    return null;
  }

  return (
    <>
      <About portfolioData={portfolioData} />
      <Footer name={portfolioData.name} />
    </>
  );
};

export default AboutPage;
