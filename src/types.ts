export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: 'AI / Machine Learning' | 'Web Application' | 'EdTech / Concept';
  technologies: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
  highlight?: string;
  imageFallbackGradient: string;
}

export interface Skill {
  name: string;
  category: 'Frontend & 3D' | 'Backend & AI/ML' | 'Tools & Databases' | 'Core Competencies';
  level: number; // Percentage 0 - 100
  iconName: string;
  description: string;
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Work' | 'Education';
  location: string;
  responsibilities: string[];
  badge?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  badgeUrl?: string;
  details: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  avatarText: string;
}

export type IllusionMode = 'quantum' | 'matrix' | 'cyberpunk' | 'gold';

export interface SoundSetting {
  enabled: boolean;
}
