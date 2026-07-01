export type Project = {
  slug: string;
  name: string;
  desc: string;
  url?: string;
  repo: string;
  underDev: boolean;
  isDesktop: boolean;
};

export type ProjectStatus = "live" | "dev" | "desktop";

export function projectStatus(p: Project): ProjectStatus {
  if (p.isDesktop) return "desktop";
  return p.underDev ? "dev" : "live";
}

export function statusLabel(s: ProjectStatus): string {
  switch (s) {
    case "live": return "Live";
    case "dev": return "Dev";
    case "desktop": return "Desktop";
  }
}

export const projects: Project[] = [
  // ── Live ──
  { slug: "openreader",        name: "OpenReader",        desc: "Native PDF reader for Windows.",                  /* Microsoft Store / desktop distribution */        repo: "openreader",          underDev: false, isDesktop: true  },
  { slug: "opensnap",          name: "OpenSnap",          desc: "Screenshot and OCR widget for Windows.",           url: "https://snap.kovina.org",                   repo: "opensnap",            underDev: false, isDesktop: true  },
  { slug: "opensend",          name: "OpenSend",          desc: "Free, open-source file sharing.",                 url: "https://github.com/sparshsam/opensend",     repo: "opensend",            underDev: false, isDesktop: false },
  { slug: "hisstastic",        name: "Hisstastic",        desc: "Casual snake game.",                              url: "https://hisstastic.vercel.app",             repo: "hisstastic",          underDev: false, isDesktop: false },
  { slug: "wordwise",          name: "WordWise",          desc: "Language and vocabulary tool.",                   url: "https://wordwisehiccups.vercel.app",        repo: "wordwise",            underDev: false, isDesktop: false },

  // ── In Development ──
  { slug: "openledger",        name: "OpenLedger",        desc: "Personal finance and net worth tracking.",         url: "https://openledgerbysparsh.vercel.app",     repo: "openledger",          underDev: true,  isDesktop: false },
  { slug: "openpalette",       name: "OpenPalette",       desc: "Color and palette utility.",                      url: "https://openpalette-delta.vercel.app",      repo: "openpalette",         underDev: true,  isDesktop: false },
  { slug: "opentone",          name: "OpenTone",          desc: "Desktop music player.",                           /* desktop application, no public web app */        repo: "opentone",            underDev: true,  isDesktop: false },
  { slug: "opensprout",        name: "OpenSprout",        desc: "Plant care and gardening companion.",             url: "https://opensprout.vercel.app",             repo: "opensprout",          underDev: true,  isDesktop: false },
  { slug: "openjournal",       name: "OpenJournal",       desc: "Personal journaling and reflection.",              /* not publicly deployed yet */                     repo: "openjournal",         underDev: true,  isDesktop: false },
  { slug: "openproof",         name: "OpenProof",         desc: "Proof of existence and verification.",             url: "https://openproof.vercel.app",              repo: "openproof",           underDev: true,  isDesktop: false },
  { slug: "openconvert",       name: "OpenConvert",       desc: "Privacy-first file conversion tools.",             /* not publicly deployed yet */                     repo: "openconvert",         underDev: true,  isDesktop: false },
  { slug: "openscrabble",      name: "OpenScrabble",      desc: "Two-player word game.",                           url: "https://openscrabble.vercel.app",           repo: "openscrabble",        underDev: true,  isDesktop: false },
  { slug: "chess-by-sparsh",   name: "Chess by Sparsh",   desc: "Interactive chess with computer opponent.",        url: "https://chess-by-sparsh.vercel.app",         repo: "chess-by-sparsh",     underDev: true,  isDesktop: false },
  { slug: "world-clock-widget",name: "World Clock Widget",desc: "Desktop world clock utility.",                    /* desktop application, no public web app */        repo: "world-clock-widget",  underDev: true,  isDesktop: false },
  { slug: "shesafe",           name: "SheSafe",           desc: "Community safety mapping.",                       url: "https://isshesafe.vercel.app",              repo: "shesafe",             underDev: true,  isDesktop: false },
  { slug: "elora-vault",       name: "Elora Vault",       desc: "Onchain capital infrastructure.",                  url: "https://elora-bet-api.vercel.app",          repo: "elora-vault",         underDev: true,  isDesktop: false },
  { slug: "sparsh-sam",        name: "Sparsh Sam",        desc: "Personal site and portfolio.",                    url: "https://sparshsam.github.io",               repo: "sparshsam.github.io", underDev: false, isDesktop: false },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
