import { use } from "react";
import { projects, projectBySlug, projectStatus } from "@/lib/projects";
import { appContent } from "@/lib/project-content";

function appLabel(slug: string): string {
  const p = projectBySlug(slug);
  if (!p) return "";
  const st = projectStatus(p);
  if (st === "live" || st === "desktop") return "Live";
  return "Under Construction";
}

function isLive(slug: string): boolean {
  const p = projectBySlug(slug);
  if (!p) return false;
  return projectStatus(p) === "live" || projectStatus(p) === "desktop";
}

function hasIcon(slug: string) {
  return !["elora-vault", "shesafe", "sparsh-sam", "world-clock-widget"].includes(slug);
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projectBySlug(slug);
  if (!project) {
    return <div className="flex min-h-screen items-center justify-center text-text-primary">Project not found</div>;
  }

  const content = appContent[slug];
  const live = isLive(slug);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center px-6 py-3 sm:px-10">
          <div className="flex w-full max-w-6xl items-center justify-between">
            <a href="/" className="text-sm font-bold tracking-widest uppercase text-text-primary">
              Kovina
            </a>
            <nav className="flex items-center gap-1 sm:gap-2">
              <a
                href="/#projects"
                className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-accent hover:text-white sm:px-4"
              >
                All Projects
              </a>
              <a
                href="https://github.com/sparshsam"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-accent hover:text-white sm:px-4"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 pt-28 sm:px-10 sm:pt-40">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {hasIcon(slug) ? (
              <img
                src={`/app-icons/${slug}.png`}
                alt={`${project.name} icon`}
                className="mb-10 h-32 w-32 rounded-2xl object-cover shadow-2xl sm:h-48 sm:w-48"
              />
            ) : (
              <div className="mb-10 flex h-32 w-32 items-center justify-center rounded-2xl bg-bg-surface-muted sm:h-48 sm:w-48">
                <span className="text-4xl font-black text-text-muted sm:text-6xl">
                  {project.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-text-primary font-symbols sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                  live ? "bg-accent/15 text-accent" : "bg-text-muted/10 text-text-muted"
                }`}
              >
                {appLabel(slug)}
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              {content?.longDesc ?? project.desc}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/#projects"
                className="inline-flex min-h-[44px] items-center rounded-full bg-bg-surface-muted px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Back to Projects
              </a>
              {project.url && live && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
                >
                  Visit Site
                </a>
              )}
              <a
                href={`https://github.com/sparshsam/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full bg-bg-surface-muted px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                View Source
              </a>
            </div>
          </div>
        </section>

        {content && content.features.length > 0 && (
          <section className="px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <div className="space-y-10">
                {content.features.map((feature, i) => (
                  <div key={i}>
                    <h2 className="text-lg font-bold leading-snug text-text-primary sm:text-xl">
                      {i + 1}. {feature.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-border-default px-6 py-16 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg font-bold text-text-primary sm:text-xl">
              Part of the Kovina ecosystem
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
              A collection of open-source tools built for ownership, permanence, and everyday use.
            </p>
            <a
              href="/"
              className="mt-8 inline-flex min-h-[44px] items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
            >
              Explore All Projects
            </a>
          </div>
        </section>

        <section className="border-y border-border-default">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-bold tracking-wider uppercase text-text-muted sm:px-10 sm:py-5">
            <span>Open Source</span>
            <span>Built by Sparsh Sam</span>
            <span>Toronto, Canada</span>
          </div>
        </section>

        <footer className="border-t border-border-default px-6 py-12 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-text-primary">Kovina</p>
              <p className="mt-1 text-xs text-text-secondary">Forged tools for everyday life.</p>
            </div>
            <nav className="flex gap-6">
              <a
                href="https://github.com/sparshsam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a href="/privacy" className="text-xs text-text-secondary transition-colors hover:text-accent">
                Privacy
              </a>
              <a href="/terms" className="text-xs text-text-secondary transition-colors hover:text-accent">
                Terms
              </a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
