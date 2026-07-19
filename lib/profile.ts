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
};

export type Project = {
  name: string;
  stack: string;
  start?: string;
  end?: string;
  bullets: string[];
  links?: Link[];
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
  highlights?: string[];
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

export const formatPeriod = (start?: string, end?: string) => {
  if (!start && !end) return "";
  if (!start) return end ?? "";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
};

export const getCurrentExperience = (experience: Experience[]) => experience[0];

export const getFeaturedProjects = (data: ResumeData) => {
  const configuredProjects =
    data.homepage?.featuredProjects?.map((name) => name.trim()).filter(Boolean) ?? [];

  if (configuredProjects.length === 0) {
    return data.projects.slice(0, 2);
  }

  const byName = new Map(data.projects.map((project) => [project.name, project]));

  const matchedProjects = configuredProjects
    .map((name) => byName.get(name))
    .filter((project): project is Project => Boolean(project))
    .slice(0, 2);

  return matchedProjects.length > 0 ? matchedProjects : data.projects.slice(0, 2);
};

const formatAwardSummary = (award?: Award) => {
  if (!award) return "";

  const baseText = award.link ? `${award.text} ${award.link.label}` : award.text;
  const suffix = award.suffix ? ` ${award.suffix}` : "";

  return `${baseText}${suffix}`.trim();
};

export const getHeroHighlights = (data: ResumeData) => {
  const configuredHighlights =
    data.homepage?.highlights?.map((highlight) => highlight.trim()).filter(Boolean) ?? [];

  if (configuredHighlights.length > 0) {
    return configuredHighlights.slice(0, 3);
  }

  return [
    `${data.education.degree} @ ${data.education.institution}`,
    formatAwardSummary(data.awards[0]),
    data.skills.programmingLanguages.slice(0, 3).join(" · "),
  ].filter(Boolean);
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

export const getHeroCopy = (data: ResumeData) => {
  const latestRole = getCurrentExperience(data.experience);

  return {
    headline:
      data.homepage?.headline ??
      "Building reliable systems across investing, data, and developer workflows.",
    summary:
      data.homepage?.summary ??
      `${latestRole.role} experience at ${latestRole.company}, paired with ${data.education.degree} from ${data.education.institution}. Comfortable moving between quantitative research, backend systems, and automation.`,
  };
};
