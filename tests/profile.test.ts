import assert from "node:assert/strict";
import test from "node:test";

import {
  getFeaturedProjects,
  getHeroExperience,
  getHeroHighlights,
  type Experience,
  type Project,
  type ResumeData,
} from "../lib/profile.ts";

const makeProject = (name: string): Project => ({
  name,
  stack: `${name} stack`,
  bullets: [`${name} bullet`],
});

const makeExperience = (company: string, start: string, end?: string, current = false): Experience => ({
  company,
  role: `${company} role`,
  start,
  end,
  current,
  bullets: [`${company} bullet`],
});

const makeResumeData = (overrides: Partial<ResumeData> = {}): ResumeData => ({
  contact: {
    name: "Test User",
    linkedin: { label: "linkedin", url: "https://example.com/linkedin" },
    github: { label: "github", url: "https://example.com/github" },
  },
  education: {
    institution: "National University of Singapore",
    degree: "B.Comp in Computer Science; Second Major in Mathematics",
    relevantCourses: [],
  },
  experience: [],
  projects: [],
  skills: {
    programmingLanguages: ["Go", "TypeScript", "Python"],
    frameworks: [],
  },
  awards: [
    {
      text: "Rated 1808 in",
      link: { label: "Codeforces", url: "https://codeforces.com/profile/FerdiHS" },
      suffix: "(Top 2.5% in Indonesia)",
    },
  ],
  ...overrides,
});

test("getHeroHighlights derives canonical badges", () => {
  const highlights = getHeroHighlights(makeResumeData());

  assert.deepEqual(highlights, [
    "B.Comp in Computer Science; Second Major in Mathematics @ National University of Singapore",
    "Rated 1808 in Codeforces (Top 2.5% in Indonesia)",
    "Go · TypeScript · Python",
  ]);
});

test("getFeaturedProjects validates configured projects and falls back only when empty", () => {
  const projects = [makeProject("Octostate"), makeProject("Artium"), makeProject("Footycouch")];
  const data = makeResumeData({
    projects,
    homepage: { featuredProjects: ["Artium", "Octostate"] },
  });

  assert.deepEqual(
    getFeaturedProjects(data).map((project) => project.name),
    ["Artium", "Octostate"],
  );

  assert.deepEqual(
    getFeaturedProjects(
      makeResumeData({
        projects,
        homepage: { featuredProjects: [] },
      }),
    ).map((project) => project.name),
    ["Octostate", "Artium"],
  );

  assert.throws(
    () =>
      getFeaturedProjects(
        makeResumeData({
          projects,
          homepage: { featuredProjects: ["OctoState"] },
        }),
      ),
    /Unknown featured project: OctoState/,
  );
});

test("getHeroExperience prefers current roles and otherwise keeps array order", () => {
  const older = makeExperience("Older", "Jan 2024", "Mar 2024");
  const newer = makeExperience("Newer", "Apr 2024", "Jun 2024");
  const current = makeExperience("Current", "Jul 2024", undefined, true);

  assert.equal(getHeroExperience([older, newer]), older);
  assert.equal(getHeroExperience([older, current, newer]), current);
});
