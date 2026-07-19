import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  ArrowUpRightIcon,
} from "@/components/portfolio/icons";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import type { Award, Education, Experience, Project, Skills } from "@/lib/profile";
import { formatPeriod, getSkillGroups } from "@/lib/profile";

type ExperienceSectionProps = {
  experience: Experience[];
};

type ProjectsSectionProps = {
  projects: Project[];
  featuredProjectNames: Set<string>;
  githubProfileUrl: string;
};

type SkillsSectionProps = {
  skills: Skills;
};

type EducationSectionProps = {
  education: Education;
};

type AwardsSectionProps = {
  awards: Award[];
};

const projectIcons = [CodeIcon, DatabaseIcon, CloudIcon];

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="space-y-8">
      <SectionHeading index="01" title="Experience" />

      <div className="space-y-2">
        {experience.map((role) => (
          <article key={`${role.company}-${role.role}`} className="grid gap-4 py-7 md:grid-cols-[140px_24px_minmax(0,1fr)]">
            <div className="portfolio-mono text-sm leading-7 text-[var(--portfolio-muted)]">
              {formatPeriod(role.start, role.end)}
            </div>

            <div className="relative hidden md:flex justify-center">
              <span className="absolute inset-y-0 w-px bg-[var(--portfolio-border)]" />
              <span className="relative mt-2 h-3 w-3 rounded-full bg-[var(--portfolio-accent)] shadow-[0_0_0_6px_rgba(74,126,255,0.08)]" />
            </div>

            <div className="border-b pb-7 portfolio-divider">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-2xl font-medium text-white">{role.role}</h3>
                  <p className="text-lg text-[var(--portfolio-accent)]">{role.company}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base leading-7 text-[var(--portfolio-muted)]">
                    <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--portfolio-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection({
  projects,
  featuredProjectNames,
  githubProfileUrl,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="space-y-8">
      <SectionHeading
        index="02"
        title="Selected Projects"
        action={{ label: "view more on GitHub", url: githubProfileUrl }}
      />

      <div className="space-y-2">
        {projects.map((project, index) => {
          const Icon = projectIcons[index % projectIcons.length];
          const isFeatured = featuredProjectNames.has(project.name);

          return (
            <article
              id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              key={project.name}
              className={`grid gap-5 rounded-3xl border px-5 py-6 transition sm:px-7 lg:grid-cols-[64px_minmax(0,1fr)_minmax(200px,0.5fr)] ${
                isFeatured
                  ? "border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface)]"
                  : "border-transparent bg-transparent hover:border-[var(--portfolio-border)] hover:bg-[var(--portfolio-surface-soft)]"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface-strong)] text-[var(--portfolio-accent)]">
                <Icon className="h-8 w-8" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-medium text-white">{project.name}</h3>
                    <p className="mt-1 portfolio-mono text-sm text-[var(--portfolio-accent)]">
                      {project.stack}
                    </p>
                  </div>
                  <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">
                    {formatPeriod(project.start, project.end)}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base leading-7 text-[var(--portfolio-muted)]">
                      <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--portfolio-accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                {project.links?.map((link) => (
                  <a
                    key={`${project.name}-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-mono inline-flex items-center gap-2 text-sm text-[var(--portfolio-accent)] transition hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const skillGroups = getSkillGroups(skills);

  return (
    <section id="skills" className="space-y-8">
      <SectionHeading index="03" title="Skills" />

      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <article
            key={group.label}
            className="portfolio-surface flex h-full flex-col rounded-3xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4 border-b pb-5 portfolio-divider">
              <div>
                <p className="portfolio-mono text-sm text-[var(--portfolio-accent)]">
                  {String(index + 1).padStart(2, "0")}.
                </p>
                <h3 className="mt-2 text-xl font-medium text-white sm:text-2xl">{group.label}</h3>
              </div>
              <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">
                {group.items.length} items
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="portfolio-mono rounded-full border border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface-strong)] px-4 py-2 text-sm text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="space-y-8">
      <SectionHeading index="04" title="Education" />

      <div className="portfolio-surface rounded-3xl p-6 sm:p-8">
        <article className="grid gap-4 md:grid-cols-[140px_24px_minmax(0,1fr)]">
          <div className="portfolio-mono text-sm leading-7 text-[var(--portfolio-muted)]">
            {formatPeriod(education.start, education.end)}
          </div>

          <div className="relative hidden md:flex justify-center">
            <span className="absolute inset-y-0 w-px bg-[var(--portfolio-border)]" />
            <span className="relative mt-2 h-3 w-3 rounded-full bg-[var(--portfolio-accent)] shadow-[0_0_0_6px_rgba(74,126,255,0.08)]" />
          </div>

          <div>
            <h3 className="text-2xl font-medium text-white">{education.degree}</h3>
            <p className="text-lg text-[var(--portfolio-accent)]">{education.institution}</p>
            <p className="mt-5 text-base leading-7 text-[var(--portfolio-muted)]">
              Coursework: {education.relevantCourses.join(", ")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function AwardsSection({ awards }: AwardsSectionProps) {
  return (
    <section id="awards" className="space-y-8">
      <SectionHeading index="05" title="Awards" />

      <div className="space-y-2">
        {awards.map((award, index) => (
          <article
            key={`${award.text}-${index}`}
            className="grid gap-4 py-6 md:grid-cols-[140px_minmax(0,1fr)]"
          >
            <div className="portfolio-mono text-sm leading-7 text-[var(--portfolio-muted)]">
              {award.time ?? "Highlight"}
            </div>

            <div className="border-b pb-6 portfolio-divider">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-xl font-medium text-white">
                    {award.text}
                    {award.link ? (
                      <>
                        {" "}
                        <a
                          href={award.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--portfolio-accent)] transition hover:text-white"
                        >
                          {award.link.label}
                        </a>
                      </>
                    ) : null}
                    {award.suffix ? <span className="text-[var(--portfolio-muted)]"> {award.suffix}</span> : null}
                  </p>
                </div>

                {award.location && (
                  <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">
                    {award.location}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
