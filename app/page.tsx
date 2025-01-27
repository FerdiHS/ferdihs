import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans leading-relaxed min-h-screen m-0 p-0">
      <header className="header">
        <h1 className="header-title">Ferdinand Halim Santoso</h1>
        <p className="mt-3">
          <a
            href="https://linkedin.com/in/ferdihs"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link"
          >
            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} className="fill-[#0077b5] mr-2" />
            linkedin.com/in/ferdihs
          </a>
          <br />
          <a
            href="https://github.com/FerdiHS"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link header-link-margin"
          >
            <Image src="/github.svg" alt="GitHub" width={24} height={24} className="mr-2" />
            github.com/FerdiHS
          </a>
        </p>
      </header>

      <main className="main-container">
        <section id="education" className="mb-8">
          <h2 className="section-title">
            Education
          </h2>
          <div className="flex-container">
            <div className="flex-item-left">
              <h3 className="text-base font-semibold mb-1">
                National University of Singapore
              </h3>
              <p>B.Comp in Computer Science</p>
              <p className="mt-2">Relevant courses:</p>
              <ul className="list-default">
                <li>Software Engineering</li>
                <li>Operating Systems</li>
                <li>Database</li>
                <li>Parallel Computing</li>
                <li>Machine Learning</li>
                <li>Artifical Intelligence</li>
              </ul>
            </div>
            <div className="flex-item-right">
              Aug 2022 – May 2026
            </div>
          </div>
        </section>

        <section id="experience" className="mb-8">
          <h2 className="section-title">
            Working Experience
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">
                  GIC | Software Engineer Intern
                </h3>
                <ul className="list-default">
                  <li>
                    Designed and implemented a distributed database query system
                    for 200+ consumers.
                  </li>
                  <li>
                    Developed an asynchronous application using FastAPI with a
                    custom request queuing mechanism.
                  </li>
                  <li>
                    Built Tableau Workbook Auto Deployment process with GitHub
                    Actions for 500+ users.
                  </li>
                  <li>
                    Automated database configuration updates with GitHub Action
                    workflows.
                  </li>
                  <li>
                    Created Tableau Web Data Connector for advanced data
                    analysis and reporting.
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                May 2024 – Jan 2025
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">
                  PINUS | Co-Director of Tech Division
                </h3>
                <ul className="list-default">
                  <li>
                    Led a team to build &quot;PINUS STUDY,&quot; a forum for 100+
                    Indonesian NUS students.
                  </li>
                  <li>
                    Organized 3 workshops on Web Development, GitHub, and SQL
                    for 30+ participants.
                  </li>
                  <li>Guided juniors in developing a link shortener project.</li>
                </ul>
              </div>
              <div className="flex-item-right">
                Aug 2023 – Jul 2024
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">
                  NUS | Grader and Proctor
                </h3>
                <ul className="list-default">
                  <li>
                    Graded 150+ assignments and exams for CS1010E, ensuring
                    accuracy and consistency.
                  </li>
                  <li>
                    Proctored exams for 100+ students, maintaining academic
                    integrity.
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                Aug 2023 – Dec 2023
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">
                  Tongdun Technology | Software Engineering Intern
                </h3>
                <ul className="list-default">
                  <li>
                    Collaborated on data cleansing and feature engineering for
                    predictive models.
                  </li>
                  <li>
                    Assisted in developing credit scoring and risk management
                    models.
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                June 2022
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">
                  Central Java Education Department | Mathematics Olympiad
                  Trainer
                </h3>
                <ul className="list-default">
                  <li>
                    Trained the Central Java Math Olympiad Team, achieving 2
                    silver and 2 bronze medals.
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                Oct – Nov 2021
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mb-8">
          <h2 className="section-title">
            Projects
          </h2>
          <div className="space-y-6">
            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">PINUS STUDY</h3>
                <p className="mt-1">
                  TypeScript, HTML/CSS, Go, React, NUSMODS API
                </p>
                <ul className="list-default">
                  <li>
                    Led a team to build a forum for Indonesian NUS undergrads,
                    with 100+ users collaborating on coursework.
                  </li>
                  <li>
                    Optimized database performance with advanced SQL procedures,
                    reducing query time by more than 50%.
                  </li>
                  <li>
                    Designed and built backend features such as email
                    verification, bookmarking, and password recovery.
                  </li>
                  <li>
                    Created a custom automation script for DB initialization,
                    reducing setup time significantly.
                  </li>
                  <li>
                    Website:{" "}
                    <a
                      href="https://www.pinusstudy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      www.pinusstudy.com
                    </a>{" "}
                    | GitHub:{" "}
                    <a
                      href="https://github.com/pinus-tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      github.com/pinus-tech
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                Dec 2023 – Jul 2024
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-item-left">
                <h3 className="text-base font-semibold mb-1">Footycouch</h3>
                <p className="mt-1">
                  JavaScript, HTML/CSS, NodeJS, React, ExpressJS, FPL API
                </p>
                <ul className="list-default">
                  <li>
                    Co-developed a fantasy football platform with social media
                    features.
                  </li>
                  <li>
                    Deployed a backend using NodeJS/ExpressJS with a MySQL DB.
                  </li>
                  <li>
                    Integrated the FPL API, automating real-time data updates
                    for a seamless UX.
                  </li>
                  <li>
                    GitHub:{" "}
                    <a
                      href="https://github.com/FerdiHS/footycouch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      github.com/FerdiHS/footycouch
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-item-right">
                May – Aug 2023
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mb-8">
          <h2 className="section-title">
            Skills
          </h2>
          <p className="mt-2">
            <strong>Programming Languages:</strong> C++, Java, JavaScript,
            TypeScript, SQL, Python, Go, HTML, CSS
          </p>
          <p className="mt-1">
            <strong>Frameworks:</strong> React, NodeJS, ExpressJS, JUnit, Docker,
            GitHub Actions
          </p>
        </section>

        <section id="awards" className="mb-8">
          <h2 className="section-title">
            Awards & Achievements
          </h2>
          <ul className="list-default space-y-1">
            <li>
              Rated 1746 in{" "}
              <a
                href="https://codeforces.com/profile/FerdiHS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Codeforces
              </a>{" "}
              (Top 4% in Indonesia)
            </li>
            <li>Silver Medal in Indonesia National Science Olympiad (Math, 2020)</li>
            <li>Bronze Medal in Asian-Pacific Mathematical Olympiad (Mar 2020)</li>
            <li>Bronze Medal in Iranian Geometry Olympiad (Sep 2019)</li>
            <li>Silver Medal in Indonesia National Science Olympiad (Math, 2019)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
