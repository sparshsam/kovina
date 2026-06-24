import ThemeToggle from "@/components/ThemeToggle";

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
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-2 text-xs font-semibold text-text-secondary transition-colors hover:bg-bg-surface-muted hover:text-text-primary sm:px-4"
            >
              GitHub
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero — directly on canvas, no container ── */}
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
                target="_blank"
                rel="noopener noreferrer"
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

        {/* ── Projects ── */}
        <section
          id="projects"
          className="border-t border-border-default px-6 py-20 sm:px-10 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="divide-y divide-border-default">
              {projects.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6 sm:py-6"
                >
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    {p.url && !p.underDev ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-bold text-text-primary hover:text-accent transition-colors sm:text-lg"
                      >
                        {p.name}
                      </a>
                    ) : (
                      <span className="text-base font-bold text-text-primary sm:text-lg">
                        {p.name}
                      </span>
                    )}
                    <a
                      href={`https://github.com/sparshsam/${p.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-bg-surface-muted px-3 py-1 text-[11px] font-semibold text-text-muted transition-colors hover:text-text-primary hover:bg-[#252525] whitespace-nowrap"
                    >
                      GitHub
                    </a>
                  </div>
                  <span className="text-sm leading-snug text-text-secondary sm:text-base">
                    {p.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Data Strip — border-to-border ── */}
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
              <p className="text-sm font-bold tracking-widest uppercase text-text-primary">
                Kovina
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Forged tools for everyday life.
              </p>
            </div>
            <nav className="flex gap-6">
              <a
                href="https://github.com/sparshsam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                GitHub
              </a>
              <a
                href="/privacy"
                className="text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                Terms
              </a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
