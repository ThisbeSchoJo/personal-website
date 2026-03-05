import React from "react";
import Resume, {
  type ExperienceEntry,
  type EducationEntry,
} from "../components/Resume";
import Footer from "../components/Footer";
import { PortfolioData } from "../types";

const RESUME_EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Junior Software Engineer (Part-Time)",
    company: "LocusAI GmbH",
    location: "Remote",
    dates: "December 2025 – Present",
    bullets: [
      "Building a Next.js + TypeScript project tracker frontend, designing application architecture, routing, and a shared UI component system (Tailwind, shadcn/ui, Radix) supporting project access, progress tracking, and document management",
      "Developing a reliable notification system for a financial platform, focusing on fault-tolerant event handling, user action workflows, and time-sensitive alerts under tight delivery timelines in collaboration with senior engineers",
    ],
  },
  {
    role: "Intern - Web Development",
    company: "TechElevate",
    location: "Remote",
    dates: "May 2025 – November 2025",
    bullets: [
      "Developed responsive React components and backend integrations supporting nonprofit fundraising platforms",
      "Collaborated in Agile sprints and code reviews to ship reliable features and maintain clean architecture",
    ],
  },
  {
    role: "Web Developer",
    company: "Freelance - Non-Profit Clients",
    location: "Remote",
    dates: "May 2025 – November 2025",
    bullets: [
      "Built custom community features and performance-optimized interfaces using HTML, CSS, and JavaScript",
      "Improved site structure, performance, and engagement through collaboration with organizational leadership",
    ],
  },
];

const RESUME_EDUCATION: EducationEntry[] = [
  {
    degree: "Certificate in Full Stack Web Development",
    institution: "Flatiron School",
    location: "New York, NY",
    dates: "",
  },
  {
    degree: "Master of Science in Biotechnology",
    institution: "Georgetown University",
    location: "Washington, D.C.",
    dates: "",
  },
  {
    degree: "Master of Science in Psychology",
    institution: "University of Westminster",
    location: "London, England",
    dates: "",
  },
  {
    degree: "Bachelor of Science in Biology, Minor in Chemistry",
    institution: "Wake Forest University",
    location: "Winston-Salem, NC",
    dates: "",
  },
];

interface ResumePageProps {
  portfolioData: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const ResumePage: React.FC<ResumePageProps> = ({
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
      <Resume
        name={portfolioData.name}
        experience={RESUME_EXPERIENCE}
        education={RESUME_EDUCATION}
        skills={portfolioData.skills}
      />
      <Footer name={portfolioData.name} />
    </>
  );
};

export default ResumePage;
