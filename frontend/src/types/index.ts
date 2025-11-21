export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  demoVideo?: string | null;
  image?: string;
  status?: string;
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
  month?: number; // 1-12 for positioning within the year
}

export interface TimelineItem {
  season?: string;
  year: number;
  entries: TimelineEntry[];
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  github: string;
  linkedin: string;
  projects: Project[];
  skills: Skills;
  timeline?: TimelineItem[];
}

