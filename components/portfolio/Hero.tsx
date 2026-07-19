import {
  BriefcaseIcon,
  ChevronRightIcon,
  CodeIcon,
  GitHubIcon,
  LinkedInIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/portfolio/icons";
import type { Contact, Experience, Project } from "@/lib/profile";

type HeroProps = {
  contact: Contact;
  headline: string;
  summary: string;
  highlights: string[];
  heroExperience?: Experience;
  featuredProjects: Project[];
};

const splitName = (fullName: string) => {
  const [firstName, ...rest] = fullName.split(" ");

  return {
    firstName,
    remainingName: rest.join(" "),
  };
};

const toProjectHref = (project: Project) =>
  project.links?.[0]?.url ?? `#${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function Hero({
  contact,
  headline,
  summary,
  highlights,
  heroExperience,
  featuredProjects,
}: HeroProps) {
  const { firstName, remainingName } = splitName(contact.name);
  const experienceLabel = heroExperience?.current ? "CURRENT ROLE" : "LATEST ROLE";

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
      <div className="max-w-2xl pt-4 lg:pt-16">
        <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.04em] text-white sm:text-7xl lg:text-[5.5rem]">
          <span className="block">{firstName}</span>
          {remainingName ? (
            <span className="mt-3 block text-[var(--portfolio-accent)]">{remainingName}</span>
          ) : null}
        </h1>

        <p className="mt-10 max-w-xl text-2xl font-medium leading-snug text-white sm:text-[2rem]">
          {headline}
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--portfolio-muted)]">{summary}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.linkedin.label}
            title={contact.linkedin.label}
            className="portfolio-mono inline-flex items-center gap-3 rounded-xl border px-5 py-4 text-sm text-white transition hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)] portfolio-divider"
          >
            <LinkedInIcon className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.github.label}
            title={contact.github.label}
            className="portfolio-mono inline-flex items-center gap-3 rounded-xl border px-5 py-4 text-sm text-white transition hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)] portfolio-divider"
          >
            <GitHubIcon className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="#projects"
            className="portfolio-mono inline-flex items-center gap-3 rounded-xl border px-5 py-4 text-sm text-white transition hover:border-[var(--portfolio-accent)] hover:text-[var(--portfolio-accent)] portfolio-divider"
          >
            <CodeIcon className="h-5 w-5" />
            View Projects
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {heroExperience ? (
          <article className="portfolio-surface rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4 border-b pb-5 portfolio-divider">
              <span className="portfolio-mono text-sm text-[var(--portfolio-accent)]">
                {experienceLabel}
              </span>
              <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">
                {heroExperience.current ? "/experience/current" : "/experience/latest"}
              </span>
            </div>

            <div className="mt-6 flex gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface-strong)] text-[var(--portfolio-accent)]">
                <BriefcaseIcon className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <p className="text-3xl font-medium leading-tight text-white">{heroExperience.role}</p>
                <p className="mt-1 text-xl text-[var(--portfolio-accent)]">{heroExperience.company}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {heroExperience.bullets.slice(0, 2).map((bullet) => (
                <li key={bullet} className="flex gap-3 text-base leading-7 text-[var(--portfolio-muted)]">
                  <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--portfolio-accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <article className="portfolio-surface rounded-3xl p-6">
          <div className="flex items-center justify-between gap-4 border-b pb-5 portfolio-divider">
            <span className="portfolio-mono text-sm text-[var(--portfolio-accent)]">SELECTED PROJECTS</span>
            <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">/projects</span>
          </div>

          <div className="mt-4 space-y-2">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={toProjectHref(project)}
                target={project.links?.[0] ? "_blank" : undefined}
                rel={project.links?.[0] ? "noopener noreferrer" : undefined}
                className="group grid gap-4 rounded-2xl border border-transparent px-1 py-4 transition hover:border-[var(--portfolio-border-strong)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface-strong)] text-[var(--portfolio-accent)]">
                    <CodeIcon className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-2xl font-medium leading-tight text-white">{project.name}</p>
                        <p className="mt-2 portfolio-mono text-sm text-[var(--portfolio-accent)]">
                          {project.stack}
                        </p>
                      </div>
                      <ChevronRightIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[var(--portfolio-accent)] transition group-hover:translate-x-1" />
                    </div>
                    <p className="mt-3 text-base leading-7 text-[var(--portfolio-muted)]">
                      {project.bullets[0]}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </article>

        <article className="portfolio-surface rounded-3xl p-6">
          <div className="flex items-center justify-between gap-4 border-b pb-5 portfolio-divider">
            <span className="portfolio-mono text-sm text-[var(--portfolio-accent)]">CREDIBILITY</span>
            <span className="portfolio-mono text-xs text-[var(--portfolio-muted)]">/about</span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {highlights.slice(0, 3).map((highlight, index) => {
              const Icon = [CodeIcon, ShieldIcon, UsersIcon][index] ?? CodeIcon;

              return (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--portfolio-border-strong)] bg-[var(--portfolio-surface-strong)] px-4 py-4"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-[var(--portfolio-accent)]" />
                  <span className="text-sm leading-6 text-white">{highlight}</span>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
