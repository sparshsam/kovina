# OpenForge Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.2.0](../VERSION.md)
>
> Canonical specification for OpenForge — the Kovina project scaffolding engine. Defines how OpenForge consumes ecosystem standards and templates to generate new Kovina Open projects at 80% completion.
>
> OpenForge is the reproductive system of the app organism — it produces new projects from the canonical body plan.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [OpenForge Purpose](#3-openforge-purpose)
4. [Canonical Standards Source](#4-canonical-standards-source)
5. [Standards Manifest Loading](#5-standards-manifest-loading)
6. [Templates Usage](#6-templates-usage)
7. [Project Profile Mapping](#7-project-profile-mapping)
8. [Generated Metadata](#8-generated-metadata)
9. [.kovina/project.json](#9-kovina-project-json)
10. [.kovina/standards.json](#10-kovina-standards-json)
11. [.kovina/forge.json](#11-kovina-forge-json)
12. [Scaffold Validation](#12-scaffold-validation)
13. [Template Variable Replacement](#13-template-variable-replacement)
14. [Standards Compliance Preview](#14-standards-compliance-preview)
15. [Generation Audit](#15-generation-audit)
16. [Overwrite Behavior](#16-overwrite-behavior)
17. [Upgrade Behavior](#17-upgrade-behavior)
18. [Reproducibility](#18-reproducibility)
19. [Agent Expectations](#19-agent-expectations)
20. [Prohibited Generator Behavior](#20-prohibited-generator-behavior)
21. [QA Checklist](#21-qa-checklist)
22. [Agent Checklist](#22-agent-checklist)

---

## 1. Authority

### This document owns

- OpenForge's purpose, architecture, and behavioral rules.
- Standards manifest loading — how OpenForge discovers and reads Kovina standards.
- Template consumption — how templates in `standards/templates/` are used for scaffolding.
- Project profile definition and mapping to templates.
- Generated metadata structure — `.kovina/project.json`, `.kovina/standards.json`, `.kovina/forge.json`.
- Scaffold validation, variable replacement, and compliance preview generation.
- Generation audit logging, overwrite behavior, upgrade behavior.
- Reproducibility guarantees and agent expectations.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Template file content and format | Template files themselves (`standards/templates/*`) |
| Standards versioning and release policy | [VERSION.md](../VERSION.md) and [RELEASE_PROCESS.md](../process/RELEASE_PROCESS.md) |
| Compliance verification of generated projects | [OPENAUDIT_STANDARD.md](OPENAUDIT_STANDARD.md) |
| Repository structure rules | [PROJECT_STRUCTURE_STANDARD.md](../process/PROJECT_STRUCTURE_STANDARD.md) |
| Documentation content rules | [DOCUMENTATION_STANDARD.md](../process/DOCUMENTATION_STANDARD.md) |
| Brand identity and naming | [BRAND_GUIDELINES.md](../foundational/BRAND_GUIDELINES.md) |

### Dependencies

This document depends on [VERSION.md](../VERSION.md) (standards manifest versioning), [PROJECT_STRUCTURE_STANDARD.md](../process/PROJECT_STRUCTURE_STANDARD.md) (canonical repo layout), [DOCUMENTATION_STANDARD.md](../process/DOCUMENTATION_STANDARD.md) (documentation file requirements), [BRAND_GUIDELINES.md](../foundational/BRAND_GUIDELINES.md) (naming and identity), and the template files in `standards/templates/`. It produces output expected by [OPENAUDIT_STANDARD.md](OPENAUDIT_STANDARD.md).

---

## 2. Philosophy

OpenForge is not a code generator. It is a **standards consumer** that scaffolds new Kovina projects by applying canonical ecosystem rules. It does not invent naming conventions, file structures, or content — it reads them from the standards library and fills in the project-specific details.

The core principle: **OpenForge knows the rules; it does not make the rules.** Every structural decision OpenForge makes is derived from one of the Kovina standards. If a rule does not exist in the standards, OpenForge does not invent it — it should trigger a warning that a standard is missing.

OpenForge's output is "80% completion." It produces a fully structured repository with all required files, documentation stubs, and metadata. The remaining 20% — actual application logic, feature content, and project-specific configuration — is filled in by the developer or an AI agent using the scaffolding as a starting point.

---

## 3. OpenForge Purpose

### What OpenForge Does

| Function | Description |
|---|---|
| **Scaffold a new project** | Create a complete Kovina project repository from a project profile |
| **Generate metadata files** | Produce `.kovina/project.json`, `.kovina/standards.json`, `.kovina/forge.json` |
| **Apply templates** | Copy and fill template files from `standards/templates/` into the new project |
| **Validate output** | Verify the scaffolded project against PROJECT_STRUCTURE_STANDARD |
| **Preview compliance** | Generate a compliance gap report showing which standards the project meets and which require manual work |
| **Log generation** | Record a generation audit trail for reproducibility |
| **Upgrade projects** | Re-scaffold specific files when standards or templates change |

### What OpenForge Does Not Do

| Function | Not OpenForge's Responsibility |
|---|---|
| Write application logic | The developer or AI agent fills in features |
| Generate source code beyond boilerplate | Only scaffold, templates, and config |
| Verify compliance after changes | OpenAudit handles compliance verification |
| Deploy or build the project | CI/CD and platform tooling handle deployment |
| Maintain the standards library | The standards are maintained independently |

---

## 4. Canonical Standards Source

### Source Location

The canonical Kovina standards live in the `kovina` repository:

```
https://github.com/sparshsam/kovina/tree/main/standards
```

### Source Resolution

| Scenario | Behavior |
|---|---|
| Online | OpenForge fetches the latest standards from the `main` branch of the `kovina` repository |
| Offline | OpenForge uses a locally cached copy of the standards (including the repo as a submodule or a local clone) |
| Version pinning | The project's `.kovina/standards.json` pins a specific standards version; OpenForge uses that version |
| When source is unavailable | OpenForge fails with a clear error message explaining the missing source |

### Standards Directory Structure

OpenForge reads the following directory structure:

```
standards/
├── manifest.json              # Machine-readable standards manifest
├── VERSION.md                 # Standards version and policy
├── foundational/              # Philosophy and design (read, not consumed)
├── shared/                    # Cross-platform rules (read, not consumed)
├── platforms/                 # Platform-specific rules (read, not consumed)
├── process/                   # Engineering process rules (read, not consumed)
├── protocols/                 # Tooling specifications (read, not consumed)
└── templates/                 # Scaffolding artifacts (consumed by OpenForge)
```

OpenForge reads the standards for context and compliance preview. It consumes the `templates/` directory for file generation.

---

## 5. Standards Manifest Loading

### Manifest Format

OpenForge loads `standards/manifest.json` to determine the available standards and their versions:

```
{
  "manifest": "1.2.0",
  "version": "1.2.0",
  "released": "2026-07-05",
  "standards": {
    "manifesto": "1.0.0",
    "brand": "1.0.0",
    ...
  }
}
```

### Loading Rules

| Rule | Rationale |
|---|---|
| OpenForge validates that the manifest is well-formed JSON before processing | Structural integrity |
| OpenForge checks that the manifest version is compatible with its own version | API compatibility |
| OpenForge reads every standard listed in the manifest for compliance preview | Complete coverage |
| Unknown standards in the manifest are ignored with a warning | Forward compatibility |
| Missing required standards trigger a warning during generation | Gap awareness |

### Required Standards for Generation

The following standards must be present in the manifest for OpenForge to scaffold a project:

| Standard | Required For |
|---|---|
| PROJECT_STRUCTURE_STANDARD | Directory layout and required files |
| DOCUMENTATION_STANDARD | Documentation file structure |
| BRAND_GUIDELINES | Naming conventions |
| APP_ICON_STANDARD | Icon generation |
| RELEASE_PROCESS | Version schema and changelog format |

---

## 6. Templates Usage

### Template Discovery

OpenForge discovers templates by scanning `standards/templates/`:

| File | Consumed By OpenForge |
|---|---|
| `README.template.md` | Copied, variables replaced, saved as `README.md` |
| `CHANGELOG.template.md` | Copied, variables replaced, saved as `CHANGELOG.md` |
| `CONTRIBUTING.template.md` | Copied, variables replaced, saved as `CONTRIBUTING.md` |
| `SECURITY.template.md` | Copied, variables replaced, saved as `SECURITY.md` |
| `LICENSE_HEADER.template` | Not copied as a file — content used for source file headers |
| `ISSUE_TEMPLATE.md` | Copied to `.github/ISSUE_TEMPLATE/bug_report.md` |
| `ISSUE_TEMPLATE.feature.md` | Copied to `.github/ISSUE_TEMPLATE/feature_request.md` |
| `PULL_REQUEST_TEMPLATE.md` | Copied to `.github/PULL_REQUEST_TEMPLATE.md` |
| `release-notes.template.md` | Copied, variables replaced, saved as template reference |

### Template Processing Rules

| Rule | Rationale |
|---|---|
| Each template is processed independently | No inter-template dependencies |
| Template variable replacement happens before file writing | Placeholder-free output |
| If a template is missing, OpenForge logs a warning and skips it | Graceful degradation |
| Templates are copied exactly except for variable replacement | Fidelity to the canonical template |
| Template output paths are determined by PROJECT_STRUCTURE_STANDARD | Consistent repository layout |

---

## 7. Project Profile Mapping

### Profile Input

OpenForge accepts a project profile that maps to template variables and structural decisions:

| Field | Type | Required | Source |
|---|---|---|---|
| `name` | String | Yes | Project display name (e.g., "OpenReader") |
| `slug` | String | Yes | Repository name (e.g., `openreader`) |
| `description` | String | Yes | One-sentence project description |
| `platforms` | Array of strings | Yes | Target platforms: `web`, `pwa`, `windows`, `macos`, `ios`, `android` |
| `lifecycle_stage` | String | Yes | `experimental`, `beta`, `stable`, `mature`, `maintenance` |
| `author` | String | No | Author/maintainer name |
| `theme` | Object | No | Color overrides (optional — defaults to Kovina brand) |
| `features` | Array of strings | No | Key features for README hero and gallery sections |
| `store_required` | Boolean | No | Whether the app will be distributed through stores |

### Profile Validation

| Rule | Rationale |
|---|---|
| The project name follows `Open{Product}` naming (see BRAND_GUIDELINES) | Brand consistency |
| The slug is lowercase with no spaces | Git and URL compatible |
| The lifecycle stage is one of the defined stages | Lifecycle tracking |
| At least one platform is specified | Viable project |
| The description is ≤ 280 characters | Readme and store compatibility |

---

## 8. Generated Metadata

OpenForge generates three metadata files in a `.kovina/` directory at the project root:

| File | Purpose |
|---|---|
| `.kovina/project.json` | Project identity and configuration |
| `.kovina/standards.json` | Standards version pinning and compliance status |
| `.kovina/forge.json` | Generation audit record |

The `.kovina/` directory is tracked in version control — it defines the project's relationship to the ecosystem.

---

## 9. .kovina/project.json

### Schema

```json
{
  "schema": "1.0",
  "project": {
    "name": "OpenReader",
    "slug": "openreader",
    "version": "0.1.0",
    "description": "A local-first desktop PDF reader with annotation tools.",
    "platforms": ["windows", "macos", "web"],
    "lifecycle_stage": "experimental",
    "author": "Kovina",
    "created": "2026-07-06T12:00:00Z",
    "forge_version": "1.0.0"
  }
}
```

### Rules

| Field | Rule |
|---|---|
| `schema` | Always `"1.0"` at this version. Incremented if the schema changes. |
| `created` | ISO 8601 UTC timestamp of project creation. Never changes after creation. |
| `forge_version` | The version of OpenForge that generated this project. |

---

## 10. .kovina/standards.json

### Schema

```json
{
  "schema": "1.0",
  "standards_version": "1.2.0",
  "standards": {
    "manifesto": { "version": "1.0.0", "status": "compliant" },
    "brand": { "version": "1.0.0", "status": "compliant" },
    "projectStructure": { "version": "1.0.0", "status": "pending" },
    "accessibility": { "version": "1.0.0", "status": "pending" },
    "navigation": { "version": "1.0.0", "status": "pending" },
    "dataStorage": { "version": "1.0.0", "status": "pending" },
    "securityPrivacy": { "version": "1.0.0", "status": "pending" },
    "performance": { "version": "1.0.0", "status": "pending" }
  }
}
```

### Status Values

| Status | Meaning |
|---|---|
| `compliant` | The project's generated files and structure satisfy this standard |
| `pending` | The standard applies but requires manual work to become compliant |
| `not_applicable` | This standard does not apply to this project (e.g., a CLI tool doesn't need accessibility) |
| `unknown` | The standard has not yet been evaluated |

### Rules

| Rule | Rationale |
|---|---|
| Structural standards (PROJECT_STRUCTURE, DOCUMENTATION) are set to `pending` — scaffolding creates the files but content must be filled | Content completion is the developer's responsibility |
| Standards that only apply to specific platforms are set to `not_applicable` if the project does not target those platforms | Honest status reporting |
| The manifest version matches the standards version at generation time | Accurate pinning |
| The user can update this file as compliance progress is made | Living document |
| OpenAudit reads this file to determine which standards to verify | Audit scoping |

---

## 11. .kovina/forge.json

### Schema

```json
{
  "schema": "1.0",
  "forge_version": "1.0.0",
  "generated": "2026-07-06T12:05:00Z",
  "standards_source": {
    "repository": "https://github.com/sparshsam/kovina",
    "ref": "main",
    "manifest_version": "1.2.0"
  },
  "profile": {
    "name": "OpenReader",
    "slug": "openreader",
    "platforms": ["windows", "macos", "web"],
    "lifecycle_stage": "experimental"
  },
  "files_created": [
    "README.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "LICENSE",
    "docs/Architecture.md",
    "docs/Development.md",
    "docs/Deployment.md",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/ISSUE_TEMPLATE/feature_request.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".kovina/project.json",
    ".kovina/standards.json",
    ".kovina/forge.json"
  ],
  "files_skipped": [],
  "warnings": [],
  "checksum": "sha256-hash-of-inputs"
}
```

### Rules

| Rule | Rationale |
|---|---|
| `files_created` lists every file OpenForge wrote during generation | Transparency |
| `files_skipped` lists every file that was skipped (exists already, no overwrite) | Conflict visibility |
| `warnings` lists any issues encountered during generation (missing templates, validation warnings) | Awareness |
| `checksum` is a SHA-256 hash of the input manifest and profile | Reproducibility verification |

---

## 12. Scaffold Validation

### Post-Generation Validation

After scaffolding, OpenForge validates the generated project against:

| Check | Source |
|---|---|
| All required root files exist | PROJECT_STRUCTURE_STANDARD |
| All required directories exist | PROJECT_STRUCTURE_STANDARD |
| `.kovina/` directory exists with all three metadata files | This standard |
| Template variables are resolved (no `{{...}}` placeholders remain) | Template processing |
| JSON metadata files are well-formed | Schema validation |
| Repository slug matches directory name | Project consistency |

### Validation Rules

| Rule | Rationale |
|---|---|
| Validation runs automatically after every scaffold operation | Immediate feedback |
| Validation failures are reported with specific file names and expected paths | Actionable errors |
| Validation warnings do not block generation — but are surfaced to the user | Pragmatic |
| A project with validation failures is still written to disk | The user can fix and continue |

---

## 13. Template Variable Replacement

### Variable Syntax

Templates use `{{VARIABLE_NAME}}` syntax for variable replacement:

```markdown
# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}
>
> Built with Kovina.

Version: {{PROJECT_VERSION}}
```

### Available Variables

| Variable | Source | Example |
|---|---|---|
| `{{PROJECT_NAME}}` | Profile `name` | `OpenReader` |
| `{{PROJECT_SLUG}}` | Profile `slug` | `openreader` |
| `{{PROJECT_DESCRIPTION}}` | Profile `description` | `A local-first PDF reader` |
| `{{PROJECT_VERSION}}` | Generation default | `0.1.0` |
| `{{PROJECT_AUTHOR}}` | Profile `author` | `Kovina` |
| `{{CURRENT_YEAR}}` | Generation timestamp | `2026` |
| `{{LIFECYCLE_STAGE}}` | Profile `lifecycle_stage` | `experimental` |
| `{{STANDARDS_VERSION}}` | Manifest version | `1.2.0` |
| `{{PLATFORMS}}` | Profile `platforms` | `windows, macos, web` |

### Rules

| Rule | Rationale |
|---|---|
| Unknown variables are left as-is with a warning | The template has a variable the generator doesn't know about |
| Variable values are sanitized (no injection of arbitrary content into file paths) | Security |
| Variables are replaced after template files are read and before they are written | Clean output |
| The variable list is extensible — OpenForge accepts custom variables via the profile | Flexibility |

---

## 14. Standards Compliance Preview

### Purpose

After scaffolding, OpenForge generates a compliance preview that shows the project's relationship to each standard. This preview is written as `COMPLIANCE_PREVIEW.md` at the project root (not as a standard — it is a generation artifact).

### Preview Content

```
# OpenReader — Standards Compliance Preview

Generated by OpenForge v1.0.0 from kovina standards v1.2.0

| Standard | Status | Notes |
|---|---|---|
| PROJECT_STRUCTURE_STANDARD | ✅ Compliant | All required files and directories created |
| BRAND_GUIDELINES | ✅ Compliant | Naming follows Open{Product} convention |
| DOCUMENTATION_STANDARD | ⏳ Pending | Stubs created, content requires manual work |
| ACCESSIBILITY_STANDARD | ⏳ Pending | Not applicable to scaffold — requires implementation |
| ... | ... | ... |

**Summary:** 3 compliant, 8 pending, 2 not applicable

**Next Steps:** See `.kovina/standards.json` for detailed status. Run OpenAudit after implementation.
```

### Rules

| Rule | Rationale |
|---|---|
| The compliance preview is advisory, not authoritative | Only OpenAudit can verify actual compliance |
| The preview is overwritten on every scaffold operation | Always current |
| The preview is intended for human reading, not machine parsing | OpenAudit reads `.kovina/standards.json` |

---

## 15. Generation Audit

### Audit Log

OpenForge records every generation action in `.kovina/forge.json`:

| Event | Recorded |
|---|---|
| New project generation | Full record with profile, file list, checksum |
| Template update re-generation | Updated record with files changed |
| Configuration changes | Record of what changed and why |
| Warnings | Description of each warning |

### Audit Rules

| Rule | Rationale |
|---|---|
| The audit record is append-only (new events are added, nothing is removed) | Complete history |
| The audit record is human-readable JSON | Transparency |
| The audit record is included in version control | Part of project history |

---

## 16. Overwrite Behavior

### Default Behavior

| Scenario | Action |
|---|---|
| File does not exist | Create it |
| File exists and was previously generated by OpenForge | Overwrite it (file contains a `Generated by OpenForge` header comment) |
| File exists and was not generated by OpenForge (no generator header) | Skip it, log to `files_skipped` |
| File exists and was modified after OpenForge generation (content differs from template) | Skip it, log to `files_skipped`, warn the user |

### User Options

| Option | Effect |
|---|---|
| `--force` | Overwrite all files regardless of modification |
| `--no-overwrite` | Never overwrite any existing file |
| `--overwrite-list file1,file2` | Overwrite only the specified files |

---

## 17. Upgrade Behavior

### When Standards Change

When a Kovina standard or template is updated, OpenForge can re-scaffold a project's generated files:

| Scenario | Action |
|---|---|
| New template added to standards | Copy the new template into existing projects |
| Template content changed | Update the corresponding file if it was not manually modified |
| Template format changed (new variables) | Replace variables in the new template |
| Standard removed | Leave existing files in place — do not delete user content |

### Upgrade Process

```
1. OpenForge reads the current project's .kovina/standards.json (pinned version)
2. OpenForge reads the latest standards manifest
3. If the pinned version is older, OpenForge offers an upgrade
4. Upgrade applies template changes only — never modifies user-written code
5. Upgrade records all changes in .kovina/forge.json
6. Upgrade updates .kovina/standards.json with the new version
```

---

## 18. Reproducibility

### Guarantee

Generating a project from the same profile against the same standards version and the same templates produces the same output file set (ignoring timestamps).

### Requirements

| Requirement | Implementation |
|---|---|
| Template variable replacement is deterministic | Same inputs → same outputs |
| File ordering in outputs is sorted | Consistent diff ordering |
| Timestamps are generated but not used for content decisions | Deterministic content |
| The checksum in `.kovina/forge.json` covers all variable inputs | Reproducibility verification |
| OpenForge version is recorded | Reproduction context |

---

## 19. Agent Expectations

### AI Agent Behavior With OpenForge

When an AI agent works alongside OpenForge:

| Scenario | Expected Behavior |
|---|---|
| An AI agent runs OpenForge to scaffold a new project | Accept the output, fill in the remaining 20% |
| An AI agent needs to create a standard | The standard is written in the `kovina` repository, not invented per-project |
| An AI agent encounters a template variable it does not recognize | Leave it as-is with a warning — do not invent a replacement |
| An AI agent modifies a file generated by OpenForge | The file is marked as "modified by agent" in `.kovina/forge.json` |
| An AI agent detects a standards gap | Propose a new standard for the `kovina` repository |

### Agent Rules for OpenForge

| Rule | Rationale |
|---|---|
| An agent using OpenForge does not modify OpenForge's behavior | OpenForge is a deterministic tool |
| An agent running OpenForge does not skip the compliance preview | Gap awareness |
| An agent running OpenForge does not suppress warnings | Visibility into issues |
| An agent that customizes a scaffolded project records what was customized | Audit trail |

---

## 20. Prohibited Generator Behavior

| Pattern | Why It Is Prohibited |
|---|---|
| **Inventing standards that do not exist** | OpenForge is a consumer, not an author. Missing standards should be added to the `kovina` repository. |
| **Modifying template content beyond variable replacement** | Templates are canonical — modification must happen in the `kovina` repository. |
| **Generating files outside the project directory** | Side effects beyond the project boundary. |
| **Deleting files the user created** | Only files OpenForge generated may be overwritten. |
| **Generating source code logic beyond boilerplate** | Application logic is the developer's responsibility. |
| **Silently overwriting user-modified files** | Overwrite requires user confirmation or `--force`. |
| **Failing to create `.kovina/` metadata** | Without metadata, OpenAudit cannot verify the project. |
| **Ignoring the standards manifest** | The manifest defines what rules exist. |
| **Loading templates from sources other than `standards/templates/`** | Canonicity — all templates live in one place. |

---

## 21. QA Checklist

- [ ] Scaffolding produces all required root files (README, LICENSE, CHANGELOG, CONTRIBUTING, SECURITY).
- [ ] `.kovina/project.json` is created with correct project identity.
- [ ] `.kovina/standards.json` is created with correct version pinning and compliance statuses.
- [ ] `.kovina/forge.json` is created with generation audit trail.
- [ ] Template variables are correctly replaced — no `{{...}}` placeholders remain.
- [ ] Scaffold validation passes — all required files and directories exist.
- [ ] Compliance preview is generated at the project root.
- [ ] `COMPLIANCE_PREVIEW.md` accurately reflects the state of generated files.
- [ ] Overwrite behavior respects existing user modifications (no silent overwrites).
- [ ] Upgrade process does not modify user-written code.
- [ ] Reproducibility test passes — same profile + same standards version = same output.
- [ ] Warnings are logged for missing templates, unknown variables, and validation issues.
- [ ] No files are generated outside the project directory.

---

## 22. Agent Checklist

Before an AI agent declares OpenForge work complete:

### Generation

- [ ] All required root files were generated (README, LICENSE, CHANGELOG, CONTRIBUTING, SECURITY).
- [ ] Template variables were replaced — no `{{...}}` placeholders remain in any generated file.
- [ ] `.kovina/` directory exists with all three metadata files.
- [ ] `.kovina/project.json` has correct identity fields.
- [ ] `.kovina/standards.json` pins the correct standards version with accurate statuses.
- [ ] `.kovina/forge.json` records the generation with full file list.

### Validation

- [ ] Post-generation validation passed.
- [ ] Any validation warnings were reviewed and resolved or documented.
- [ ] Compliance preview was generated.

### Integrity

- [ ] No files were overwritten without awareness (files_skipped is accurate).
- [ ] No files were generated outside the project directory.
- [ ] No user content was deleted or modified.
- [ ] No invented rules or standards were applied.

### Upgrade (if applicable)

- [ ] Pinned standards version was updated in `.kovina/standards.json`.
- [ ] Only templates changed — user code was not modified.
- [ ] Upgrade was recorded in `.kovina/forge.json`.

### Reproducibility

- [ ] Checksum was recorded in `.kovina/forge.json`.
- [ ] Same inputs produce the same output (verified by re-run test).

---

*This standard defines OpenForge, the Kovina project scaffolding engine. Companion to [OPENAUDIT_STANDARD.md](OPENAUDIT_STANDARD.md) (compliance verification), [PROJECT_STRUCTURE_STANDARD.md](../process/PROJECT_STRUCTURE_STANDARD.md) (canonical repository layout), [VERSION.md](../VERSION.md) (standards versioning), and template files in `standards/templates/`.*
