# Standards Version

## v1.2.0 — 2026-07-06

**Last updated:** 2026-07-06

**Compatible with:** All Kovina projects

**Changes since v1.1.0:**
- Added shared/NAVIGATION_STANDARD — cross-platform navigation architecture (hierarchy, platform principles, deep links, command palette, PWA adaptation).
- Added shared/DATA_STORAGE_STANDARD — data architecture, local-first philosophy, export/import, sync, schema versioning, storage limits, auditability.
- Added shared/SECURITY_PRIVACY_STANDARD — privacy guarantees, permissions, secrets management, encryption, authentication, threat model, safe defaults.
- Added shared/PERFORMANCE_STANDARD — startup budgets, interaction latency, bundle size, Web Vitals, platform performance expectations, profiling requirements.
- Added protocols/OPENFORGE_STANDARD — project scaffolding engine specification (standards manifest loading, template consumption, project profile mapping, generation audit, reproducibility).
- Added protocols/OPENAUDIT_STANDARD — compliance verification engine specification (audit categories, scoring model, pass/warn/fail severity, CI integration, remediation suggestions, manual QA handoff).
- Updated README.md with the complete app-organism anatomy model and expanded Authority Map for all 6 new standards.
- Updated manifest.json with all 6 new standards entries.
- Updated CHANGELOG.md with v1.2.0 changes.

**Changes since v1.0.0:**
- Added WEBSITE_STANDARD — web-first and showcase website requirements.
- Added PWA_STANDARD — Progressive Web App requirements.
- Added WINDOWS_APP_STANDARD — Windows desktop application requirements.
- Added ANDROID_APP_STANDARD — Android application requirements.
- Added IOS_APP_STANDARD — iOS application requirements.
- Added MAC_APP_STANDARD — macOS application requirements.
- Added `shared/APP_ICON_STANDARD` — cross-platform icon specification (canonical reference for all platform docs).
- Added `shared/ACCESSIBILITY_STANDARD` — cross-platform accessibility requirements (canonical reference for all platform docs).
- Refactored all 6 platform standards to deduplicate icon and accessibility content against the new reference standards.

**Changes since v1.1.0:**
- Added PROJECT_STRUCTURE_STANDARD — canonical repository blueprint for OpenForge.
- Added `shared/STORE_LISTING_STANDARD` — single source of truth for all store listing metadata and assets.
- Added `shared/LOCALIZATION_STANDARD` — canonical internationalization and localization standard.
- Refactored APP_ICON_STANDARD and 4 platform standards to deduplicate store listing content against STORE_LISTING_STANDARD.
- Updated platform standards to reference LOCALIZATION_STANDARD for RTL rules.
- Created Authority Map in README.md establishing clear ownership boundaries across all standards.

---

## Standards Manifest

| Standard | Version |
|---|---|
| KOVINA_MANIFESTO | 1.0.0 |
| BRAND_GUIDELINES | 1.0.0 |
| DESIGN_PLAYBOOK | 1.0.0 |
| PRODUCT_ARCHITECTURE_PLAYBOOK | 1.0.0 |
| MCP_SERVER_BUILD_GUIDE | 1.0.0 |
| RELEASE_PROCESS | 1.0.0 |
| TESTING_STANDARD | 1.0.0 |
| DOCUMENTATION_STANDARD | 1.0.0 |
| WEBSITE_STANDARD | 1.0.0 |
| PWA_STANDARD | 1.0.0 |
| WINDOWS_APP_STANDARD | 1.0.0 |
| ANDROID_APP_STANDARD | 1.0.0 |
| IOS_APP_STANDARD | 1.0.0 |
| MAC_APP_STANDARD | 1.0.0 |
| shared/APP_ICON_STANDARD | 1.0.0 |
| shared/ACCESSIBILITY_STANDARD | 1.0.0 |
| shared/STORE_LISTING_STANDARD | 1.0.0 |
| shared/LOCALIZATION_STANDARD | 1.0.0 |
| shared/NAVIGATION_STANDARD | 1.0.0 |
| shared/DATA_STORAGE_STANDARD | 1.0.0 |
| shared/SECURITY_PRIVACY_STANDARD | 1.0.0 |
| shared/PERFORMANCE_STANDARD | 1.0.0 |
| PROJECT_STRUCTURE_STANDARD | 1.0.0 |
| protocols/OPENFORGE_STANDARD | 1.0.0 |
| protocols/OPENAUDIT_STANDARD | 1.0.0 |

---

## Version Policy

- **MAJOR** — breaking philosophy changes, incompatible requirements, structural rewrites.
- **MINOR** — new standards added, non-breaking additions to existing standards.
- **PATCH** — clarifications, corrections, formatting.

Standards evolve slowly. Apps evolve frequently. The standards directory should be the most stable part of the ecosystem.

---

## Machine-readable manifest

```json
{
  "manifest": "1.2.0",
  "standards": {
    "manifesto": "1.0.0",
    "brand": "1.0.0",
    "design": "1.0.0",
    "architecture": "1.0.0",
    "mcp": "1.0.0",
    "release": "1.0.0",
    "testing": "1.0.0",
    "documentation": "1.0.0",
    "website": "1.0.0",
    "pwa": "1.0.0",
    "windows": "1.0.0",
    "android": "1.0.0",
    "ios": "1.0.0",
    "mac": "1.0.0",
    "appIcon": "1.0.0",
    "accessibility": "1.0.0",
    "storeListing": "1.0.0",
    "localization": "1.0.0",
    "navigation": "1.0.0",
    "dataStorage": "1.0.0",
    "securityPrivacy": "1.0.0",
    "performance": "1.0.0",
    "projectStructure": "1.0.0",
    "openForge": "1.0.0",
    "openAudit": "1.0.0"
  }
}
```
