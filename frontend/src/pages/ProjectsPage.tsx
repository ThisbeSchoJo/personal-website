import React from "react";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { PortfolioData } from "../types";

interface ProjectsPageProps {
  portfolioData: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
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
      <Projects projects={portfolioData.projects} />
      <Footer name={portfolioData.name} />
    </>
  );
};

export default ProjectsPage;

