import fs from "fs";
import path from "path";

export type Link = {
  label: string;
  url: string;
};

export type Contact = {
  name: string;
  linkedin: Link;
  github: Link;
};

export type Education = {
  institution: string;
  degree: string;
  relevantCourses: string[];
  start?: string;
  end?: string;
};

export type Experience = {
  company: string;
  role: string;
  start?: string;
  end?: string;
  bullets: string[];
  current?: boolean;
};

export type Project = {
  name: string;
  stack: string;
  start?: string;
  end?: string;
  bullets: string[];
  links?: Link[];
  current?: boolean;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Skills = {
  programmingLanguages: string[];
  frameworks: string[];
  groups?: SkillGroup[];
};

export type Award = {
  text: string;
  link?: Link;
  location?: string;
  time?: string;
  suffix?: string;
};

export type HomepageConfig = {
  headline?: string;
  summary?: string;
  featuredProjects?: string[];
};

export type ResumeData = {
  contact: Contact;
  education: Education;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  awards: Award[];
  homepage?: HomepageConfig;
};

export const loadResumeData = (): ResumeData => {
  const filePath = path.join(process.cwd(), "public", "profile.json");
  const jsonContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonContent) as ResumeData;
};

export const formatPeriod = (start?: string, end?: string, current = false) => {
  if (!start && !end) return "";
  if (current && start) return `${start} – now`;
  if (current) return "now";
  if (!start) return end ?? "";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
};

export const getHeroExperience = (experience: Experience[]) =>
  experience.find((item) => item.current) ?? experience[0];

export const getFeaturedProjects = (data: ResumeData) => {
  const configuredProjects =
    data.homepage?.featuredProjects?.map((name) => name.trim()).filter(Boolean) ?? [];

  if (configuredProjects.length === 0) {
    return data.projects.slice(0, 2);
  }

  const byName = new Map(data.projects.map((project) => [project.name, project]));
  const featuredProjects: Project[] = [];
  const featuredProjectNames = new Set<string>();

  for (const projectName of configuredProjects) {
    const project = byName.get(projectName);

    if (!project) {
      throw new Error(`Unknown featured project: ${projectName}`);
    }

    if (featuredProjectNames.has(project.name)) {
      continue;
    }

    featuredProjects.push(project);
    featuredProjectNames.add(project.name);

    if (featuredProjects.length === 2) {
      break;
    }
  }

  return featuredProjects;
};

const sanitizeSkillGroup = (group: SkillGroup): SkillGroup | null => {
  const label = group.label.trim();
  const items = group.items.map((item) => item.trim()).filter(Boolean);

  if (!label || items.length === 0) {
    return null;
  }

  return { label, items };
};

export const getSkillGroups = (skills: Skills) => {
  const configuredGroups =
    skills.groups
      ?.map(sanitizeSkillGroup)
      .filter((group): group is SkillGroup => Boolean(group)) ?? [];

  if (configuredGroups.length > 0) {
    return configuredGroups;
  }

  return [
    {
      label: "Programming Languages",
      items: skills.programmingLanguages,
    },
    {
      label: "Frameworks & Tooling",
      items: skills.frameworks,
    },
  ]
    .map(sanitizeSkillGroup)
    .filter((group): group is SkillGroup => Boolean(group));
};
