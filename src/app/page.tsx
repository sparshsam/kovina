import ThemeToggle from "@/components/ThemeToggle";
import { projects, projectStatus, statusLabel } from "@/lib/projects";
import type { Project } from "@/lib/projects";

/* ── 6 title layout variations, cycling ── */

const titleLayouts = [
  { titlePos: "items-start text-left",         descAlign: "" },
  { titlePos: "items-center text-center",      descAlign: "mx-auto" },
  { titlePos: "items-end text-right",          descAlign: "ml-auto" },
];

/* ── Helpers ── */

function hasIcon(slug: string) {
  return !["elora-vault", "shesafe", "sparsh-sam", "world-clock-widget"].includes(slug);
}

function StatusBadge({ p }: { p: Project }) {
  const st = projectStatus(p);
  const live = st === "live";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${
        live ? "bg-accent/15 text-accent" : "bg-text-muted/10 text-text-muted"
      }`}
    >
      {statusLabel(st)}
    </span>
  );
}

function ProjectTitle({ p }: { p: Project }) {
  return (
    <a
      href={`/apps/${p.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-text-primary transition-colors"
    >
      <span className="transition-colors group-hover/section:text-accent">{p.name}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="size-5 -translate-y-1 opacity-0 transition-all group-hover/section:translate-y-0 group-hover/section:opacity-80 group-hover/section:text-accent"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
      </svg>
    </a>
  );
}

function GitHubLink({ p }: { p: Project }) {
  return (
    <a
      href={`https://github.com/sparshsam/${p.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-accent"
    >
      GitHub
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12" height="12" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="size-3"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </a>
  );
}

function ProjectSection({ p, i }: { p: Project; i: number }) {
  const layout = titleLayouts[i % titleLayouts.length];
  const hi = hasIcon(p.slug);

  return (
    <section
      className="group/section flex min-h-screen flex-col justify-center border-b border-border-default px-6 py-16 transition-transform duration-300 hover:scale-[1.005] sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
        {/* ── App image or placeholder ── */}
        {hi ? (
          <a
            href={`/apps/${p.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <img
              src={`/app-icons/${p.slug}.png`}
              alt={`${p.name} screenshot`}
              className="w-full rounded-2xl object-cover shadow-2xl"
              style={{ maxHeight: "60vh" }}
            />
          </a>
        ) : (
          <a
            href={`/apps/${p.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-2xl bg-bg-surface-muted px-8 py-24 transition-colors hover:bg-bg-surface sm:py-32"
          >
            <p className="text-center text-4xl font-black leading-[0.9] tracking-tight text-text-muted sm:text-6xl">
              {p.name}
            </p>
          </a>
        )}

        {/* ── Text block ── */}
        <div className={`flex w-full flex-col gap-3 sm:gap-4 ${layout.titlePos}`}>
          <p
            className={`text-4xl font-black leading-[0.9] tracking-tight text-text-primary font-symbols sm:text-6xl lg:text-7xl ${
              layout.titlePos.includes("text-right")
                ? "text-right"
                : layout.titlePos.includes("text-center")
                  ? "text-center"
                  : "text-left"
            }`}
          >
            <ProjectTitle p={p} />
          </p>

          <div
            className={`flex gap-2 ${
              layout.titlePos.includes("text-right")
                ? "justify-end"
                : layout.titlePos.includes("text-center")
                  ? "justify-center"
                  : ""
            }`}
          >
            <StatusBadge p={p} />
          </div>

          <p
            className={`max-w-lg text-sm leading-relaxed text-text-secondary transition-colors group-hover/section:text-accent sm:text-base ${layout.descAlign}`}
          >
            {p.desc}
          </p>

          <div
            className={
              layout.titlePos.includes("text-right")
                ? "flex justify-end"
                : layout.titlePos.includes("text-center")
                  ? "flex justify-center"
                  : ""
            }
          >
            <GitHubLink p={p} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main page ── */

export default function Home() {
  return (
    <>
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md">
        <div className="relative flex items-center justify-center px-6 py-3 sm:px-10">
          <div className="flex w-full max-w-6xl items-center justify-between">
            <a href="#" className="text-sm font-bold tracking-widest uppercase text-text-primary">
              Kovina
            </a>
            <nav className="flex items-center gap-1 sm:gap-2">
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
          <div className="absolute right-4 top-1/2 -translate-y-1/2 sm:right-6">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-40">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="select-none text-[clamp(4rem,15vw,10rem)] font-black leading-[0.85] tracking-[-0.03em] text-text-primary">
              KOVINA
            </h1>
            <div className="mt-6 sm:mt-8">
              <p className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
                Personal software.
                <br />
                Forged to last.
              </p>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                A collection of open-source tools built for ownership, permanence,
                and everyday use.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
              >
                View Projects
              </a>
              <a
                href="https://github.com/sparshsam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full bg-bg-surface-muted px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Editorial Statement ── */}
        <section className="px-6 py-28 sm:px-10 sm:py-40">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mx-auto max-w-2xl text-xl font-bold leading-relaxed text-text-primary sm:text-2xl sm:leading-relaxed">
              Most software is rented.{" "}
              <span className="text-accent">Kovina</span> tools are built to be owned,
              understood, and kept.
            </p>
          </div>
        </section>

        {/* ── Projects — App Icons Exhibition ── */}
        <section id="projects" className="border-t border-border-default">
          {projects.map((p, i) => (
            <ProjectSection key={p.slug} p={p} i={i} />
          ))}
        </section>

        {/* ── Data Strip ── */}
        <section className="border-y border-border-default">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-bold tracking-wider uppercase text-text-muted sm:px-10 sm:py-5">
            <span>Open Source</span>
            <span>Built by Sparsh Sam</span>
            <span>Toronto, Canada</span>
          </div>
        </section>

        {/* ── Footer ── */}
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
