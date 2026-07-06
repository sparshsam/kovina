# Standards Changelog

## [1.2.0] — 2026-07-06

### Added

- shared/NAVIGATION_STANDARD.md — cross-platform navigation architecture (hierarchy, platform navigation principles, route naming, deep links, back behavior, command palette, PWA navigation adaptation).
- shared/DATA_STORAGE_STANDARD.md — data architecture, local-first philosophy, data classification, export/import, backup/restore, offline behavior, sync, conflict handling, schema versioning, migrations, data deletion, storage limits, auditability.
- shared/SECURITY_PRIVACY_STANDARD.md — privacy guarantees (no telemetry by default, no ads, no dark patterns), permission minimization, secrets management, encryption expectations, data minimization, authentication, session handling, threat model, safe defaults.
- shared/PERFORMANCE_STANDARD.md — startup budgets, interaction latency, render performance, bundle size, dependency limits, image/media optimization, font loading, Web Vitals, platform performance expectations, low-end device expectations, profiling requirements.
- protocols/OPENFORGE_STANDARD.md — project scaffolding engine specification (standards manifest loading, template consumption, project profile mapping, .kovina/ metadata, scaffold validation, generation audit, overwrite/upgrade behavior, reproducibility).
- protocols/OPENAUDIT_STANDARD.md — compliance verification engine specification (audit categories, standards manifest loading, 12 category check suites, scoring model, pass/warn/fail severity, human/machine report formats, remediation suggestions, CI integration, manual QA handoff).

### Changed

- Updated README.md with the complete app-organism anatomy model linking all 13 body systems to their owning standards. Expanded the Authority Map with 4 new shared standards (NAVIGATION_STANDARD, DATA_STORAGE_STANDARD, SECURITY_PRIVACY_STANDARD, PERFORMANCE_STANDARD) and 2 new protocol standards (OPENFORGE_STANDARD, OPENAUDIT_STANDARD). Added OpenForge and OpenAudit references to the How to Use section.
- Updated VERSION.md to v1.2.0 with all 6 new standards in the Standards Manifest and machine-readable manifest.
- Updated manifest.json with 6 new entries: navigation, dataStorage, securityPrivacy, performance, openForge, openAudit.

## [1.1.0] — 2026-07-05

### Added

- PROJECT_STRUCTURE_STANDARD.md — canonical repository blueprint for OpenForge.
- shared/STORE_LISTING_STANDARD.md — single source of truth for all store listing metadata and assets.
- shared/LOCALIZATION_STANDARD.md — canonical internationalization and localization standard.

### Changed

- Refactored APP_ICON_STANDARD and 4 platform standards to deduplicate store listing content against STORE_LISTING_STANDARD.
- Updated platform standards to reference LOCALIZATION_STANDARD for RTL rules.
- Created Authority Map in README.md establishing clear ownership boundaries across all standards.

## [1.0.0] — 2026-07-01

### Added

- KOVINA_MANIFESTO.md — ecosystem constitution
- BRAND_GUIDELINES.md — brand identity system
- DESIGN_PLAYBOOK.md — UI/UX design system
- PRODUCT_ARCHITECTURE_PLAYBOOK.md — architecture patterns
- MCP_SERVER_BUILD_GUIDE.md — MCP server specification
- RELEASE_PROCESS.md — release lifecycle and checklist
- TESTING_STANDARD.md — testing requirements
- DOCUMENTATION_STANDARD.md — documentation requirements
- VERSION.md — version manifest and policy
- README.md — standards index
