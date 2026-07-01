# Kovina Brand Guidelines

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
| **Color** | #111111 (light) / #FFFFFF (dark) |

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

## Application Branding

Each Open* application may define its own accent color and visual identity within the Kovina ecosystem framework. Application logos should reference the Kovina wordmark in their documentation but are not required to include it in their own app icons.

Application branding guidelines should be maintained in their respective repositories under `assets/branding/`.

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
