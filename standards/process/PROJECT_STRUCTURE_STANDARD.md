# Project Structure Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.1.0](VERSION.md)
>
> Canonical blueprint for every Kovina repository. Consumed by OpenForge for project generation and by OpenAudit for compliance verification.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Canonical Repository Layout](#3-canonical-repository-layout)
4. [Required Root Files](#4-required-root-files)
5. [Required Folders](#5-required-folders)
6. [Assets Organization](#6-assets-organization)
7. [Documentation Organization](#7-documentation-organization)
8. [Standards Integration](#8-standards-integration)
9. [Naming Conventions](#9-naming-conventions)
10. [Configuration & Environment Files](#10-configuration--environment-files)
11. [Scripts](#11-scripts)
12. [CI/CD Expectations](#12-cicd-expectations)
13. [Release Artifacts](#13-release-artifacts)
14. [Branching Expectations](#14-branching-expectations)
15. [Lifecycle Expectations](#15-lifecycle-expectations)
16. [Repository Consistency](#16-repository-consistency)
17. [QA Checklist](#17-qa-checklist)
18. [Agent Checklist](#18-agent-checklist)

---

## 1. Authority

### This document owns

- The canonical directory layout for every Kovina repository, including required root files, folder structure, naming conventions, and asset organization.
- Rules for repository consistency across the ecosystem — every Kovina project should feel structurally familiar regardless of its purpose or platform.
- CI/CD expectations, branching conventions, and release artifact organization.
- The relationship between a project repository and the standards directory.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Documentation file requirements (README, CHANGELOG, etc.) | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| Release workflow and version numbering | [RELEASE_PROCESS.md](RELEASE_PROCESS.md) |
| Testing expectations | [TESTING_STANDARD.md](TESTING_STANDARD.md) |
| Brand identity, naming, logos | [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) |
| Design system and UI patterns | [DESIGN_PLAYBOOK.md](DESIGN_PLAYBOOK.md) |
| Architecture patterns | [PRODUCT_ARCHITECTURE_PLAYBOOK.md](PRODUCT_ARCHITECTURE_PLAYBOOK.md) |
| Platform-specific packaging (MSIX, IPA, AAB) | Platform standards ([WINDOWS_APP_STANDARD.md](WINDOWS_APP_STANDARD.md), etc.) |

### Dependencies

This document depends on [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) for documentation file requirements and [RELEASE_PROCESS.md](RELEASE_PROCESS.md) for release conventions. It does not re-state their rules — it enforces that they are followed.

---

## 2. Philosophy

A Kovina repository should feel familiar the moment you open it. Whether you are looking at OpenReader, OpenLedger, OpenProof, or any other project, the directory structure, file placement, and naming conventions should be predictable. This consistency is not bureaucracy — it is a prerequisite for automated tooling (OpenForge scaffolding, OpenAudit compliance checks), AI agent productivity, and contributor confidence.

Every repository is structured so that:

- **A human can find any file without searching.** The location of every type of file is predetermined.
- **An AI agent can navigate any Kovina project without re-learning the layout.** The conventions are shared across the ecosystem.
- **OpenForge can scaffold new projects at 80% completion.** The structure is known and enumerable.
- **OpenAudit can verify structural compliance programmatically.** Required files and folders have known paths and formats.

---

## 3. Canonical Repository Layout

```
{project-name}/
├── assets/                       # Brand, screenshots, media
│   ├── app-icon/                 # Canonical icon source + generated sizes
│   ├── branding/                 # Wordmarks, lockups, brand assets
│   ├── screenshots/              # App screenshots (dark and light)
│   └── hero/                     # Hero imagery for README and website
├── docs/                         # Developer documentation
├── scripts/                      # Build, generate, deploy tooling
├── src/ or app/                  # Primary application source
├── public/ or web/               # Static web assets (if applicable)
├── tests/ or __tests__/          # Test suite
├── .github/                      # GitHub templates, workflows
├── .gitignore
├── CHANGELOG.md
├── CLAUDE.md                     # AI agent configuration
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE                       # AGPLv3 or MIT
├── package.json or Cargo.toml    # Project manifest
├── README.md
├── SECURITY.md
├── SUPPORT.md
└── {platform-config}             # Platform-specific build files
```

### Layout Rules

| Rule | Rationale |
|---|---|
| Every repository has flat root files, not nested ones | Navigation is predictable. No hunting for the README. |
| Every repository has `assets/`, `docs/`, `scripts/` folders | These are invariant across all projects. |
| Source code lives in `src/` or an equivalent root-level source directory named after the platform convention | `src/` for web, `app/` for Android, `{Name}` for Xcode projects. |
| Test code lives in `tests/` or `__tests__/` at the root | Not nested inside `src/`. OpenAudit checks this. |
| No files at the root except those listed in [Required Root Files](#4-required-root-files) and the project manifest | Root clutter is a sign of structural decay. |
| The `.github/` directory contains only CI/CD and GitHub-specific configuration | Not a dumping ground for scripts or assets. |

---

## 4. Required Root Files

### Mandatory Files (Every Repository)

| File | Purpose | Owning Standard |
|---|---|---|
| `README.md` | What, why, how to use | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `LICENSE` | AGPLv3 or MIT | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `CHANGELOG.md` | Release history | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `CONTRIBUTING.md` | How to contribute | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `SECURITY.md` | Vulnerability reporting | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `CODE_OF_CONDUCT.md` | Community standards | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `SUPPORT.md` | Support information | [DOCUMENTATION_STANDARD.md](DOCUMENTATION_STANDARD.md) |
| `CLAUDE.md` | AI agent configuration | This document |
| `.gitignore` | Ignored files | This document |

### Mandatory Files (If Applicable)

| File | Condition |
|---|---|
| `AGENTS.md` | AI agent operating notes beyond what CLAUDE.md covers |
| `ROADMAP.md` | Projects with published future direction |
| `PRIVACY.md` | Applications that handle user data |
| `requirements.txt` / `Cargo.toml` / `Package.swift` | Language-specific manifest |
| `Dockerfile` / `docker-compose.yml` | Containerized deployments |

### Prohibited Root Files

- No `notes.md`, `todo.md`, `ideas.md`, or scratchpad files at root. Use GitHub Issues or Discussions.
- No `.env` files with secrets committed. Use `.env.example` with placeholder values.
- No build artifacts, dependency directories (`node_modules/`, `vendor/`, `target/`), or IDE configuration (`.vscode/`, `.idea/`) tracked in version control.
- No large binary files at root. Use Git LFS or reference external storage.

---

## 5. Required Folders

### Invariant Folders

| Folder | Purpose | Required |
|---|---|---|
| `assets/` | Brand assets, screenshots, hero images | Yes |
| `docs/` | Developer documentation | Yes |
| `scripts/` | Build, generate, deploy tooling | Yes |
| `.github/` | CI/CD workflows, templates | Yes (if on GitHub) |

### Conditional Folders

| Folder | Condition | Convention |
|---|---|---|
| `src/` | Web, desktop, or general application source | Primary code directory |
| `app/` | Android application | Android source root |
| `{ProjectName}/` | iOS/macOS Xcode project | Matches `.xcodeproj` name |
| `public/` or `web/` | Static web assets | Served directly by hosting platform |
| `tests/` or `__tests__/` | Test suite | OpenAudit checks existence |
| `benchmarks/` | Performance benchmarks | If performance is a product requirement |
| `examples/` | Usage examples and demos | If the project is a library or SDK |
| `integrations/` | Third-party integration code | If project integrates with external services |

### Folder Rules

| Rule | Rationale |
|---|---|
| No empty folders tracked in version control (use `.gitkeep`) | Prevents ambiguous directory state |
| Folder names are lowercase with hyphens for multi-word | Consistent with ecosystem conventions |
| The `scripts/` directory is not for one-off tools | Every script has a purpose and a `--help` flag |
| Documentation goes in `docs/`, not in `docs-source/` or `documentation/` | One canonical name |

---

## 6. Assets Organization

The `assets/` directory has a fixed internal structure that every Kovina repository follows:

```
assets/
├── app-icon/
│   └── icon-source.png          # 1024×1024 canonical source
├── branding/
│   ├── logos/                   # Wordmark SVGs and exports
│   │   ├── master/              # Primary wordmark files
│   │   ├── variants/            # Color, monochrome, header variants
│   │   ├── favicon/             # Favicon PNGs and SVG
│   │   ├── exports/             # Generated PNG exports at standard sizes
│   │   └── social/              # Social preview card (1200×630)
│   ├── open/                    # "Open" sub-brand lockups and specs
│   └── RELEASE.md               # Brand asset release notes
├── screenshots/
│   ├── dark/                    # Dark mode screenshots
│   ├── light/                   # Light mode screenshots
│   └── store/                   # Store-specific screenshot crops
└── hero/
    ├── hero-dark.png            # Primary hero image (dark)
    └── hero-light.png           # Primary hero image (light)
```

### Asset Rules

- All screenshots are real, current, and show realistic data — never empty states, placeholder text, or lorem ipsum.
- The `assets/app-icon/icon-source.png` is the single canonical source. All generated icon sizes are produced from it (see [App Icon Standard](../shared/APP_ICON_STANDARD.md)).
- Brand assets follow the naming convention in [BRAND_GUIDELINES.md](../foundational/BRAND_GUIDELINES.md): `kovina-{type}-{variant}.{ext}`.
- Store-specific assets (screenshot crops, feature graphics) are generated by a script in `scripts/`, not hand-authored.

---

## 7. Documentation Organization

The `docs/` directory follows a consistent structure across all Kovina repositories:

```
docs/
├── Architecture.md          # System architecture, data flow, component relationships
├── Development.md           # Development setup, commands, workflow
├── Deployment.md            # Build pipeline, hosting, release mechanics
├── Contributing.md          # Extended contribution guide (beyond root CONTRIBUTING.md)
├── HISTORY.md               # Project history, major milestones (optional)
├── testing/                 # Test documentation (if complex testing strategy)
│   └── STRATEGY.md
└── api/                     # API documentation (if applicable)
    └── README.md
```

### Documentation Rules

- Every document in `docs/` follows the same file naming: `PascalCase.md` with the first letter capitalized.
- Developer documentation, not user documentation. User-facing content belongs in `README.md` or a dedicated website.
- `docs/` is tracked in version control and updated with every significant change.
- Outdated documentation is a bug. Documentation drift is tracked as technical debt.

---

## 8. Standards Integration

### Relationship to the kovina Repository

The canonical standards live in the `kovina` repository's `standards/` directory. Every Kovina project references them but does not fork them.

### Per-Project CLAUDE.md

Every Kovina project's `CLAUDE.md` must begin with a standards reference block:

```markdown
# Project Standards

This project follows the Kovina ecosystem standards at:
https://github.com/sparshsam/kovina/tree/main/standards

Required reading before every session:
- KOVINA_MANIFESTO.md
- BRAND_GUIDELINES.md
- DESIGN_PLAYBOOK.md
- PRODUCT_ARCHITECTURE_PLAYBOOK.md
```

### Standards Compliance

- Every project declares which standards it complies with in its `README.md` or `CLAUDE.md`.
- Standards are not optional. A project that cannot meet a standard documents the gap and a remediation plan.
- OpenAudit verifies structural compliance against this document and DOCUMENTATION_STANDARD.md.

---

## 9. Naming Conventions

### Repository Names

| Pattern | Example |
|---|---|
| `open{Product}` | `openproof`, `openledger`, `openreader` |
| Non-Open exceptions | `hisstastic`, `wordwise`, `elora-vault` |
| Kovina infrastructure | `kovina` (the standards and brand site) |

### Directory Names

- Lowercase with hyphens: `app-icon`, `open-wordmark`
- No underscores in directory names except for platform conventions (e.g. `__tests__`)
- No spaces in directory names

### File Names

- `README.md`, `CHANGELOG.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md` — exactly these names, case-sensitive
- Source files follow the language convention (TypeScript: `PascalCase.tsx` or `kebab-case.ts`, Swift: `PascalCase.swift`, Rust: `snake_case.rs`)
- Asset files: `kovina-{type}-{variant}.{ext}`
- Script files: `kebab-case.js` or `kebab-case.sh`

### Branch Names

```
{type}/{description}
```

| Type | Use |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `refactor/` | Code restructuring |
| `chore/` | Maintenance, tooling, dependencies |
| `docs/` | Documentation |
| `release/` | Release preparation |

Descriptions are lowercase with hyphens: `feat/add-import-csv`, `fix/null-pointer-on-empty-state`.

---

## 10. Configuration & Environment Files

### Configuration Files

| File | Status | Purpose |
|---|---|---|
| `package.json` | Node.js projects | Project metadata, dependencies, scripts |
| `Cargo.toml` | Rust projects | Project metadata, dependencies |
| `Package.swift` | Swift projects | Project metadata, dependencies |
| `tsconfig.json` | TypeScript projects | TypeScript compiler configuration |
| `eslint.config.*` | JavaScript projects | Linter configuration |
| `.prettierrc*` | All projects | Formatter configuration |
| `.github/workflows/*.yml` | All GitHub projects | CI/CD pipeline definitions |

### Environment Files

| File | Status | Purpose |
|---|---|---|
| `.env.example` | Required if the project uses environment variables | Documented placeholder values, no secrets |
| `.env` | Never committed | Local development secrets only |
| `.env.production` | Never committed | Production secrets managed by deployment platform |

### Environment Rules

- `.env.example` documents every variable the project needs, with a comment describing its purpose.
- No real secrets, tokens, or keys in any committed file.
- CI/CD secrets are managed through the platform's secret store (GitHub Secrets, Cloudflare Secrets, etc.).

---

## 11. Scripts

Every Kovina repository has a `scripts/` directory with purpose-built automation.

### Required Scripts

| Script | Purpose | Required |
|---|---|---|
| `scripts/generate-icons.js` | Generate all platform icon sizes from canonical source | If project has an app icon |
| `scripts/build.sh` | Production build | Yes |
| `scripts/test.sh` | Run test suite | Yes |
| `scripts/lint.sh` | Run linter | Yes |

### Recommended Scripts

| Script | Purpose |
|---|---|
| `scripts/screenshots.sh` | Generate store screenshots with device frames |
| `scripts/ci.sh` | Full CI pipeline locally (lint → test → build) |
| `scripts/release.sh` | Tag, build, and publish a release |

### Script Rules

- Every script has a `--help` flag that documents its purpose, arguments, and exit codes.
- Scripts are written in the repository's primary scripting language or POSIX-compatible shell.
- Scripts are idempotent where possible — running them twice produces the same result.
- Credentials are never embedded in scripts. They are read from environment variables.
- Scripts are tested and maintained alongside the application. A broken script is a bug.

---

## 12. CI/CD Expectations

### Minimum CI Pipeline

Every Kovina project on GitHub must have a CI workflow at `.github/workflows/ci.yml` that:

1. Checks out the repository.
2. Sets up the correct language runtime.
3. Installs dependencies.
4. Runs the linter.
5. Runs the test suite.
6. Runs the production build.
7. Reports success or failure.

### Release Pipeline

Projects that produce distributable artifacts must have a release workflow at `.github/workflows/release.yml` that:

1. Runs the full CI pipeline.
2. Builds distribution artifacts (MSIX, IPA, AAB, APK, Docker image, etc.).
3. Signs artifacts where required.
4. Uploads artifacts to the release.
5. Optionally deploys to store or hosting platform.

### CI Rules

| Rule | Rationale |
|---|---|
| CI must pass before merge | A failing build is a blocked change |
| Secrets are never logged | Mask all secrets in CI output |
| CI uses the same build process as local development | No "works on my machine" gaps |
| Cache dependencies between runs | Keeps CI fast |
| CI is the source of truth for build artifacts | Manual builds are for development only |

---

## 13. Release Artifacts

### Artifact Organization

Release artifacts are organized by platform and stored as GitHub Release assets or in a package registry:

```
releases/
├── v1.2.3/
│   ├── {project}-v1.2.3.msix
│   ├── {project}-v1.2.3.aab
│   ├── {project}-v1.2.3.dmg
│   └── CHANGELOG.md
```

### Artifact Rules

- Every release includes the corresponding CHANGELOG entry.
- Artifacts are named consistently: `{project}-{version}.{ext}`.
- Source code archives are auto-generated by the hosting platform (GitHub, etc.).
- Checksums (SHA-256) are provided for all downloadable artifacts.
- Release notes are written for humans, not machines — they explain what changed and why.

---

## 14. Branching Expectations

### Branch Strategy

| Branch | Purpose | Protection |
|---|---|---|
| `main` | Production-ready code. Always deployable. | Protected. Requires CI pass + review. |
| `develop` | Integration branch for feature work (optional). | Protected. Requires CI pass. |
| `feat/*` | Feature branches. Short-lived. | None. Deleted after merge. |
| `fix/*` | Bug fix branches. Short-lived. | None. Deleted after merge. |
| `release/*` | Release preparation. | Protected during active release. |

### Branch Rules

- `main` must always be deployable. If it is not, the team stops and fixes it.
- Feature branches are short-lived (days, not weeks). Long-running branches indicate poor decomposition.
- No direct commits to `main` or `develop`. All changes go through pull requests.
- Squash-merge or rebase-merge is preferred over merge commits for feature branches.

---

## 15. Lifecycle Expectations

Every Kovina repository follows the ecosystem lifecycle defined in [KOVINA_MANIFESTO.md](../foundational/KOVINA_MANIFESTO.md):

```
Idea → Prototype → Experimental → Beta → Stable → Mature → Maintenance → Archived
```

### Lifecycle Indicators in Repository Structure

| Stage | Structural Indicators |
|---|---|
| **Experimental** | `README.md` exists but may be sparse. `docs/` may be incomplete. `CHANGELOG.md` exists. |
| **Beta** | All required root files present. `docs/` partially complete. Test suite exists but may have gaps. |
| **Stable** | All required root files present. `docs/` complete. Test coverage ≥ 80%. CI must pass. |
| **Mature** | Full compliance with all ecosystem standards. Documentation is thorough and maintained. Benchmarks exist. |
| **Maintenance** | CI continues to pass. Critical fixes only. No new feature work. |
| **Archived** | `README.md` updated with archival notice. Repository is read-only. |

---

## 16. Repository Consistency

### Consistency Rules

| Rule | Enforcement |
|---|---|
| Every repository has the same top-level directory structure for shared folders | OpenAudit structural scan |
| Every repository capitalizes directory and file names the same way | OpenAudit naming check |
| Every repository uses `.gitignore` that excludes the same categories of artifacts | OpenAudit `.gitignore` validation |
| Every repository documents its build process in `docs/Development.md` | OpenAudit content check |
| Every repository integrates the ecosystem standards reference in its CLAUDE.md | OpenAudit CLAUDE.md check |

### Consistency Across Surfaces

When a project ships on multiple platforms (e.g. OpenReader on Windows, web, and mobile), each platform's repository follows the same structural conventions. The `src/` content differs by platform, but `assets/`, `docs/`, `scripts/`, `CHANGELOG.md`, and `README.md` follow identical conventions.

---

## 17. QA Checklist

Before declaring a repository structurally complete:

- [ ] All required root files are present (README, LICENSE, CHANGELOG, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, SUPPORT).
- [ ] CLAUDE.md exists with the ecosystem standards reference block.
- [ ] `.gitignore` exists and excludes build artifacts, dependencies, and secrets.
- [ ] `assets/` directory exists with the canonical app icon source.
- [ ] `docs/` directory exists with Architecture.md, Development.md, and Deployment.md.
- [ ] `scripts/` directory exists with build, test, and lint scripts.
- [ ] `.github/workflows/ci.yml` exists with a full CI pipeline.
- [ ] `CHANGELOG.md` is up to date with the current release.
- [ ] README.md follows the showroom standard (hero, CTA, gallery, features, license).
- [ ] No prohibited root files exist (scratchpad files, tracked .env files, build artifacts).
- [ ] No empty directories are tracked (`.gitkeep` files in intentionally empty directories).
- [ ] Branch naming convention is documented or enforced.
- [ ] `scripts/generate-icons.js` exists (if the project has an app icon).
- [ ] Screenshots in `assets/screenshots/` are current and show real data.
- [ ] `docs/Architecture.md` accurately describes the system.

---

## 18. Agent Checklist

Before an AI agent declares project structure work complete:

### Required Files

- [ ] README.md, LICENSE, CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, SUPPORT.md all exist at root.
- [ ] CLAUDE.md exists with standards reference block.
- [ ] `.gitignore` exists and is comprehensive.
- [ ] No prohibited files at root (scratchpad, .env, build artifacts).

### Required Directories

- [ ] `assets/` exists with the canonical structure.
- [ ] `docs/` exists with Architecture.md, Development.md, Deployment.md.
- [ ] `scripts/` exists with build, test, lint entry points.
- [ ] `.github/workflows/` exists with CI pipeline.
- [ ] Source directory (`src/`, `app/`, etc.) exists.

### Naming

- [ ] Directory names use lowercase with hyphens.
- [ ] Standard root files use exact canonical names (case-sensitive).
- [ ] Branch names follow `{type}/{description}` convention.

### CI/CD

- [ ] CI workflow runs linter, tests, and build.
- [ ] CI must pass before merge.
- [ ] Secrets are managed through platform secret store, not committed.

### Standards Integration

- [ ] CLAUDE.md references the kovina standards directory.
- [ ] Project lifecycle stage is declared.
- [ ] Any standards compliance gaps are documented with remediation plans.

### Assets

- [ ] `assets/app-icon/icon-source.png` exists (1024×1024).
- [ ] Screenshots in `assets/screenshots/` show real data.
- [ ] README hero screenshot is current.

---

*This standard defines the canonical repository structure for all Kovina projects. Companion to [DOCUMENTATION_STANDARD.md](../process/DOCUMENTATION_STANDARD.md) for documentation requirements and [RELEASE_PROCESS.md](../process/RELEASE_PROCESS.md) for release conventions. Consumed by OpenForge and OpenAudit.*
