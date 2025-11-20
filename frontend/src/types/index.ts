export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  image?: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface TimelineEntry {
  id: string;
  category: string;
  title: string;
  description: string;
  details?: string[];
  isNew?: boolean;
}

export interface TimelineItem {
  season: string;
  year: number;
  entries: TimelineEntry[];
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  projects: Project[];
  skills: Skills;
  timeline?: TimelineItem[];
}

