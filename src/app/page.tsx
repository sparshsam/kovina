import ThemeToggle from "@/components/ThemeToggle";

/* ── Abstract decorative imagery ── */

function OrnamentCircle({ size = 40, opacity = 0.15 }: { size?: number; opacity?: number }) {
  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: "var(--color-accent)",
        opacity,
      }}
    />
  );
}

function OrnamentDiamond({ size = 32, opacity = 0.12 }: { size?: number; opacity?: number }) {
  return (
    <div
      className="rounded-sm"
      style={{
        width: size,
        height: size,
        background: "var(--color-accent)",
        opacity,
        transform: "rotate(45deg)",
      }}
    />
  );
}

function OrnamentRule({ width = 80, opacity = 0.2 }: { width?: number; opacity?: number }) {
  return (
    <div
      className="rounded-full"
      style={{
        width,
        height: 2,
        background: "var(--color-accent)",
        opacity,
      }}
    />
  );
}

function OrnamentDots({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 5,
            height: 5,
            background: "var(--color-accent)",
            opacity,
          }}
        />
      ))}
    </div>
  );
}

function OrnamentCross({ size = 28, opacity = 0.1 }: { size?: number; opacity?: number }) {
  const style = {
    background: "var(--color-accent)",
    opacity,
  };
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 rounded-full" style={{ ...style, width: 2 }} />
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 rounded-full" style={{ ...style, height: 2 }} />
    </div>
  );
}

/* ── Project data ── */

type Project = {
  name: string;
  desc: string;
  url?: string;
  repo: string;
  underDev: boolean;
};

const projects: Project[] = [
  { name: "Chess by Sparsh",   desc: "Interactive chess with computer opponent.",        url: "https://chess-by-sparsh.vercel.app",         repo: "chess-by-sparsh",     underDev: true  },
  { name: "Elora Vault",       desc: "Onchain capital infrastructure.",                  url: "https://elora-bet-api.vercel.app",          repo: "elora-vault",         underDev: true  },
  { name: "Hisstastic",        desc: "Casual snake game.",                              url: "https://hisstastic.vercel.app",             repo: "hisstastic",          underDev: false },
  { name: "OpenConvert",       desc: "Privacy-first file conversion tools.",            /* not publicly deployed yet */                     repo: "openconvert",         underDev: true  },
  { name: "OpenJournal",       desc: "Personal journaling and reflection.",             /* not publicly deployed yet */                     repo: "openjournal",         underDev: true  },
  { name: "OpenLedger",        desc: "Personal finance and net worth tracking.",         url: "https://openledgerbysparsh.vercel.app",     repo: "openledger",          underDev: true  },
  { name: "OpenPalette",       desc: "Color and palette utility.",                      url: "https://openpalette-delta.vercel.app",      repo: "openpalette",         underDev: true  },
  { name: "OpenProof",         desc: "Proof of existence and verification.",             url: "https://openproof.vercel.app",              repo: "openproof",           underDev: true  },
  { name: "OpenReader",        desc: "Native PDF reader for Windows.",                  /* Microsoft Store / desktop distribution */        repo: "openreader",          underDev: false },
  { name: "OpenScrabble",      desc: "Two-player word game.",                           url: "https://openscrabble.vercel.app",           repo: "openscrabble",        underDev: true  },
  { name: "OpenSend",          desc: "Free, open-source file sharing.",                 url: "https://github.com/sparshsam/opensend",     repo: "opensend",            underDev: false },
  { name: "OpenSprout",        desc: "Plant care and gardening companion.",             url: "https://opensprout.vercel.app",             repo: "opensprout",          underDev: true  },
  { name: "OpenTone",          desc: "Desktop music player.",                           /* desktop application, no public web app */        repo: "opentone",            underDev: true  },
  { name: "SheSafe",           desc: "Community safety mapping.",                       url: "https://isshesafe.vercel.app",              repo: "shesafe",             underDev: true  },
  { name: "Sparsh Sam",        desc: "Personal site and portfolio.",                    url: "https://sparshsam.github.io",               repo: "sparshsam.github.io", underDev: false },
  { name: "WordWise",          desc: "Language and vocabulary tool.",                   url: "https://wordwisehiccups.vercel.app",        repo: "wordwise",            underDev: false },
  { name: "World Clock Widget",desc: "Desktop world clock utility.",                    /* desktop application, no public web app */        repo: "world-clock-widget",  underDev: true  },
];

/* ── Layout patterns by index ── */
/* Each pattern defines scale, ornament, alignment, vertical rhythm. No two adjacent projects share the same pattern. */

type LayoutPattern = "canvas" | "marginalia" | "spread" | "notice" | "asymmetric";

/* Distribute patterns so no two adjacent are the same */
const patternFor: LayoutPattern[] = [
  "canvas",      // 0  Chess by Sparsh
  "marginalia",  // 1  Elora Vault
  "spread",      // 2  Hisstastic
  "notice",      // 3  OpenConvert
  "asymmetric",  // 4  OpenJournal
  "canvas",      // 5  OpenLedger
  "marginalia",  // 6  OpenPalette
  "spread",      // 7  OpenProof
  "notice",      // 8  OpenReader
  "asymmetric",  // 9  OpenScrabble
  "canvas",      // 10 OpenSend
  "marginalia",  // 11 OpenSprout
  "spread",      // 12 OpenTone
  "notice",      // 13 SheSafe
  "asymmetric",  // 14 Sparsh Sam
  "canvas",      // 15 WordWise
  "marginalia",  // 16 World Clock Widget
];

/* ── Render helpers ── */

function ProjectName({ p }: { p: Project }) {
  if (p.url && !p.underDev) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-primary transition-colors hover:text-accent"
      >
        {p.name}
      </a>
    );
  }
  return <span className="text-text-primary">{p.name}</span>;
}

function GitHubLink({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <a
      href={`https://github.com/sparshsam/${p.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-accent ${className}`}
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

/* ── Main page ── */

export default function Home() {
  return (
    <>
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10">
          <a href="#" className="text-sm font-bold tracking-widest uppercase text-text-primary">
            Kovina
          </a>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#projects"
              className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-bg-surface-muted hover:text-text-primary sm:px-4"
            >
              Projects
            </a>
            <a
              href="https://github.com/sparshsam"
              target="_blank" rel="noopener noreferrer"
              className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-bg-surface-muted hover:text-text-primary sm:px-4"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero — directly on canvas ── */}
        <section className="px-6 pt-28 sm:px-10 sm:pt-40">
          <div className="mx-auto max-w-6xl">
            <h1 className="select-none text-[clamp(4rem,15vw,10rem)] font-black leading-[0.85] tracking-[-0.03em] text-text-primary">
              KOVINA
            </h1>
            <div className="mt-6 sm:mt-8">
              <p className="text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
                Personal software.
                <br />
                Forged to last.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                A collection of open-source tools built for ownership, permanence,
                and everyday use.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-[filter] hover:brightness-110"
              >
                View Projects
              </a>
              <a
                href="https://github.com/sparshsam"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full bg-bg-surface-muted px-7 py-3.5 text-sm font-semibold text-text-primary transition-colors hover:bg-[#252525]"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Editorial Statement ── */}
        <section className="px-6 py-28 sm:px-10 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <p className="max-w-2xl text-xl font-bold leading-relaxed text-text-primary sm:text-2xl sm:leading-relaxed">
              Most software is rented.{" "}
              <span className="text-accent">Kovina</span> tools are built to be
              owned, understood, and kept.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════
             PROJECTS — Editorial Exhibition
             Each project is a unique composition with its
             own scale, ornament, alignment, and whitespace.
             ════════════════════════════════════════════ */}
        <section id="projects" className="border-t border-border-default">
          {projects.map((p, i) => {
            const pattern = patternFor[i];

            // ── Pattern A: Canvas ──
            if (pattern === "canvas") {
              return (
                <div
                  key={p.name}
                  className="border-b border-border-default px-6 py-12 last:border-b-0 sm:px-10 sm:py-16"
                >
                  <div className="mx-auto max-w-6xl">
                    <OrnamentCircle size={i === 0 ? 56 : 40} opacity={0.1} />
                    <div className="mt-6 sm:mt-8">
                      <p className="text-3xl font-black leading-tight tracking-tight sm:text-4xl sm:leading-tight">
                        <ProjectName p={p} />
                      </p>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                        {p.desc}
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <GitHubLink p={p} />
                    </div>
                  </div>
                </div>
              );
            }

            // ── Pattern B: Marginalia ──
            if (pattern === "marginalia") {
              return (
                <div
                  key={p.name}
                  className="border-b border-border-default px-6 py-10 last:border-b-0 sm:px-10 sm:py-14"
                >
                  <div className="mx-auto flex max-w-6xl gap-5 sm:gap-10">
                    <div
                      className="mt-1 hidden w-[2px] shrink-0 self-stretch rounded-full sm:block"
                      style={{ background: "var(--color-accent)", opacity: 0.15 }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                            <ProjectName p={p} />
                          </p>
                          <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
                            {p.desc}
                          </p>
                        </div>
                        <OrnamentDiamond size={24} opacity={0.15} />
                      </div>
                      <div className="mt-4">
                        <GitHubLink p={p} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // ── Pattern C: Spread ──
            if (pattern === "spread") {
              return (
                <div
                  key={p.name}
                  className="border-b border-border-default px-6 py-10 last:border-b-0 sm:px-10 sm:py-14"
                >
                  <div className="mx-auto max-w-6xl">
                    <OrnamentRule width={60} opacity={0.12} />
                    <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-[1fr_1.5fr] sm:gap-10">
                      <p className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                        <ProjectName p={p} />
                      </p>
                      <div>
                        <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                          {p.desc}
                        </p>
                        <div className="mt-3">
                          <GitHubLink p={p} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // ── Pattern D: Notice ──
            if (pattern === "notice") {
              return (
                <div
                  key={p.name}
                  className="border-b border-border-default px-6 py-8 last:border-b-0 sm:px-10 sm:py-10"
                >
                  <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-5">
                    <OrnamentDots opacity={0.12} />
                    <div className="flex-1">
                      <p className="text-lg font-bold leading-tight sm:text-xl">
                        <ProjectName p={p} />
                      </p>
                    </div>
                    <p className="hidden max-w-xs text-right text-sm text-text-secondary sm:block">
                      {p.desc}
                    </p>
                    <GitHubLink p={p} className="shrink-0" />
                  </div>
                </div>
              );
            }

            // ── Pattern E: Asymmetric ──
            if (pattern === "asymmetric") {
              return (
                <div
                  key={p.name}
                  className="border-b border-border-default px-6 py-10 last:border-b-0 sm:px-10 sm:py-14"
                >
                  <div className="mx-auto max-w-6xl">
                    <div className="flex justify-between">
                      <OrnamentCross size={28} opacity={0.1} />
                      <OrnamentCircle size={24} opacity={0.08} />
                    </div>
                    <div className="mt-4 sm:mt-6">
                      <p className="text-right text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                        <ProjectName p={p} />
                      </p>
                      <p className="ml-auto mt-2 max-w-md text-right text-sm leading-relaxed text-text-secondary sm:text-base">
                        {p.desc}
                      </p>
                    </div>
                    <div className="mt-4 text-right">
                      <GitHubLink p={p} />
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </section>

        {/* ── Data Strip ── */}
        <section className="border-t border-b border-border-default">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4 text-xs font-bold tracking-wider uppercase text-text-muted sm:px-10 sm:py-5 sm:text-xs">
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
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                GitHub
              </a>
              <a href="/privacy" className="text-xs text-text-secondary transition-colors hover:text-text-primary">
                Privacy
              </a>
              <a href="/terms" className="text-xs text-text-secondary transition-colors hover:text-text-primary">
                Terms
              </a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
