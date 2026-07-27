import { Hero } from "@/components/portfolio/Hero";
import {
  AwardsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/portfolio/sections";
import {
  getFeaturedProjects,
  getHeroExperience,
  loadResumeData,
} from "@/lib/profile";

export default function Page() {
  const resumeData = loadResumeData();
  const { contact, education, experience, projects, skills, awards } = resumeData;
  const featuredProjects = getFeaturedProjects(resumeData);
  const featuredProjectNames = new Set(featuredProjects.map((project) => project.name));
  const orderedProjects = [
    ...featuredProjects,
    ...projects.filter((project) => !featuredProjectNames.has(project.name)),
  ];
  const heroExperience = getHeroExperience(experience);
  const heroHeadline =
    resumeData.homepage?.headline ??
    "Building reliable systems across investing, data, and developer workflows.";
  const heroSummary =
    resumeData.homepage?.summary ??
    (heroExperience
      ? `${heroExperience.role} experience at ${heroExperience.company}, paired with ${education.degree} from ${education.institution}. Comfortable moving between quantitative research, backend systems, and automation.`
      : `${education.degree} from ${education.institution}. Comfortable moving between quantitative research, backend systems, and automation.`);
  const configuredHighlights =
    resumeData.homepage?.highlights?.map((highlight) => highlight.trim()).filter(Boolean) ?? [];
  const award = awards[0];
  const awardSummary = award
    ? `${award.link ? `${award.text} ${award.link.label}` : award.text}${award.suffix ? ` ${award.suffix}` : ""}`.trim()
    : "";
  const heroHighlights =
    configuredHighlights.length > 0
      ? configuredHighlights.slice(0, 3)
      : [
          `${education.degree} @ ${education.institution}`,
          awardSummary,
          skills.programmingLanguages.slice(0, 3).join(" · "),
        ].filter(Boolean);

  return (
    <div className="min-h-screen text-[var(--portfolio-text)]">
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        <Hero
          contact={contact}
          headline={heroHeadline}
          summary={heroSummary}
          highlights={heroHighlights}
          heroExperience={heroExperience}
          featuredProjects={featuredProjects}
        />

        <div className="mt-20 space-y-16 lg:mt-24 lg:space-y-20">
          <ExperienceSection experience={experience} />
          <ProjectsSection
            projects={orderedProjects}
            featuredProjectNames={featuredProjectNames}
            githubProfileUrl={contact.github.url}
          />
          <SkillsSection skills={skills} />
          <EducationSection education={education} />
          <AwardsSection awards={awards} />
        </div>
      </main>
    </div>
  );
}
