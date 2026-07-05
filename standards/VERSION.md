# Standards Version

## v1.2.0 — 2026-07-05

**Last updated:** 2026-07-05

**Compatible with:** All Kovina projects

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
| PROJECT_STRUCTURE_STANDARD | 1.0.0 |

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
    "projectStructure": "1.0.0"
  }
}
```
