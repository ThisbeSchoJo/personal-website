import React from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { PortfolioData } from "../types";

interface ContactPageProps {
  portfolioData: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const ContactPage: React.FC<ContactPageProps> = ({
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

