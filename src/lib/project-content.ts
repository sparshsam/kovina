export type FeatureSection = {
  title: string;
  body: string;
};

export type AppContent = {
  longDesc: string;
  features: FeatureSection[];
};

export const appContent: Record<string, AppContent> = {
  "openproof": {
    longDesc: "Privacy-first proof-of-existence on Base Sepolia. Next.js 16 + Solidity/Foundry. AGPLv3. Live at proof.kovina.org.",
    features: [
      {
        title: "Blockchain Proof Without File Uploads",
        body: "Your files never leave your device. OpenProof hashes files locally using the Web Crypto API (SHA-256) and sends only the resulting bytes32 hash to a minimal Solidity contract on Base Sepolia. The original document stays on your machine. This is proof of existence without exposure — you can timestamp a file's fingerprint onchain without revealing its contents to anyone.",
      },
      {
        title: "Canonical Receipt Specification (v3)",
        body: "Every proof generates a versioned, deterministic JSON receipt with an Ed25519 signature. Receipts are printable and PDF-friendly, with citation formats for APA, MLA, Legal, and Plain text. The specification is an open standard designed for cross-app interoperability — any tool that understands the format can verify any proof.",
      },
      {
        title: "Bundle Proofs with Merkle Tree Verification",
        body: "Prove multiple files at once with deterministic combined hashes via a sorted Merkle tree. Each file gets an individual inclusion proof that can be verified independently. The verification report runs 11+ checks — schema validity, chain state, contract state, onchain consistency, bundle integrity — producing a pass/fail result you can trust.",
      },
      {
        title: "Public Proof Pages with QR Verification",
        body: "Each proof generates a shareable page at /proof/[hash] that reads the public registry state without exposing the original file. QR codes on printed receipts encode the proof page URL — not the file itself. Print or export as PDF for physical records. Anyone can verify without installing software or trusting a third party.",
      },
      {
        title: "PWA and Multi-Platform Packaging",
        body: "OpenProof ships as an installable PWA, a Capacitor Android app, and an MSIX Windows package. Lighthouse 100 scores across performance, accessibility, best practices, and SEO. A full threat model document is maintained in the repository, and v1.0 has a strict feature freeze to prevent scope creep.",
      },
    ],
  },
};
