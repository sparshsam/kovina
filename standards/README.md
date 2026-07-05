# Kovina Standards

The canonical rules of the Kovina ecosystem.

Every AI agent reads these before writing code. Every project references them. Apps evolve frequently; standards evolve slowly.

---

## Authority Map

Every standard has a clearly defined responsibility. No document redefines information already owned by another. When a rule belongs to one standard, other standards link to it instead of duplicating it.

### Foundational — Read Before Every Session

| Document | Owns | Does Not Define |
|---|---|---|
| [KOVINA_MANIFESTO](foundational/KOVINA_MANIFESTO.md) | Philosophy, principles, ecosystem vision, what belongs and what does not, AI principles, ecosystem lifecycle | Implementation details, platform rules, UI patterns |
| [BRAND_GUIDELINES](foundational/BRAND_GUIDELINES.md) | Brand identity, voice, naming conventions, logo usage, colors, typography, repository standards | UI components, architecture, platform-specific branding |
| [DESIGN_PLAYBOOK](foundational/DESIGN_PLAYBOOK.md) | UI/UX design system, component rules, visual principles, typography hierarchy, color system, spacing | Architecture, branding, platform-specific behavior |
| [PRODUCT_ARCHITECTURE_PLAYBOOK](foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) | Layout, spacing scale, responsive architecture, information hierarchy, navigation patterns, performance architecture | Colors, typography, components, platform packaging |

### Process

| Document | Owns | Does Not Define |
|---|---|---|
| [PROJECT_STRUCTURE_STANDARD](process/PROJECT_STRUCTURE_STANDARD.md) | Canonical repository layout, required files and folders, naming conventions, CI/CD expectations, branching, asset organization | Documentation file content (owned by DOCUMENTATION_STANDARD), release workflow (owned by RELEASE_PROCESS) |
| [RELEASE_PROCESS](process/RELEASE_PROCESS.md) | Release workflow, semantic versioning, pre-release checklist | Repository structure, testing methodology, store submission |
| [TESTING_STANDARD](process/TESTING_STANDARD.md) | Testing requirements, coverage targets, CI expectations | How to test specific platforms, test framework selection |
| [DOCUMENTATION_STANDARD](process/DOCUMENTATION_STANDARD.md) | README structure, changelog format, required project documentation files | Repository layout, architecture documentation content |

### Reference — Cross-Platform Shared Standards

| Document | Owns | Does Not Define |
|---|---|---|
| [APP_ICON_STANDARD](shared/APP_ICON_STANDARD.md) | Every icon, favicon, splash asset and generation pipeline across all platforms | Store listing assets (owned by STORE_LISTING_STANDARD), app icon usage in UI |
| [ACCESSIBILITY_STANDARD](shared/ACCESSIBILITY_STANDARD.md) | Accessibility requirements across every platform — keyboard, screen readers, contrast, touch targets, motion, text scaling | Platform-specific accessibility implementation details, localization RTL |
| [STORE_LISTING_STANDARD](shared/STORE_LISTING_STANDARD.md) | Store metadata, descriptions, screenshots, promotional assets, categories, keywords, age ratings, privacy declarations, release notes for all distribution platforms | App icon sizes and formats (owned by APP_ICON_STANDARD), platform-specific submission workflows |
| [LOCALIZATION_STANDARD](shared/LOCALIZATION_STANDARD.md) | Internationalization and localization — locale architecture, language detection, RTL support, formatting, translation workflow | Store listing localization (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |

### Platform — Application-Specific

| Document | Owns | Does Not Define |
|---|---|---|
| [WEBSITE_STANDARD](platforms/WEBSITE_STANDARD.md) | Website requirements — two archetypes, domain conventions, SEO, performance budgets, hosting, dark/light mode, legal pages | PWA behavior (owned by PWA_STANDARD), app icons (owned by APP_ICON_STANDARD) |
| [PWA_STANDARD](platforms/PWA_STANDARD.md) | Progressive Web App — manifest, service worker, offline, install, update flow, caching, security | Website content (owned by WEBSITE_STANDARD), store listing (owned by STORE_LISTING_STANDARD) |
| [WINDOWS_APP_STANDARD](platforms/WINDOWS_APP_STANDARD.md) | Windows-specific — MSIX packaging, Store submission, title bar, system integration, installer, input | Icons (owned by APP_ICON_STANDARD), store listing metadata (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [ANDROID_APP_STANDARD](platforms/ANDROID_APP_STANDARD.md) | Android-specific — AAB packaging, adaptive icons, permissions, orientation, minSdk, build | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [IOS_APP_STANDARD](platforms/IOS_APP_STANDARD.md) | iOS-specific — IPA signing, App Store Connect, safe areas, orientation, Dynamic Type, VoiceOver | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [MAC_APP_STANDARD](platforms/MAC_APP_STANDARD.md) | macOS-specific — .app bundle, notarization, menu bar, window management, sandbox, universal binary | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |

### Infrastructure

| Document | Owns |
|---|---|
| [MCP_SERVER_BUILD_GUIDE](protocols/MCP-SERVER-BUILD-GUIDE.md) | MCP server specification — tools, authentication, deployment |
| [VERSION.md](VERSION.md) | Standards version manifest and versioning policy |
| [manifest.json](manifest.json) | Machine-readable version manifest for CI and agent tooling |

---

## Quick Reference

| Document | Version | Purpose |
|---|---|---|
| [VERSION.md](VERSION.md) | 1.1.0 | Version manifest and policy |
| [KOVINA_MANIFESTO.md](foundational/KOVINA_MANIFESTO.md) | 1.0.0 | Constitution — why, what belongs, all principles |
| [BRAND_GUIDELINES.md](foundational/BRAND_GUIDELINES.md) | 1.0.0 | Brand identity system |
| [DESIGN_PLAYBOOK.md](foundational/DESIGN_PLAYBOOK.md) | 1.0.0 | UI/UX design system |
| [PRODUCT_ARCHITECTURE_PLAYBOOK.md](foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) | 1.0.0 | Architecture patterns |
| [PROJECT_STRUCTURE_STANDARD.md](process/PROJECT_STRUCTURE_STANDARD.md) | 1.0.0 | Repository structure and organization |
| [APP_ICON_STANDARD.md](shared/APP_ICON_STANDARD.md) | 1.0.0 | Icon spec for all platforms |
| [ACCESSIBILITY_STANDARD.md](shared/ACCESSIBILITY_STANDARD.md) | 1.0.0 | Cross-platform accessibility |
| [STORE_LISTING_STANDARD.md](shared/STORE_LISTING_STANDARD.md) | 1.0.0 | Store listing metadata and assets |
| [LOCALIZATION_STANDARD.md](shared/LOCALIZATION_STANDARD.md) | 1.0.0 | Internationalization and localization |
| [WEBSITE_STANDARD.md](platforms/WEBSITE_STANDARD.md) | 1.0.0 | Website requirements |
| [PWA_STANDARD.md](platforms/PWA_STANDARD.md) | 1.0.0 | PWA requirements |
| [WINDOWS_APP_STANDARD.md](platforms/WINDOWS_APP_STANDARD.md) | 1.0.0 | Windows application requirements |
| [ANDROID_APP_STANDARD.md](platforms/ANDROID_APP_STANDARD.md) | 1.0.0 | Android application requirements |
| [IOS_APP_STANDARD.md](platforms/IOS_APP_STANDARD.md) | 1.0.0 | iOS application requirements |
| [MAC_APP_STANDARD.md](platforms/MAC_APP_STANDARD.md) | 1.0.0 | macOS application requirements |
| [MCP_SERVER_BUILD_GUIDE.md](protocols/MCP-SERVER-BUILD-GUIDE.md) | 1.0.0 | MCP server specification |
| [RELEASE_PROCESS.md](process/RELEASE_PROCESS.md) | 1.0.0 | Release lifecycle and checklist |
| [TESTING_STANDARD.md](process/TESTING_STANDARD.md) | 1.0.0 | Testing requirements |
| [DOCUMENTATION_STANDARD.md](process/DOCUMENTATION_STANDARD.md) | 1.0.0 | Documentation requirements |

---

## How to Use This Library

1. **New to a project?** Start with KOVINA_MANIFESTO.md, BRAND_GUIDELINES.md, DESIGN_PLAYBOOK.md, and PRODUCT_ARCHITECTURE_PLAYBOOK.md.
2. **Building an app for a specific platform?** Read the relevant platform standard (WEBSITE_STANDARD, WINDOWS_APP_STANDARD, etc.) plus the reference standards it depends on (APP_ICON_STANDARD, ACCESSIBILITY_STANDARD, STORE_LISTING_STANDARD, LOCALIZATION_STANDARD).
3. **Need to find a rule?** Consult the Authority Map above. Every subject is owned by exactly one document.
4. **Not sure if content exists?** Search the library before adding a new rule. Duplication is a bug.
5. **Adding a new standard?** Follow the existing style (Authority, Philosophy, numbered sections, QA Checklist, Agent Checklist). Update VERSION.md and manifest.json.
6. **Scaffolding a new project?** Copy templates from the [`templates/`](templates/) directory — they are canonical starting points consumed by OpenForge, not standards that need interpretation.

---

## Templates

The [`templates/`](templates/) directory contains canonical artifacts that OpenForge copies into new projects. These are not standards to be read — they are files to be filled in.

| Template | Description |
|---|---|
| [README.template.md](templates/README.template.md) | Showroom-style README following DOCUMENTATION_STANDARD |
| [CHANGELOG.template.md](templates/CHANGELOG.template.md) | Release history in the standard format |
| [CONTRIBUTING.template.md](templates/CONTRIBUTING.template.md) | Contribution guide with branch conventions |
| [SECURITY.template.md](templates/SECURITY.template.md) | Security policy and vulnerability reporting |
| [LICENSE_HEADER.template](templates/LICENSE_HEADER.template) | AGPLv3 source file header comment |
| [ISSUE_TEMPLATE.md](templates/ISSUE_TEMPLATE.md) | Bug report issue template for .github/ |
| [ISSUE_TEMPLATE.feature.md](templates/ISSUE_TEMPLATE.feature.md) | Feature request issue template for .github/ |
| [PULL_REQUEST_TEMPLATE.md](templates/PULL_REQUEST_TEMPLATE.md) | Pull request template for .github/ |
| [release-notes.template.md](templates/release-notes.template.md) | GitHub Release notes structure |

## Future

- **KOVINA_COMPLIANCE.md** — per-project compliance checklist against each standard.
- **OpenForge** — project generator that scaffolds new repos at 80% completion.
- **OpenAudit** — structural and standards compliance verification tooling.
