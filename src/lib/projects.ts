export type Project = {
  slug: string;
  name: string;
  desc: string;
  /** Microsoft Store / download link (for live desktop apps) */
  storeUrl?: string;
  /** App website / landing page */
  website?: string;
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
    case "desktop": return "Live";
  }
}

export const projects: Project[] = [
  // ── Live ──
  { slug: "openreader",        name: "OpenReader",        desc: "Native PDF reader for Windows.",                  website: "https://reader.kovina.org",               repo: "openreader",          underDev: false, isDesktop: true  },
  { slug: "opensnap",          name: "OpenSnap",          desc: "Screenshot and OCR widget for Windows.",           storeUrl: "https://apps.microsoft.com/detail/9NV4G1F09L41", website: "https://snap.kovina.org", repo: "opensnap", underDev: false, isDesktop: true  },
  { slug: "opensend",          name: "OpenSend",          desc: "Free, open-source file sharing.",                 website: "https://send.kovina.org",                 repo: "opensend",            underDev: false, isDesktop: false },
  { slug: "hisstastic",        name: "Hisstastic",        desc: "Casual snake game.",                              website: "https://hisstastic.vercel.app",            repo: "hisstastic",          underDev: false, isDesktop: false },
  { slug: "wordwise",          name: "WordWise",          desc: "Language and vocabulary tool.",                   website: "https://wordwisehiccups.vercel.app",       repo: "wordwise",            underDev: false, isDesktop: false },

  // ── In Development ──
  { slug: "openledger",        name: "OpenLedger",        desc: "Personal finance and net worth tracking.",         website: "https://ledger.kovina.org",                repo: "openledger",          underDev: true,  isDesktop: false },
  { slug: "openpalette",       name: "OpenPalette",       desc: "Color and palette utility.",                      website: "https://palette.kovina.org",               repo: "openpalette",         underDev: true,  isDesktop: false },
  { slug: "opentone",          name: "OpenTone",          desc: "Desktop music player.",                           website: "https://tone.kovina.org",                  repo: "opentone",            underDev: true,  isDesktop: false },
  { slug: "opensprout",        name: "OpenSprout",        desc: "Plant care and gardening companion.",             website: "https://sprout.kovina.org",                repo: "opensprout",          underDev: true,  isDesktop: false },
  { slug: "openjournal",       name: "OpenJournal",       desc: "Personal journaling and reflection.",              website: "https://journal.kovina.org",               repo: "openjournal",         underDev: true,  isDesktop: false },
  { slug: "openproof",         name: "OpenProof",         desc: "Proof of existence and verification.",             website: "https://proof.kovina.org",                 repo: "openproof",           underDev: true,  isDesktop: false },
  { slug: "openconvert",       name: "OpenConvert",       desc: "Privacy-first file conversion tools.",             website: "https://convert.kovina.org",               repo: "openconvert",         underDev: true,  isDesktop: false },
  { slug: "openscrabble",      name: "OpenScrabble",      desc: "Two-player word game.",                           website: "https://scrabble.kovina.org",              repo: "openscrabble",        underDev: true,  isDesktop: false },
  { slug: "chess-by-sparsh",   name: "Chess by Sparsh",   desc: "Interactive chess with computer opponent.",        website: "https://chess-by-sparsh.vercel.app",       repo: "chess-by-sparsh",     underDev: true,  isDesktop: false },
  { slug: "world-clock-widget",name: "World Clock Widget",desc: "Desktop world clock utility.",                    /* no website yet */                                  repo: "world-clock-widget",  underDev: true,  isDesktop: false },
  { slug: "shesafe",           name: "SheSafe",           desc: "Community safety mapping.",                       website: "https://isshesafe.vercel.app",             repo: "shesafe",             underDev: true,  isDesktop: false },
  { slug: "elora-vault",       name: "Elora Vault",       desc: "Onchain capital infrastructure.",                  website: "https://vault.kovina.org",                 repo: "elora-vault",         underDev: true,  isDesktop: false },
  { slug: "sparsh-sam",        name: "Sparsh Sam",        desc: "Personal site and portfolio.",                    website: "https://sparshsam.github.io",              repo: "sparshsam.github.io", underDev: false, isDesktop: false },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
