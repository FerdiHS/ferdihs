import fs from "fs";
import Image from "next/image";
import path from "path";

type Link = {
  label: string;
  url: string;
};

type Contact = {
  name: string;
  linkedin: Link;
  github: Link;
};

type Education = {
  institution: string;
  degree: string;
  relevantCourses: string[];
  start?: string;
  end?: string;
};

type Experience = {
  company: string;
  role: string;
  start?: string;
  end?: string;
  bullets: string[];
};

type Project = {
  name: string;
  stack: string;
  start?: string;
  end?: string;
  bullets: string[];
  links?: Link[];
};

type Skills = {
  programmingLanguages: string[];
  frameworks: string[];
};

type Award = {
  text: string;
  link?: Link;
  location?: string;
  time?: string;
  suffix?: string;
};

type ResumeData = {
  contact: Contact;
  education: Education;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  awards: Award[];
};

const loadResumeData = (): ResumeData => {
  const filePath = path.join(process.cwd(), "public", "profile.json");
  const jsonContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonContent) as ResumeData;
};

const formatPeriod = (start?: string, end?: string) => {
  if (!start && !end) return "";
  if (!start) return end ?? "";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
};

export default function Page() {
  const { contact, education, experience, projects, skills, awards } = loadResumeData();
  return (
    <div className="bg-gray-100 text-gray-900 font-sans leading-relaxed min-h-screen m-0 p-0">
      <header className="header">
      <h1 className="header-title">{contact.name}</h1>
        <p className="mt-3">
          <a
            href={contact.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            <Image src="linkedin.svg" alt="LinkedIn" width={24} height={24} className="fill-[#0077b5] mr-2" />
            {contact.linkedin.label}
          </a>
          <br />
          <a
            href={contact.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="header-link header-link-margin"
          >
            <Image src="github.svg" alt="GitHub" width={24} height={24} className="mr-2" />
            {contact.github.label}
          </a>
        </p>
      </header>

      <main className="main-container">
        <section id="education" className="mb-8">
          <h2 className="section-title">Education</h2>
          <div className="flex-container">
            <div className="flex-item-left">
            <h3 className="text-base font-semibold mb-1">{education.institution}</h3>
              <p>{education.degree}</p>
              <p className="mt-2">Relevant courses:</p>
              <ul className="list-default">
                {education.relevantCourses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
            <div className="flex-item-right">{formatPeriod(education.start, education.end)}</div>
          </div>
        </section>

        <section id="experience" className="mb-8">
        <h2 className="section-title">Working Experience</h2>
        <div className="space-y-6">
        {experience.map((role) => (
              <div className="flex justify-between" key={role.company}>
                <div className="flex-item-left">
                  <h3 className="text-base font-semibold mb-1">
                    {role.company} | {role.role}
                  </h3>
                  <ul className="list-default">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-item-right">{formatPeriod(role.start, role.end)}</div>
              </div>
          ))}
        </div>
        </section>

        <section id="projects" className="mb-8">
        <h2 className="section-title">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div className="flex justify-between" key={project.name}>
                <div className="flex-item-left">
                  <h3 className="text-base font-semibold mb-1">{project.name}</h3>
                  <p className="mt-1">{project.stack}</p>
                  <ul className="list-default">
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                    {project.links ? (
                      <li>
                        {project.links.map((link, index) => (
                          <span key={`${project.name}-${link.label}`}>
                            {index > 0 ? " | " : ""}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {link.label}
                            </a>
                          </span>
                        ))}
                      </li>
                    ) : null}
                  </ul>
                </div>
                <div className="flex-item-right">{formatPeriod(project.start, project.end)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="mb-8">
          <h2 className="section-title">Skills</h2>
          <p className="mt-2">
            <strong>Programming Languages:</strong> {skills.programmingLanguages.join(", ")}
          </p>
          <p className="mt-1">
            <strong>Frameworks:</strong> {skills.frameworks.join(", ")}
          </p>
        </section>

        <section id="awards" className="mb-8">
        <h2 className="section-title">Awards &amp; Achievements</h2>
          <ul className="list-default space-y-1">
          {awards.map((award, index) => (
              <li
                key={`${award.text}-${index}`}
                className="flex justify-between gap-4"
              >
                <div className="flex-1">
                  <span>{award.text}</span>
                  {award.link ? (
                    <a
                      href={award.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline ml-1"
                    >
                      {award.link.label}
                    </a>
                  ) : null}
                  {award.suffix ? <span className="ml-1">{award.suffix}</span> : null}
                </div>
                {(award.location || award.time) && (
                  <div className="flex-shrink-0 text-right text-gray-600 italic">
                    {award.location}
                    {award.location && award.time ? ", " : ""}
                    {award.time}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
