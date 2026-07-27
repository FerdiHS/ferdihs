import { ArrowUpRightIcon } from "@/components/portfolio/icons";
import type { Link } from "@/lib/profile";

type SectionHeadingProps = {
  index: string;
  title: string;
  action?: Link;
};

export function SectionHeading({ index, title, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-5 portfolio-divider sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="portfolio-mono text-sm text-[var(--portfolio-accent)]">{index}.</span>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--portfolio-text)]">{title}</h2>
      </div>

      {action ? (
        <a
          href={action.url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-mono inline-flex items-center gap-2 text-sm text-[var(--portfolio-accent)] transition hover:text-white"
        >
          {action.label}
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  );
}
