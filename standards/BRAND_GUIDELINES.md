# Kovina Brand Guidelines

## Brand Philosophy

Kovina represents software that is calm, durable, transparent, and built to last. The identity intentionally avoids visual trends, decorative effects, and excessive branding. The software—not the logo—is the focus. Simplicity, restraint, and longevity guide every visual decision.

---

## Mission

To forge personal software that is owned, understood, and kept—tools that respect attention, preserve privacy, and remain useful across a lifetime.

## Values

- **Ownership** — software you can keep, modify, and trust.
- **Privacy** — no telemetry, no accounts, no surveillance.
- **Calm** — quiet, focused, non-extractive design.
- **Durability** — built to last decades, not quarters.
- **Restraint** — less is more. Every feature must earn its place.

## Voice

| Attribute | Tone |
|---|---|
| Tone | Calm, editorial, confident |
| Register | Professional but warm |
| Complexity | Clear, direct, no jargon |
| Personality | Quiet craftsmanship |

---

## Brand Promise

Every Kovina application is built with the same principles:

- **Open source** — AGPLv3 or MIT licensed.
- **Privacy-first** — no telemetry, no accounts required.
- **Local-first where practical** — your data stays on your machine.
- **Exportable data** — no lock-in, no proprietary formats.
- **No dark patterns** — no engagement loops, no deceptive UI.
- **Clear interfaces** — calm, editorial, typography-driven.
- **Long-term maintainability** — built to be forked, self-hosted, and kept.
- **Respect for user ownership** — software you can keep.

---

## Logo Hierarchy

| Level | Brand | Purpose |
|---|---|---|
| Level 1 | Kovina | Parent ecosystem |
| Level 2 | Open | Product family prefix |
| Level 3 | Reader / Proof / Ledger | Individual applications |

### Reserved: The Open Family Identity

The Open family identity will become a standardized visual system shared across every Kovina application beginning with "Open". Product-specific branding will build upon this common identity while remaining visually distinct. This specification is reserved for future design work.

---

## Logo

Kovina uses a **wordmark-only** identity. There is no symbol, mascot, or abstract mark. The wordmark is the logo.

### Primary Logo

```
KOVINA
```

| Property | Value |
|---|---|
| **Type** | Wordmark |
| **Typeface** | Inter |
| **Weight** | Black (900) |
| **Letter spacing** | -0.03em |
| **Case** | Uppercase |
| **Color** | `#111111` (light) / `#FFFFFF` (dark) |

Scale proportionally to the intended use.

### Secondary Logo (header/nav variant)

```
KOVINA
```

| Property | Value |
|---|---|
| **Typeface** | Inter |
| **Weight** | Bold (700) |
| **Letter spacing** | 0.1em |
| **Case** | Uppercase |

Use for navigation bars, dense UI, and applications where the primary logo is too large.

### Asset Files

Located in `assets/branding/logos/`:

| File | Description |
|---|---|
| `kovina-wordmark-black.svg` | Primary — black on transparent |
| `kovina-wordmark-white.svg` | Primary — white on dark background |
| `kovina-wordmark-monochrome.svg` | Monochrome variant |
| `kovina-wordmark-header.svg` | Secondary — header/nav variant |
| `kovina-favicon.svg` | Square app icon / favicon |
| `kovina-social.svg` | Social sharing card (1200×630) |

---

## Grid System

All Kovina layouts should align to a consistent spacing grid:

| Token | Value |
|---|---|
| Base unit | 4px |
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

This applies to logos, splash screens, documentation layouts, and website spacing. All margins, paddings, and gaps should fall on these increments.

---

## Icon Philosophy

Application icons should be:

- **Simple** — minimal detail, geometric shapes.
- **Recognizable at small sizes** — legible from 16×16 through 512×512 pixels.
- **Restrained color palettes** — appropriate to each application's identity.
- **Free of unnecessary detail** — no gradients, shadows, or textures.

Icon style should favor filled shapes, consistent stroke weights, and clear silhouettes.

---

## Clear Space

Maintain clear space equal to the height of the letter **K** on all sides of the wordmark.

```
┌──────────────────────────────┐
│        (clear space)          │
│         ┌──────┐              │
│    ░░░░░│KOVINA│░░░░░         │  ← K height
│         └──────┘              │
│        (clear space)          │
└──────────────────────────────┘
```

No other elements may intrude into this space.

---

## Minimum Size

| Medium | Minimum |
|---|---|
| Digital (primary) | 80px wide |
| Digital (header) | 40px wide |
| Print (primary) | 25mm wide |
| Print (header) | 12mm wide |

Below these sizes, use the header variant.

---

## Incorrect Usage

Never:

❌ **Stretch** — maintain aspect ratio.
❌ **Skew** or distort.
❌ **Rotate** — always horizontal.
❌ **Change font** — Inter only.
❌ **Recolor** — use only specified colors.
❌ **Add shadows** or glow effects.
❌ **Add gradients** — flat color only.
❌ **Add outlines** — no strokes on letterforms.
❌ **Change letter spacing** — use only defined tracking values.
❌ **Rearrange** or stack letters.

✅ Correct example — horizontal wordmark, flat color, correct tracking, adequate clear space.

---

## Colors

Kovina itself uses a restrained neutral palette. The individual applications bring color.

### Brand Palette

| swatch | Token | Value | Usage |
|---|---|---|---|
| ■ | Black | `#111111` | Primary text / logo on light |
| ■ | Gray | `#555555` | Secondary text |
| ■ | White | `#FFFFFF` | Logo on dark / backgrounds |
| ■ | Dark | `#111111` | Background dark mode |

### Accent Color

The accent color `#099019` is owned by the **applications**, not the Kovina brand itself. It is used for interactive elements and status indicators across the ecosystem.

---

## Typography

| Role | Typeface | Weight |
|---|---|---|
| Brand wordmark | Inter | Black (900) |
| Headings | Inter | Bold (700) – Black (900) |
| Body | Inter | Regular (400) – Medium (500) |
| Code / mono | Geist Mono | Regular (400) – Bold (700) |
| Decorative titles | NotoSansSymbols2 | Regular |

No other typefaces should be used in Kovina-branded materials.

---

## Naming Convention

All Kovina applications follow this naming pattern:

```
OpenReader
OpenProof
OpenLedger
OpenPalette
OpenJournal
OpenTone
OpenSprout
OpenConvert
OpenScrabble
OpenSend
OpenSnap
```

### Rules

- **PascalCase** — always.
- **Prefix** — always "Open" for product applications.
- **No hyphens** in display names (hyphens allowed in repository slugs).
- **No abbreviations** — spell out fully.
- **No version numbers** in names.
- **Non-Open exceptions** — individual projects may omit the prefix (Hisstastic, WordWise, Chess by Sparsh, Elora Vault, SheSafe, World Clock Widget).

---

## Application Branding

Each Open* application may define its own accent color and visual identity within the Kovina ecosystem framework. Application logos should reference the Kovina wordmark in their documentation but are not required to include it in their own app icons.

Application branding guidelines should be maintained in their respective repositories under `assets/branding/`.

---

## Repository Standards

Every Kovina ecosystem repository should include:

```
README.md              # Premium showroom landing page
LICENSE                # AGPLv3 or MIT
CHANGELOG.md           # Release history
CONTRIBUTING.md        # Contribution guide
SECURITY.md            # Security policy
CODE_OF_CONDUCT.md     # Code of conduct
SUPPORT.md             # Support information
assets/
  branding/            # Brand assets (logos, colors)
  screenshots/         # App screenshots
  hero/                # Hero images
docs/                  # Developer documentation
.github/               # GitHub templates and workflows
```

This consistency ensures every repository feels like part of the same ecosystem.

---

## File Naming Convention

```
kovina-{type}-{variant}.{ext}
```

Examples:
- `kovina-wordmark-black.svg`
- `kovina-wordmark-white.svg`
- `kovina-favicon.svg`
- `kovina-social.svg`

No "final", "old", or version suffixes.

---

## Reference Documents

The following documents define the shared design, architecture, and MCP standards across all Kovina projects. They live in the kovina repository as the single source of truth:

| Document | Location | Purpose |
|---|---|---|
| Design Playbook | `references/DESIGN_PLAYBOOK.md` | UI/UX design system, visual principles, component rules |
| Product Architecture Playbook | `references/PRODUCT_ARCHITECTURE_PLAYBOOK.md` | Architecture patterns, data flow, state management |
| MCP Server Build Guide | `references/MCP-SERVER-BUILD-GUIDE.md` | MCP server specification, tools, auth, deployment |

Every Kovina repository should reference these from its own `CLAUDE.md`.
