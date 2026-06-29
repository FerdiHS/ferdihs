import { Hero } from "@/components/portfolio/Hero";
import {
  AwardsSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/portfolio/sections";
import {
  getCurrentExperience,
  getFeaturedProjects,
  getHeroCopy,
  getHeroHighlights,
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
  const heroCopy = getHeroCopy(resumeData);
  const heroHighlights = getHeroHighlights(resumeData);
  const currentExperience = getCurrentExperience(experience);

  return (
    <div className="min-h-screen text-[var(--portfolio-text)]">
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        <Hero
          contact={contact}
          headline={heroCopy.headline}
          summary={heroCopy.summary}
          highlights={heroHighlights}
          currentExperience={currentExperience}
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
