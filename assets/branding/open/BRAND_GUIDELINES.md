# Open Product Family — Brand Guidelines

## Purpose

The Open brand identity creates a consistent visual system for every Kovina application beginning with "Open". It is a **product family** brand, not a parent ecosystem brand. Kovina remains the parent.

## Hierarchy

```
Level 1    KOVINA          Parent ecosystem (frozen)
Level 2    OPEN            Product family (this system)
Level 3    Reader          Individual product
```

**Why this hierarchy exists:**
- Kovina is the umbrella — it represents the philosophy, ecosystem, and long-term stewardship.
- Open is the product family — it signals that an application belongs to the Kovina ecosystem and follows its standards.
- The product name is the application's own identity — Reader, Proof, Ledger, etc.

This three-level system allows Kovina to remain stable while the Open family grows. Applications can be added, renamed, or retired without affecting the parent brand.

## Relationship with Kovina

- KOVINA is always visually dominant. Open is subordinate.
- Open branding should never appear without a Kovina reference in the same context.
- In practice: KOVINA appears in headers and ecosystem references; OPEN appears in product lockups and application-level branding.

## Typography

| Role | Typeface | Weight | Tracking |
|---|---|---|---|
| OPEN wordmark | Inter | Bold (700) | 0.05em |
| Product name (lockup) | Inter | Medium (500) | 0em |
| Headings (docs) | Inter | Bold (700) | — |
| Body (docs) | Inter | Regular (400) | — |

**Rationale:**
- **Bold (700)** for OPEN differentiates it from KOVINA's **Black (900)** while remaining clearly part of the same typeface family.
- **0.05em tracking** gives the OPEN wordmark a deliberate, considered rhythm that subtly separates it from the product names.
- **Medium (500)** for product names keeps them readable and present — the product name is the star of the lockup, not an afterthought. Medium strikes the balance between subordinate (Regular) and competitive (Bold).

## Spacing

| Context | Rule |
|---|---|
| Lockup: OPEN to product | 1.5× the width of the letter "O" in OPEN |
| Clear space (wordmark) | Height of "O" on all sides |
| Clear space (lockup) | Height of "O" on all sides |

## Alignment

### Horizontal Lockup (primary — 95% of use)

**OPEN** _Product_

OPEN is always uppercase. Product name is always title case.

### Stacked Lockup (splash screens, heroes, about pages)

```
OPEN
Product
```

OPEN centered above the product name. Both centered. Used when horizontal space is limited.

Never rotate OPEN or the lockup.

## Minimum Sizes

| Medium | OPEN wordmark | Lockup |
|---|---|---|
| Digital | 40px wide | 120px wide |
| Print | 12mm wide | 36mm wide |
| Header/nav | 20px wide | — |

## Colors

The Open brand inherits the Kovina color palette. No additional colors are introduced.

| Token | Value | Usage |
|---|---|---|
| Black | #111111 | Wordmark on light backgrounds |
| White | #FFFFFF | Wordmark on dark backgrounds |
| Gray | #555555 | Secondary text, metadata |

The accent color `#099019` is reserved for application-level interactive elements and is not part of the Open wordmark or lockup.

## Dark Mode

| Background | OPEN fill | Product fill |
|---|---|---|
| Light (#FFFFFF) | #111111 | #111111 |
| Dark (#111111) | #FFFFFF | #FFFFFF |
| Any | #111111 | #555555 (optional secondary) |

## Incorrect Usage

Never:

❌ Use a weight other than Bold (700) for OPEN.
❌ Use a weight other than Regular (400) for the product name.
❌ Change the tracking of OPEN (must be 0.05em).
❌ Change the tracking of the product name (must be 0em).
❌ Stack OPEN above the product name vertically.
❌ Add icons, symbols, or graphics to the lockup.
❌ Add shadows, outlines, or gradients.
❌ Stretch, skew, or rotate.
❌ Change the typeface from Inter.
❌ Use OPEN without a product name (wordmark-only use is acceptable for headers).
❌ Place OPEN on a colored background without adequate contrast.

## Application Icons — Relationship

**Every application owns its own icon. OPEN never has an icon.**

OPEN is typography only. It is a wordmark, not a symbol, not a badge, not a logo mark.

- Application icons represent the individual product (Reader, Proof, Ledger, etc.).
- The OPEN wordmark represents the product family.
- They serve different purposes and must not be combined into a single mark.
- Never create an "Open icon" or an "Open symbol."

## Application Branding

Every Open application:
1. Uses the Open lockup (OPEN + product name) in its README and website hero.
2. Defines its own accent color for interactive elements.
3. Maintains its own app icon (outside the scope of this family brand).
4. References Kovina as the parent ecosystem in its README footer.

## Repository Usage

Each Open repository should include:
- `assets/branding/open-wordmark.svg` (or reference from this directory)
- A README hero section using the Open lockup
- The Kovina ecosystem footer

## Website Usage

- **Header:** KOVINA wordmark (parent brand)
- **Hero/landing:** OPEN lockup or OPEN wordmark + product name
- **Footer:** Kovina ecosystem reference with Open family note

## Store Listing Usage

- Microsoft Store listing icon: Application icon (not the Open wordmark).
- Microsoft Store title: "OpenReader" (not "OPEN Reader").
- The Open lockup may be used in screenshots and marketing imagery.

---

## Prefix Restriction

Only **Kovina** and **Open** may appear before a product name in any branding context.

✅ KOVINA (parent)
✅ OPEN Reader (lockup)  
✅ OpenReader (product name)

❌ Kovina Open Reader (double prefix — never)

This prevents prefix stacking and ensures brand hierarchy remains clean as the ecosystem grows.

---

*This document is part of the Open Brand Assets v0.9.0. Review candidate — not yet frozen.*
