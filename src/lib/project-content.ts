export type FeatureSection = {
  title: string;
  body: string;
};

export type AppContent = {
  longDesc: string;
  features: FeatureSection[];
};

export const appContent: Record<string, AppContent> = {
  "openreader": {
    longDesc: 'Privacy-first, local-only PDF utility for Windows. Python/PySide6/PyMuPDF. AGPLv3. Available on the Microsoft Store.',
    features: [
      { title: 'AI Agent Integration via MCP Server', body: 'OpenReader ships with a built-in MCP (Model Context Protocol) server that exposes 14 distinct PDF operations as tools — extract text, search across document libraries, compare documents side by side, and more. This means any AI agent that speaks MCP — Claude, Cursor, or any compatible tool — can reach directly into your local documents without uploading them anywhere. No API keys, no cloud relay, no data leaving your machine. Your documents stay yours.' },
      { title: 'Comprehensive Local-First PDF Toolkit', body: 'Read, search, annotate, merge, split, extract, and compress — every operation runs on-device. The search engine combines SQLite FTS5 for fast keyword lookups with TF-IDF semantic scoring for relevance-ranked results. Annotations include highlights, underlines, strikethroughs, and sticky notes, all stored locally. Whether you&#x27;re reviewing a contract, compiling research, or cleaning up a scanned report, OpenReader gives you a full desktop-grade PDF workstation without ever uploading a file.' },
      { title: 'Multi-Tab Document Management with Session Restore', body: 'Open multiple PDFs in a single window with familiar tab-based navigation (Ctrl+T to open, Ctrl+W to close). OpenReader remembers exactly where you left off — which documents were open and which page you were on — across application restarts. Session restore is automatic, with a manual save option for checkpointing your workspace before closing.' },
      { title: 'OCR Fallback for Scanned Documents', body: 'When Tesseract OCR is available on your system, OpenReader automatically detects scanned or image-based PDF pages and runs optical character recognition on them. This unlocks text selection, copy, search, and annotation on documents that would otherwise be inaccessible — old books, faxed contracts, photographed reports. The OCR runs entirely locally.' },
      { title: 'Microsoft Store Distribution with Security Hardening', body: 'OpenReader is live on the Microsoft Store, with a hardened security posture: it rejects non-PDF files and oversized uploads at the gate, caps render pixel allocation to prevent resource exhaustion, and runs pip-audit and Bandit checks in CI to catch vulnerabilities before they ship. Every release is signed and verified.' },
    ],
  },
  "openpalette": {
    longDesc: 'Local-first color studio in the browser. Next.js 16/Tailwind. MIT.',
    features: [
      { title: 'Full-Featured Color Harmony Engine', body: 'OpenPalette generates palettes from 2 to 10 colors across 7 harmony modes — analogous, monochromatic, complementary, triadic, split complementary, tetradic, and random. Lock individual colors to keep them fixed during regeneration. Hit the spacebar to generate a new palette instantly. Undo support lets you backtrack. Every operation runs in-browser with pure HSL math — no server calls, no latency.' },
      { title: 'Accessibility Validation Suite', body: 'Every palette comes with WCAG AA and AAA contrast validation, scored and displayed per color pair. Three color blindness simulation modes — protanopia, deuteranopia, and tritanopia — show how your palette looks to users with each condition. When a pair fails contrast requirements, OpenPalette suggests accessible replacement colors that preserve the harmony.' },
      { title: 'Multi-Format Export Pipeline', body: 'Export your palette as CSS variables, SCSS variables, Tailwind config, plain JSON, SVG swatches (for design tools), PNG strips (for presentations), or PDF color sheets. Copy individual colors as HEX, RGB, HSL, or Tailwind class snippets. Everything runs client-side — no backend, no uploads.' },
      { title: 'Image Color Extraction', body: 'Upload an image and extract its dominant colors via the browser Canvas API. Two extraction modes — vibrant (saturated, prominent colors) and muted (softer, background tones) — give you different starting points. The image never leaves your device.' },
      { title: 'Shareable URL State', body: 'The entire palette is encoded in the URL, making it trivial to share via a single link. A localStorage-backed collections library supports tagging, search, favorites, history, deduplication, and custom sorting — all without a database or account.' },
    ],
  },
  "opentone": {
    longDesc: 'Offline personal music library and desktop player. Rust/Tauri 2 + React 19.',
    features: [
      { title: 'Offline-First Personal Music Library', body: 'OpenTone is a Tauri v2 desktop application — Rust powers the backend for performance and safety, React handles the frontend for rich interaction. It recursively scans your music folders, extracts metadata via the lofty crate (supporting ID3, Vorbis comments, and MP4 tags), persists everything in SQLite, and caches album artwork. No accounts, no cloud, no telemetry. Your music, your machine.' },
      { title: 'Broad Audio Format Support', body: 'OpenTone indexes MP3, WAV, FLAC, AAC, M4A, OGG, OPUS, WavPack, and AIFF files — artwork extraction, metadata caching, and full display for every format. Whether your library is built from high-resolution FLACs or years-old MP3s, every track gets the same rich treatment.' },
      { title: 'Rich Library Organization', body: 'Browse your library by sortable track columns, an album grid view with artwork, or an artist expandable view. Create, rename, delete, add, and remove tracks from playlists. Mark favorites for quick access. Real-time search reaches across all fields — title, artist, album, genre, year — with results updating as you type.' },
      { title: 'Calm, Privacy-Respecting Design', body: 'OpenTone collects zero data, makes zero network requests, and contains zero third-party SDKs. Keyboard shortcuts (Space for play/pause, J/K for previous/next, / for search) make navigation fluid without a mouse. WCAG AA contrast, reduced motion support, and semantic HTML ensure the app is accessible and comfortable for extended listening sessions.' },
      { title: 'Cross-Platform Desktop Distribution', body: 'Available on Windows (.exe and .msi), Linux (.AppImage and .deb), and macOS (Intel and Apple Silicon .dmg). A store-readiness checklist — privacy policy, terms of service, minimal permission declarations — is maintained alongside the build pipeline.' },
    ],
  },
  "openscrabble": {
    longDesc: 'Local-first two-player Scrabble. TypeScript/Vite. MIT.',
    features: [
      { title: 'Complete Official Scrabble Rules', body: 'OpenScrabble implements the full official ruleset — a 15×15 board with correct premium square placement and multipliers, 100 tiles with official letter distribution (including 2 blanks), first word anchored on the center square, bingo bonus (+50 points for using all 7 tiles), pass and swap mechanics, and automatic game-over detection when all tiles are used or consecutive passes occur.' },
      { title: 'Built-in ~100K Word Dictionary', body: 'The word validator draws from SOWPODS, with official TWL/NASPA validation including all 107 acceptable two-letter words (AA, EW, OK, QI, XU, ZA, and more). Every proposed move is checked for cross-validity — all words formed horizontally and vertically must exist in the dictionary independently. If any word fails, the entire move is rejected. No guesswork, no arguments.' },
      { title: 'Mobile-First, Zero-Framework Architecture', body: 'OpenScrabble is built with vanilla TypeScript and Vite — no React, no framework overhead. The CSS is mobile-first with touch-optimized tap targets. The board renders on Canvas for smooth performance. 61 unit tests across 5 test files cover tile distribution, word validation, scoring, and game logic.' },
      { title: 'Two-Player Local Play, No Accounts', body: 'No accounts, no AI, no backend, no telemetry. Customize player names via URL parameters (?p1=Alice&amp;p2=Bob). Desktop and mobile each have distinct interaction models — drag-and-drop on desktop, tap-to-select on mobile. Everything runs client-side from a single HTML file.' },
      { title: 'Privacy-First by Design', body: 'OpenScrabble tracks nothing. No analytics, no cookies, no server. The entire game runs in your browser from a static file. When you close the tab, the game is gone. Your words stay between you and your opponent.' },
    ],
  },
  "openledger": {
    longDesc: 'Private personal finance ledger. Next.js 16 + Supabase. AGPLv3. Live at ledger.kovina.org.',
    features: [
      { title: 'Local-First Finance with Optional Cloud Sync', body: 'Accounts, transactions, budgets, goals, and recurring entries all work entirely in localStorage — no sign-up required. The entire experience is functional without an account. When you do sign in, your data syncs to Supabase with conflict detection and full device management, letting you access your ledger from multiple devices without worrying about split-brain scenarios.' },
      { title: 'AI Agent Integration via 30 MCP Tools', body: 'OpenLedger exposes a token-authenticated MCP server with 30 tools spanning accounts, transactions, budgets, goals, recurring entries, categories, and reporting — all isolated per user. This means Claude Code, Cursor, or any MCP-compatible agent can query your balances, categorize spending, check budget status, or generate reports. Every operation is scoped to your data and authenticated via API token.' },
      { title: 'Smart Transaction Management', body: 'Import transactions from CSV or TSV files with column mapping, a preview step, and automatic deduplication. The global Quick Jump search finds any transaction instantly. Sortable columns and filters by date, account, category, and type make it easy to drill into specific periods or spending patterns. The recurring engine previews upcoming entries before they post.' },
      { title: 'Comprehensive Financial Planning', body: 'Set monthly budgets with real-time over-budget warnings. Define savings goals and track progress visually. Capture receipts via camera or gallery upload (stored in Supabase Storage). Account types cover checking, credit, savings, loan, and crypto — giving you a complete picture of your financial life.' },
      { title: 'PWA with Guest Mode', body: 'Install OpenLedger as a standalone Progressive Web App. Guest mode gives you the full local experience without signing in. Manual backup and restore ensures you always control your data, regardless of sync status.' },
    ],
  },
  "hisstastic": {
    longDesc: 'Retro snake-inspired arcade game. Vanilla JS + Capacitor (Android). PWA. Live everywhere.',
    features: [
      { title: '4 Dynamic Power-Up Types', body: 'Hisstastic keeps the classic snake formula fresh with four distinct power-ups — Immunity (brief invincibility that lets you phase through your own tail), Speed Boost (a burst of velocity for high-risk scoring), Shield (absorbs one collision), and Score Multiplier (doubles points for a limited time). Each has its own distinct color, audio cue, and visible game effect, giving you real-time feedback on what&#x27;s active.' },
      { title: 'Global Leaderboard via Supabase', body: 'Compete anonymously — the game generates a whimsical player name on your first high score and syncs only your personal best to the global leaderboard. If you&#x27;re offline, your score queues locally and syncs when connectivity returns. No account, no email, no password. Just your best run against the world.' },
      { title: 'Dual-Runtime Architecture', body: 'Hisstastic runs as a browser-based PWA with full offline cache support and as a native Android APK via Capacitor (just 6.6 MB). A Python/Pygame reference implementation is preserved for tinkering. The game engine supports deterministic replay recording, playback, and verification — every run can be rewound and audited.' },
      { title: 'Rich Visual and Audio Experience', body: 'Choose from four themes — Classic, Midnight, Desert, and Ocean — each with its own palette and mood. Procedural audio generates sound effects and looping music in real-time; no audio files needed. Mobile players get haptic feedback. Three difficulty levels (Easy, Normal, Hard) adjust speed and power-up frequency. DPR-aware rendering keeps pixels crisp on Retina displays.' },
      { title: 'Cross-Platform Distribution', body: 'Play instantly in any browser via the PWA, install the Android APK for native performance, or run the Python desktop version. Portrait and landscape modes are both supported, with a 360×560 mobile-optimized grid. The game never crashes on missing audio or assets — every subsystem is hardened with a fallback.' },
    ],
  },
  "chess-by-sparsh": {
    longDesc: 'Local-first chess with computer opponent. React 19/Vite/Stockfish WASM. MIT.',
    features: [
      { title: 'Five-Tier Computer Opponent', body: 'Whether you&#x27;re learning the moves or training for a tournament, Chess by Sparsh has an opponent for you. Beginner plays weighted random moves (~800 ELO). Casual uses 1-ply minimax (~1000). Club applies 3-ply alpha-beta pruning with quiescence search (~1450). Expert reaches 5-ply with iterative deepening and transposition tables (~1750). Nightmare loads Stockfish via WebAssembly for a ~2000+ challenge — but only when you select it, keeping the initial bundle lean.' },
      { title: 'Full Chess Rules Engine', body: 'Powered by chess.js, the engine enforces every official rule — castling, en passant, promotion (with a dialog to choose your piece), check, checkmate, stalemate, draw by repetition, and the 50-move rule. Legal moves are highlighted on hover. The algebraic notation history tracks every game, captured pieces are displayed, and you can import or export FEN positions at any time.' },
      { title: 'Rich Visual Customization', body: 'Five board themes — Classic, Marine, Ember, Forest, and Midnight — completely change the look and feel. Four piece rendering sets offer different visual styles. Moves animate smoothly between squares. Glass-morphism panels and a warm carpet texture background create a physical, tactile feel. Every visual detail is configurable without reloading.' },
      { title: 'PWA with Full Offline Play', body: 'Install Chess by Sparsh as a Progressive Web App and play entirely offline. The service worker caches everything — board themes, piece sets, the Stockfish WASM engine — so a single visit is all you need. Game state and preferences persist in localStorage. Programmatic audio via the Web Audio API means no sound files to download.' },
      { title: 'Move Review and Game Controls', body: 'Undo a mistake, restart the game, or resign when the position is lost. Step through your game move by move in review mode to analyze your play. Export the full game as PGN to clipboard or download as a file. Keyboard shortcuts and responsive layouts make it playable on desktop, tablet, and mobile.' },
    ],
  },
  "opensprout": {
    longDesc: 'Plant care dashboard. Next.js 15 + Supabase + Capacitor. AGPLv3. Live at sprout.kovina.org.',
    features: [
      { title: '28-Tool MCP Server for AI Agent Integration', body: 'OpenSprout&#x27;s MCP server covers 7 domains — plants, care schedules, care logs, journal entries, species knowledge, and plant identification — with 28 tools total. It supports both local stdio and remote HTTP transport with SHA-256 token authentication. 112 tests ensure reliability. Every user&#x27;s data is scoped and isolated.' },
      { title: 'Comprehensive Plant Care Tracking', body: '30 built-in species templates provide suggested care rhythms out of the box. Custom watering and fertilizing schedules adapt to your specific plants. Care activity logs track every action, and a health journal captures observations with title, body, health score, and tags. Archive plants instead of deleting them, so history is preserved.' },
      { title: 'Photo Uploads and Visual Timeline', body: 'Capture photos via camera or gallery on Android, or use the file picker on web. Images are stored in private Supabase Storage with Row-Level Security. Cover photos and journal attachments build a visual timeline of your plant&#x27;s health over time — new leaves, pest outbreaks, recovery after treatment, all documented.' },
      { title: 'Supabase Auth with Full RLS', body: 'Google OAuth via PKCE is the only authentication method — no password storage. Row-Level Security is enforced on every database table. PostgreSQL is server-side encrypted. Content Security Policy, rate limiting, and security headers protect the application.' },
      { title: 'Capacitor Android App and PWA', body: 'OpenSprout ships as a native Android app via Capacitor 8 (debug and signed release builds available) and as a PWA with full manifest and service worker. The monorepo structure separates apps/web from apps/mcp, keeping the agent server independent of the frontend.' },
    ],
  },
  "openjournal": {
    longDesc: 'Privacy-first local activity journal for Windows. Rust/Tauri 2 + React 19. AGPLv3.',
    features: [
      { title: 'Automatic Activity Tracking via Win32 API', body: 'Every 5 seconds, OpenJournal polls GetForegroundWindow() to record the focused application name, window title, and duration. That&#x27;s all it captures — no keystrokes, no clipboard contents, no screenshots, no passwords. The data never leaves your machine. There is no network access, no telemetry, no cloud sync.' },
      { title: 'System Tray Integration', body: 'OpenJournal runs invisibly in the background, accessible via a system tray icon. From the tray you can show or hide the main window, pause or resume tracking, or quit entirely. A one-click pause is available from both the tray and the app — useful when you&#x27;re about to do something private.' },
      { title: 'Private Blocklist for Sensitive Apps', body: 'Configure blocklist patterns — app names, window title keywords, or domain patterns — before any data is stored. When a foreground window matches a blocklist rule, those seconds are silently skipped. This ensures work in sensitive applications, private browsing, or confidential documents is never recorded.' },
      { title: 'Local AI-Powered Summaries', body: 'Optionally enable AI-powered activity summaries via LM Studio, Ollama, or any OpenAI-compatible local provider. The engine aggregates your day into 8 three-hour blocks and generates structured JSON summaries. This feature is off by default and no data is ever sent to a remote service — only your local AI endpoint.' },
      { title: 'Markdown and JSON Export', body: 'Export any day&#x27;s activity as a formatted Markdown timeline or structured JSON. The underlying SQLite database is fully local and accessible. While the primary target is Windows 10 and 11, the Tauri architecture supports cross-platform builds.' },
    ],
  },
  "openproof": {
    longDesc: 'Privacy-first proof-of-existence on Base Sepolia. Next.js 16 + Solidity/Foundry. AGPLv3. Live at proof.kovina.org.',
    features: [
      { title: 'Blockchain Proof Without File Uploads', body: 'Your files never leave your device. OpenProof hashes files locally using the Web Crypto API (SHA-256) and sends only the resulting bytes32 hash to a minimal Solidity contract on Base Sepolia. The original document stays on your machine. This is proof of existence without exposure — you can timestamp a file&#x27;s fingerprint onchain without revealing its contents to anyone.' },
      { title: 'Canonical Receipt Specification (v3)', body: 'Every proof generates a versioned, deterministic JSON receipt with an Ed25519 signature. Receipts are printable and PDF-friendly, with citation formats for APA, MLA, Legal, and Plain text. The specification is an open standard designed for cross-app interoperability — any tool that understands the format can verify any proof.' },
      { title: 'Bundle Proofs with Merkle Tree Verification', body: 'Prove multiple files at once with deterministic combined hashes via a sorted Merkle tree. Each file gets an individual inclusion proof that can be verified independently. The verification report runs 11+ checks — schema validity, chain state, contract state, onchain consistency, bundle integrity — producing a pass/fail result you can trust.' },
      { title: 'Public Proof Pages with QR Verification', body: 'Each proof generates a shareable page at /proof/[hash] that reads the public registry state without exposing the original file. QR codes on printed receipts encode the proof page URL — not the file itself. Print or export as PDF for physical records. Anyone can verify without installing software or trusting a third party.' },
      { title: 'PWA and Multi-Platform Packaging', body: 'OpenProof ships as an installable PWA, a Capacitor Android app, and an MSIX Windows package. Lighthouse 100 scores across performance, accessibility, best practices, and SEO. A full threat model document is maintained in the repository, and v1.0 has a strict feature freeze to prevent scope creep.' },
    ],
  },
  "opensend": {
    longDesc: 'Free, ad-free file sharing. Next.js 15 + Supabase + Capacitor + Electron. AGPLv3. Live at send.kovina.org.',
    features: [
      { title: 'Dual Transfer Methods: P2P and Cloud', body: 'OpenSend intelligently chooses between WebRTC peer-to-peer and cloud relay based on network conditions. In P2P mode, files transfer directly between devices with no intermediary. Adaptive chunk sizing (8KB, 16KB, or 64KB based on real-time throughput), sliding-window speed estimation, and exponential backoff with jitter ensure optimal transfer speed. If P2P fails, it falls back seamlessly to cloud relay without interrupting the transfer.' },
      { title: 'No-Account Guest Transfers', body: 'Open Send instantly — no sign-up, no login. The recipient connects via QR code scan or a 6-character code. Send up to 20 files at once, each up to 50 MB, for a total of 500 MB per transfer. Works between any two devices — phone to laptop, desktop to tablet, any combination.' },
      { title: 'Cross-Platform: Web, Android, Windows', body: 'Use the PWA at send.kovina.org, install the Capacitor Android app from the store, or run the Electron Windows desktop app with an NSIS installer. Deep links (opensend://) let other apps trigger transfers. File associations let you right-click any file and send it. Auto-update via GitHub Releases keeps the desktop app current.' },
      { title: 'Trusted Devices and Transfer History', body: 'Sign in with Google OAuth to register devices by fingerprint, rename them, and revoke access. Transfer history supports sent/received filters, favorites, and soft-delete. A sync toggle gives you optional cloud backup of your transfer history.' },
      { title: 'End-to-End Encryption and Security Hardening', body: 'Optional AES-256-GCM encryption with PBKDF2 key derivation (600,000 iterations) protects your files in transit. Content Security Policy, HSTS (2-year preload), X-Frame-Options DENY, rate limiting (5 guest transfers per minute per IP), and automated session cleanup via cron. A 22-item penetration test checklist is maintained in docs/security.md.' },
    ],
  },
  "openconvert": {
    longDesc: 'Local-first Windows file converter. Rust/Tauri 2 + React 18. AGPLv3.',
    features: [
      { title: 'Local-First Desktop Conversion', body: 'OpenConvert is a Tauri v2 application — Rust handles all image processing, React provides the interface. Every conversion runs on your machine. No accounts, no cloud uploads, no telemetry. Your files never leave your computer.' },
      { title: 'Drag-and-Drop and Manual Selection', body: 'Two input methods: drag files directly onto the application window, or use the file picker to browse and select. Choose an output folder, and OpenConvert processes everything locally. A clean NSIS installer and uninstaller make setup and removal straightforward.' },
      { title: 'Bidirectional Format Support', body: 'Full round-trip conversion between PNG, JPG/JPEG, WEBP, BMP, and TIFF. Any valid input-to-output combination works. Resolution is preserved through the decode-encode cycle — no quality loss beyond what the target format inherently requires.' },
      { title: 'Auto-Update via GitHub Releases', body: 'The Tauri updater checks GitHub Releases for new versions. Once signing keys are configured, updates download and install seamlessly in the background. No manual download, no reinstallation.' },
      { title: 'Privacy-First History Log', body: 'OpenConvert stores only metadata — original filename, input and output format, timestamp, and result status. It never stores the original file, the converted file, file paths, or file contents. Your documents and images stay completely private.' },
    ],
  },
  "wordwise": {
    longDesc: 'Reflective word-of-the-day web app. Node.js/Express. AGPLv3. Live at wordwisehiccups.vercel.app.',
    features: [
      { title: '20,000+ Word Engine with Intelligent Caching', body: 'WordWise draws from a curated pool of over 20,000 English words (3 to 12 letters), each paired with rich definitions from the Free Dictionary API. A 50% in-memory cache hit rate minimizes API calls, while a 4-second client-side fallback guarantees that you always see a word — even if the network is slow or the API is unreachable. Three-attempt retry logic with exponential backoff ensures resilience without hammering upstream services.' },
      { title: 'Full-Screen Nature Landscape Backgrounds', body: 'Every visit serves a fresh, full-screen nature landscape — either a photograph or a video, chosen randomly from Pexels&#x27; highest-resolution catalog. The 50/50 photo-to-video ratio keeps each session visually distinct. Every background includes a subtle photographer attribution linked to the original Pexels page, respecting creative commons licensing.' },
      { title: 'Desktop Timezone Bar with Interactive Tooltips', body: 'A glass-blur strip across the bottom of the screen displays 12 major world timezones, updating every 30 seconds. Hovering over a city reveals a tooltip with local facts — population, notable landmarks, cultural trivia. Hovering over the date shows historical events that occurred on that day. It&#x27;s a quiet invitation to explore the world while reflecting on a word.' },
      { title: 'Graceful Degradation Architecture', body: 'WordWise is built to never show a broken state. Server-side AbortController timeouts (3–4 seconds), pre-bundled fallback words embedded in the client bundle, and a multi-attempt fallback chain ensure that every page load delivers a complete experience — word, definition, background — regardless of network conditions. If the Pexels API fails, you get the word on a clean canvas. If the dictionary API fails, the word appears without definition. Something always renders.' },
      { title: 'Zero-Tracking Deployment', body: 'No cookies. No analytics. No accounts. No telemetry. WordWise runs on Express.js deployed to Vercel, making outbound requests only to the Free Dictionary API and Pexels. The 190KB word pool is bundled with the client. What you read is between you and the page — and the page doesn&#x27;t remember you were there.' },
    ],
  },
  "elora-vault": {
    longDesc: 'Self-custodied behavioral capital vault on Base. Next.js 16 + Solidity. AGPLv3.',
    features: [
      { title: 'Self-Custodied Timed Capital Vault', body: 'Elora Vault is a smart contract on Base Sepolia that lets you lock USDC into timed protection horizons — 7, 30, 90, or 180 days. You deposit, choose a horizon, and cannot withdraw until it expires. No pooled treasury, no custodial control. The capital always belongs to you; the contract just enforces the time lock.' },
      { title: 'Behavioral Capital State Engine', body: 'Capital moves through five states: Wallet → Available → Protected → Releasing → Committed. Each transition requires an explicit action. The philosophy is simple: not every dollar should feel equally available. Intentional friction prevents impulsive moves, helping you align your finances with your long-term intentions rather than momentary urges.' },
      { title: 'Policy Studio with Runtime Evaluation', body: 'Create custom policies — protect a percentage of profit, enforce delayed withdrawals, set cooling periods, or protect prediction profits. The runtime evaluates your current state against active policies and produces structured suggestions. Every suggestion carries requiresConfirmation: true, ensuring nothing executes automatically. You always have the final say.' },
      { title: 'Prediction and Accounting Layer', body: 'Log predictions with descriptions, types, odds, stakes, and expected returns. Settle them as Won, Lost, or Push. Post-win profits can be routed into timed protection horizons automatically. This is private bankroll accounting — disconnected from real-world events, focused on your personal capital discipline.' },
      { title: 'Intent Decision Cockpit and Activity Timeline', body: 'A unified interface shows all pending release confirmations, protection opportunities, policy suggestions, and completed horizon summaries. A chronological timeline surfaces every vault event — deposits, protections started and ended, policy activations — giving you full visibility into your capital&#x27;s history.' },
    ],
  },
  "shesafe": {
    longDesc: 'Safety mapping concept. Next.js 16 + Supabase + Leaflet. MIT.',
    features: [
      { title: 'Community Safety Mapping with Privacy by Default', body: 'SheSafe provides a map-first interface for recording safety signals — places where people feel safe, areas that feel mixed, or locations that feel unsafe. Drop pins with structured categories and contextual notes. No invasive tracking, no background location harvesting, no unnecessary identity collection. The map is the interface.' },
      { title: 'Careful Language and Moderation Boundaries', body: 'Safety categories use calm, non-inflammatory wording — safe, mixed, unsafe. The system prevents fear-based wording, sensational alert titles, and hostile labels. Rate limits, deduplication, and reporting hooks prevent abuse while preserving the utility of community-sourced safety information.' },
      { title: 'Guest-First Anonymous Access', body: 'Anonymous access is the default experience. Visitors explore the core map before any account creation is suggested. Location handling is privacy-preserving — coordinates can be fuzzed where appropriate to protect the reporter while maintaining data utility.' },
      { title: 'Mobile-First Interaction Design', body: 'Thumb-friendly controls, safe-area handling, and uncluttered maps make SheSafe usable with one hand on a phone. Drop-pin uses crosshair or drop mode with confirmation states. Mobile bottom-sheet behavior keeps interactions contextual without taking over the screen.' },
      { title: 'Community Stewardship and Open Data Vision', body: 'Optional steward roles let trusted community members moderate without mandatory identity verification. Anonymized open-data exports enable community analysis and research. A moderation dashboard supports review workflows. The roadmap includes interoperable safety signal standards and an offline-first emergency mode.' },
    ],
  },
  "sparsh-sam": {
    longDesc: 'Minimal single-page project ecosystem index. Static HTML/CSS, GitHub Pages. MIT. Live at sparshsam.github.io.',
    features: [
      { title: 'Ecosystem Index Landing Page', body: 'Sparsh Sam&#x27;s personal site is the public face of the entire ecosystem — 7 featured project cards with descriptions, repo links, and live demos, plus 11 additional utilities in a compact directory grid. It serves as a navigation hub for discovering every project in the Kovina ecosystem.' },
      { title: 'Zero-Framework, Zero-Dependency Static HTML', body: 'Pure semantic HTML5, CSS custom properties, and a responsive grid — no frameworks, no build step, no JavaScript runtime. Hosted on GitHub Pages with automatic deployment from the main branch. The entire site is a single HTML file you can read and understand in minutes.' },
      { title: 'Accessibility-First Implementation', body: 'ARIA labels, semantic aria-labelledby sections, proper heading hierarchy, and accessible navigation ensure the site works with screen readers and assistive technology. A skip-to-content link lets keyboard users bypass navigation and jump straight to the project grid.' },
      { title: 'Comprehensive Project Discovery', body: 'Each project card links directly to its GitHub repository. Sections organize projects by category — finance, gaming, creativity, utilities, and infrastructure — making it easy to find what you&#x27;re looking for, whether you know the project name or not.' },
      { title: 'Minimal Maintenance', body: 'Zero packages, zero dependencies, zero CI beyond GitHub Pages auto-deploy. Push to main and the site is live in seconds. ORCID, email, and GitHub contact links in the footer provide multiple ways to reach out.' },
    ],
  },
  "world-clock-widget": {
    longDesc: 'Lightweight frameless Windows timezone widget. Python/tkinter. AGPLv3.',
    features: [
      { title: 'Multi-Timezone Desktop Overlay', body: 'World Clock Widget displays multiple IANA timezones simultaneously in a frameless, always-on-top window. Add or remove any timezone via the right-click context menu. Each clock updates every second via Python&#x27;s zoneinfo module, giving you precise, real-time visibility into timezones across the globe.' },
      { title: 'Click-Through Mode with Global Hotkey', body: 'Press Ctrl+Alt+T from anywhere in Windows to toggle click-through mode. When active, mouse events pass through the widget entirely — it becomes a pure desktop overlay, showing timezones without interfering with your work. This is ideal for streamers, presenters, or anyone who needs to monitor multiple timezones while focusing on other tasks.' },
      { title: 'Theme and Format Options', body: 'Switch between dark and light themes and toggle 12-hour or 24-hour time format. At 92% opacity, the widget blends into your desktop background. The title bar is draggable, letting you position the widget wherever it&#x27;s most convenient.' },
      { title: 'Persistent Configuration', body: 'Your timezone list, theme preference, and window position are saved to clock_config.json and survive restarts. An optional install_startup.bat script adds the widget to your Windows Startup folder, so it&#x27;s always there when you need it.' },
      { title: 'Pure Python Stdlib Implementation', body: 'World Clock Widget uses only Python&#x27;s standard library — tkinter for the GUI, zoneinfo for timezone data, and ctypes for Win32 API calls. Zero external dependencies. A single ~750-line app.py file is easy to inspect, modify, and understand.' },
    ],
  },
};
