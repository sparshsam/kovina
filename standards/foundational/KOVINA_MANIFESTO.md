# Kovina Manifesto

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> This document is a constitution. Every Kovina project and every contributor—human or AI—reads and follows it before writing a line of code.

---

## Why Kovina Exists

Most software today is rented. You pay monthly, you own nothing, and when you stop paying, it stops working. Your data is locked in, your attention is the product, and your trust is a growth surface.

Kovina exists to create software that people can **own, understand, and rely on** without manipulation.

---

## What Belongs in Kovina

### ✅ Belongs

- **Utilities** — tools that solve real problems
- **Productivity** — software that respects focus
- **Knowledge** — systems for learning and recall
- **Creativity** — tools for making and expressing
- **Evidence** — records, proofs, and verifiable claims
- **Local-first** — applications that work offline by design
- **Infrastructure** — foundational systems that enable other tools

### ❌ Does Not Belong

- **Social media** — infinite feeds and engagement loops
- **Advertising** — surveillance-driven business models
- **Infinite feeds** — software optimized for addiction
- **Engagement platforms** — systems that monetize attention
- **Gambling** — zero-skill betting mechanics (financial infrastructure is distinct)
- **Growth hacking** — dark patterns disguised as product decisions

Every new project idea passes through this filter before it begins.

---

## Software Principles

Every Kovina project must satisfy these principles:

1. **Useful first** — solves a real problem before adding features.
2. **Calm** — quiet, focused, non-extractive. No notifications as a default.
3. **Fast** — responsive by default, optimized for perceived performance.
4. **Exportable** — data leaves in standard formats, not proprietary locks.
5. **Privacy-respecting** — no telemetry, no accounts required, no surveillance.
6. **Long-lived** — designed to work for decades, not shipped and abandoned.
7. **Offline where practical** — local-first when the use case allows.
8. **Minimal dependencies** — every dependency is a risk. Choose carefully.
9. **Human-understandable** — a competent developer can read the code and understand the system.

---

## Product Principles

1. **One primary problem** — every Open application solves one thing exceptionally well. Not twenty things poorly.
2. **Clear scope** — defined boundaries prevent feature creep.
3. **Opinionated defaults** — sensible out-of-the-box, configurable when needed.
4. **User ownership** — the user controls their data, their workflow, and their exit.

---

## Design Principles

1. **Calm over clever** — the design should never demand attention. It should earn it.
2. **Confidence over decoration** — visual restraint communicates confidence. Ornament hides uncertainty.
3. **Space over borders** — use whitespace to separate, not lines and boxes.
4. **Typography over ornament** — hierarchy is achieved through type, not decoration.
5. **Systems over trends** — every design decision fits a system. Trends fade; systems endure.

---

## Engineering Principles

1. **Prefer boring technology** — proven, well-understood, widely supported.
2. **Prefer maintainability** — code is read far more often than it is written.
3. **Avoid lock-in** — no proprietary platforms, no irreversible architectural commitments.
4. **Prefer open standards** — formats, protocols, and interfaces that anyone can implement.
5. **Documentation is part of the product** — undocumented features do not exist.
6. **Tests are part of shipping** — untested changes are not complete.

---

## AI Principles

1. **AI is an implementation tool, not the product.** — the value is in what the software does, not how it was made.
2. **Humans remain accountable for every release.** — AI generates, humans verify and ship.
3. **AI-generated code receives the same review standards as human-written code.** — no shortcuts, no exceptions.
4. **AI agents must read the standards before writing code.** — every session begins with the Manifesto, Design Playbook, Architecture Playbook, and MCP Guide.
5. **Institutional knowledge lives in documents, not in model training.** — standards are written and maintained, not assumed.

---

## Ecosystem Lifecycle

Every Kovina project passes through these stages:

```
Idea → Prototype → Experimental → Beta → Stable → Mature → Maintenance → Archived
```

| Stage | Description |
|---|---|
| **Idea** | Concept exists. No code written. |
| **Prototype** | Proof of concept. May be discarded. |
| **Experimental** | Working but unstable. API may change. Not recommended for production use. |
| **Beta** | Feature-complete. Polishing and bug fixing. Ready for testing. |
| **Stable** | Ready for general use. API is stable. Backward compatibility expected. |
| **Mature** | Battle-tested. Performance-optimized. Well-documented. Long-term support. |
| **Maintenance** | Active development complete. Critical fixes only. |
| **Archived** | Read-only. No further changes. |

Not every project reaches Mature. That is acceptable. Projects may also return from Maintenance to Active development if circumstances change.

---

## Release Philosophy

- **Release early. Iterate often.**
- **Never abandon users silently.** — every deprecation is communicated clearly with migration paths.
- **Archive transparently.** — archived projects remain readable, forkable, and citable.
- **Never fake progress.** — no artificial release cadence, no version inflation.
- **Semantic versioning** — MAJOR.MINOR.PATCH with clear breaking-change policies.
- **Changelogs are mandatory** — every release documents what changed, why, and how to migrate.

---

## Documentation Philosophy

Every Kovina project, regardless of size, must contain:

| File | Purpose |
|---|---|
| `README.md` | What this project is, why it exists, and how to use it |
| `CHANGELOG.md` | Release history with dates and notable changes |
| `LICENSE` | AGPLv3 or MIT |
| `CONTRIBUTING.md` | How to contribute |
| `SECURITY.md` | How to report vulnerabilities |
| `CODE_OF_CONDUCT.md` | Community standards |

Larger projects should also include:

| File | Purpose |
|---|---|
| `ROADMAP.md` | Planned direction and milestones |
| `PRIVACY.md` | Data handling and privacy policy |
| `docs/` | Developer documentation |

---

## Ecosystem Philosophy

Every Kovina application should feel like it was made by the same organization while remaining its own product.

- Consistent repository structure.
- Consistent code quality standards.
- Consistent design language.
- Consistent documentation expectations.
- Independent product identity and roadmap.

The ecosystem is a collection of individual tools united by shared principles, not a single monolithic product.

---

## Agent Constitution

Every AI coding session begins by reading:

```
standards/
  KOVINA_MANIFESTO.md
  BRAND_GUIDELINES.md
  DESIGN_PLAYBOOK.md
  PRODUCT_ARCHITECTURE_PLAYBOOK.md
  MCP_SERVER_BUILD_GUIDE.md
```

The agent then understands **how to think**, **how to design**, **how to code**, and **how to structure** before writing a single line.

This is how institutional knowledge is preserved — not in model training, but in documents that every session reads.
