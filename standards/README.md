# Kovina Standards

The canonical rules of the Kovina ecosystem.

Every AI agent reads these before writing code. Every project references them. Apps evolve frequently; standards evolve slowly.

The standards define the complete anatomy of every Kovina Open App:

- **Skeleton** = project structure ([PROJECT_STRUCTURE_STANDARD](process/PROJECT_STRUCTURE_STANDARD.md))
- **Identity** = brand, icon, store presence ([BRAND_GUIDELINES](foundational/BRAND_GUIDELINES.md), [APP_ICON_STANDARD](shared/APP_ICON_STANDARD.md), [STORE_LISTING_STANDARD](shared/STORE_LISTING_STANDARD.md))
- **Brain** = product logic and architecture ([PRODUCT_ARCHITECTURE_PLAYBOOK](foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md))
- **Nervous system** = navigation and interaction ([NAVIGATION_STANDARD](shared/NAVIGATION_STANDARD.md))
- **Skin** = interface and visual design ([DESIGN_PLAYBOOK](foundational/DESIGN_PLAYBOOK.md))
- **Senses** = accessibility ([ACCESSIBILITY_STANDARD](shared/ACCESSIBILITY_STANDARD.md))
- **Language** = localization ([LOCALIZATION_STANDARD](shared/LOCALIZATION_STANDARD.md))
- **Memory** = data and storage ([DATA_STORAGE_STANDARD](shared/DATA_STORAGE_STANDARD.md))
- **Immune system** = security and privacy ([SECURITY_PRIVACY_STANDARD](shared/SECURITY_PRIVACY_STANDARD.md))
- **Muscles** = platform runtime ([platform standards](platforms/))
- **Metabolism** = performance ([PERFORMANCE_STANDARD](shared/PERFORMANCE_STANDARD.md))
- **Reproduction** = OpenForge scaffolding ([OPENFORGE_STANDARD](protocols/OPENFORGE_STANDARD.md))
- **Health checks** = OpenAudit testing and compliance ([OPENAUDIT_STANDARD](protocols/OPENAUDIT_STANDARD.md))

---

## Authority Map

Every standard has a clearly defined responsibility. No document redefines information already owned by another. When a rule belongs to one standard, other standards link to it instead of duplicating it.

### Foundational — Read Before Every Session

| Document | Owns | Does Not Define |
|---|---|---|
| [KOVINA_MANIFESTO](foundational/KOVINA_MANIFESTO.md) | Philosophy, principles, ecosystem vision, what belongs and what does not, AI principles, ecosystem lifecycle | Implementation details, platform rules, UI patterns |
| [BRAND_GUIDELINES](foundational/BRAND_GUIDELINES.md) | Brand identity, voice, naming conventions, logo usage, colors, typography, repository standards | UI components, architecture, platform-specific branding |
| [DESIGN_PLAYBOOK](foundational/DESIGN_PLAYBOOK.md) | UI/UX design system, component rules, visual principles, typography hierarchy, color system, spacing | Architecture, branding, platform-specific behavior |
| [PRODUCT_ARCHITECTURE_PLAYBOOK](foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) | Layout architecture, spacing scale, responsive breakpoints, information hierarchy, page composition, reading tempo | Colors, typography, components, platform packaging, navigation behavior (owned by [NAVIGATION_STANDARD](shared/NAVIGATION_STANDARD.md)), performance budgets (owned by [PERFORMANCE_STANDARD](shared/PERFORMANCE_STANDARD.md)) |

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
| [NAVIGATION_STANDARD](shared/NAVIGATION_STANDARD.md) | Navigation hierarchy, platform navigation principles, route naming, deep links, back behavior, command palette, PWA navigation adaptation | Visual design of navigation (owned by DESIGN_PLAYBOOK), accessibility implementation (owned by ACCESSIBILITY_STANDARD) |
| [DATA_STORAGE_STANDARD](shared/DATA_STORAGE_STANDARD.md) | Local-first philosophy, data classification, export/import, backup/restore, offline behavior, sync, conflicts, schema versioning, migrations, storage limits, auditability | Security of data at rest/transit (owned by SECURITY_PRIVACY_STANDARD), performance caching strategy (owned by PERFORMANCE_STANDARD) |
| [SECURITY_PRIVACY_STANDARD](shared/SECURITY_PRIVACY_STANDARD.md) | Privacy guarantees, telemetry policy, ad prohibition, dark pattern prohibition, permission minimization, secrets management, encryption expectations, authentication, session handling, threat model, safe defaults | Data storage architecture (owned by DATA_STORAGE_STANDARD), privacy policy legal text, store privacy declarations (owned by STORE_LISTING_STANDARD) |
| [PERFORMANCE_STANDARD](shared/PERFORMANCE_STANDARD.md) | Startup budgets, interaction latency, render performance, bundle size, dependency limits, image/media optimization, font loading, Web Vitals, platform and low-end device expectations, profiling | Data caching architecture (owned by DATA_STORAGE_STANDARD), platform-specific packaging (owned by platform standards) |

### Platform — Application-Specific

| Document | Owns | Does Not Define |
|---|---|---|
| [WEBSITE_STANDARD](platforms/WEBSITE_STANDARD.md) | Website requirements — two archetypes, domain conventions, SEO, performance budgets, hosting, dark/light mode, legal pages | PWA behavior (owned by PWA_STANDARD), app icons (owned by APP_ICON_STANDARD) |
| [PWA_STANDARD](platforms/PWA_STANDARD.md) | Progressive Web App — manifest, service worker, offline, install, update flow, caching, security | Website content (owned by WEBSITE_STANDARD), store listing (owned by STORE_LISTING_STANDARD) |
| [WINDOWS_APP_STANDARD](platforms/WINDOWS_APP_STANDARD.md) | Windows-specific — MSIX packaging, Store submission, title bar, system integration, installer, input | Icons (owned by APP_ICON_STANDARD), store listing metadata (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [ANDROID_APP_STANDARD](platforms/ANDROID_APP_STANDARD.md) | Android-specific — AAB packaging, adaptive icons, permissions, orientation, minSdk, build | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [IOS_APP_STANDARD](platforms/IOS_APP_STANDARD.md) | iOS-specific — IPA signing, App Store Connect, safe areas, orientation, Dynamic Type, VoiceOver | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |
| [MAC_APP_STANDARD](platforms/MAC_APP_STANDARD.md) | macOS-specific — .app bundle, notarization, menu bar, window management, sandbox, universal binary | Icons (owned by APP_ICON_STANDARD), store listing (owned by STORE_LISTING_STANDARD), accessibility (owned by ACCESSIBILITY_STANDARD) |

### Infrastructure & Tooling

| Document | Owns |
|---|---|
| [MCP_SERVER_BUILD_GUIDE](protocols/MCP-SERVER-BUILD-GUIDE.md) | MCP server specification — tools, authentication, deployment |
| [OPENFORGE_STANDARD](protocols/OPENFORGE_STANDARD.md) | Project scaffolding engine — standards manifest loading, template consumption, project profile mapping, generation audit, reproducibility |
| [OPENAUDIT_STANDARD](protocols/OPENAUDIT_STANDARD.md) | Compliance verification engine — audit categories, scoring, pass/warn/fail severity, CI integration, remediation suggestions, manual QA handoff |
| [VERSION.md](VERSION.md) | Standards version manifest and versioning policy |
| [manifest.json](manifest.json) | Machine-readable version manifest for CI and agent tooling |

---

## Quick Reference

| Document | Version | Purpose |
|---|---|---|
| [VERSION.md](VERSION.md) | 1.2.0 | Version manifest and policy |
| [KOVINA_MANIFESTO.md](foundational/KOVINA_MANIFESTO.md) | 1.0.0 | Constitution — why, what belongs, all principles |
| [BRAND_GUIDELINES.md](foundational/BRAND_GUIDELINES.md) | 1.0.0 | Brand identity system |
| [DESIGN_PLAYBOOK.md](foundational/DESIGN_PLAYBOOK.md) | 1.0.0 | UI/UX design system |
| [PRODUCT_ARCHITECTURE_PLAYBOOK.md](foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) | 1.0.0 | Architecture patterns |
| [PROJECT_STRUCTURE_STANDARD.md](process/PROJECT_STRUCTURE_STANDARD.md) | 1.0.0 | Repository structure and organization |
| [APP_ICON_STANDARD.md](shared/APP_ICON_STANDARD.md) | 1.0.0 | Icon spec for all platforms |
| [ACCESSIBILITY_STANDARD.md](shared/ACCESSIBILITY_STANDARD.md) | 1.0.0 | Cross-platform accessibility |
| [STORE_LISTING_STANDARD.md](shared/STORE_LISTING_STANDARD.md) | 1.0.0 | Store listing metadata and assets |
| [LOCALIZATION_STANDARD.md](shared/LOCALIZATION_STANDARD.md) | 1.0.0 | Internationalization and localization |
| [NAVIGATION_STANDARD.md](shared/NAVIGATION_STANDARD.md) | 1.0.0 | Cross-platform navigation architecture |
| [DATA_STORAGE_STANDARD.md](shared/DATA_STORAGE_STANDARD.md) | 1.0.0 | Data architecture, persistence, export/import, sync |
| [SECURITY_PRIVACY_STANDARD.md](shared/SECURITY_PRIVACY_STANDARD.md) | 1.0.0 | Security, privacy, permissions, secrets, threat model |
| [PERFORMANCE_STANDARD.md](shared/PERFORMANCE_STANDARD.md) | 1.0.0 | Startup, responsiveness, bundle, platform performance |
| [WEBSITE_STANDARD.md](platforms/WEBSITE_STANDARD.md) | 1.0.0 | Website requirements |
| [PWA_STANDARD.md](platforms/PWA_STANDARD.md) | 1.0.0 | PWA requirements |
| [WINDOWS_APP_STANDARD.md](platforms/WINDOWS_APP_STANDARD.md) | 1.0.0 | Windows application requirements |
| [ANDROID_APP_STANDARD.md](platforms/ANDROID_APP_STANDARD.md) | 1.0.0 | Android application requirements |
| [IOS_APP_STANDARD.md](platforms/IOS_APP_STANDARD.md) | 1.0.0 | iOS application requirements |
| [MAC_APP_STANDARD.md](platforms/MAC_APP_STANDARD.md) | 1.0.0 | macOS application requirements |
| [MCP_SERVER_BUILD_GUIDE.md](protocols/MCP-SERVER-BUILD-GUIDE.md) | 1.0.0 | MCP server specification |
| [OPENFORGE_STANDARD.md](protocols/OPENFORGE_STANDARD.md) | 1.0.0 | Project scaffolding engine specification |
| [OPENAUDIT_STANDARD.md](protocols/OPENAUDIT_STANDARD.md) | 1.0.0 | Compliance verification engine specification |
| [RELEASE_PROCESS.md](process/RELEASE_PROCESS.md) | 1.0.0 | Release lifecycle and checklist |
| [TESTING_STANDARD.md](process/TESTING_STANDARD.md) | 1.0.0 | Testing requirements |
| [DOCUMENTATION_STANDARD.md](process/DOCUMENTATION_STANDARD.md) | 1.0.0 | Documentation requirements |

---

## How to Use This Library

1. **New to a project?** Start with KOVINA_MANIFESTO.md, BRAND_GUIDELINES.md, DESIGN_PLAYBOOK.md, and PRODUCT_ARCHITECTURE_PLAYBOOK.md.
2. **Building an app for a specific platform?** Read the relevant platform standard (WEBSITE_STANDARD, WINDOWS_APP_STANDARD, etc.) plus the reference standards it depends on (APP_ICON_STANDARD, ACCESSIBILITY_STANDARD, STORE_LISTING_STANDARD, LOCALIZATION_STANDARD, NAVIGATION_STANDARD, DATA_STORAGE_STANDARD, SECURITY_PRIVACY_STANDARD, PERFORMANCE_STANDARD).
3. **Need to find a rule?** Consult the Authority Map above. Every subject is owned by exactly one document.
4. **Not sure if content exists?** Search the library before adding a new rule. Duplication is a bug.
5. **Adding a new standard?** Follow the existing style (Authority, Philosophy, numbered sections, QA Checklist, Agent Checklist). Update VERSION.md and manifest.json.
6. **Scaffolding a new project?** Use OpenForge, which consumes these standards to generate projects. See [OPENFORGE_STANDARD](protocols/OPENFORGE_STANDARD.md).
7. **Verifying compliance?** Run OpenAudit against your project. See [OPENAUDIT_STANDARD](protocols/OPENAUDIT_STANDARD.md).

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

- **KOVINA_COMPLIANCE.md** — per-project compliance checklist against each standard (superseded by OpenAudit).
