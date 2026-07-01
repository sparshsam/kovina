# Open Product Family — Naming Standards

## Canonical Product Names

The following is the complete list of official Open product names:

| Product | Display name | Repository slug |
|---|---|---|
| OpenReader | OpenReader | openreader |
| OpenProof | OpenProof | openproof |
| OpenLedger | OpenLedger | openledger |
| OpenGallery | OpenGallery | opengallery |
| OpenSnap | OpenSnap | opensnap |
| OpenPalette | OpenPalette | openpalette |
| OpenTone | OpenTone | opentone |
| OpenJournal | OpenJournal | openjournal |
| OpenSprout | OpenSprout | opensprout |
| OpenSend | OpenSend | opensend |
| OpenScrabble | OpenScrabble | openscrabble |

## Rules

### Display Name

✅ OpenReader
✅ OpenProof
✅ OpenLedger

❌ Open Reader (space between Open and product name)
❌ openreader (lowercase)
❌ OPENREADER (all caps)
❌ reader (missing Open prefix)
❌ open-reader (hyphen in display name)

**Rule:** PascalCase. "Open" prefix directly attached to the product name. No spaces. No hyphens. No lowercase prefixes.

### Repository Slug

✅ openreader
✅ openproof
✅ openledger

❌ OpenReader (PascalCase in repo slugs)
❌ open-reader (hyphens)
❌ open_reader (underscores)

**Rule:** Lowercase. No hyphens. No underscores. No dots. Direct concatenation of "open" + product name in lowercase.

### Prefix Restriction

Only **Kovina** and **Open** may appear before the product name.

✅ Kovina (parent ecosystem)
✅ OpenReader (product)
✅ OPEN Reader (lockup)

❌ Kovina Open Reader (double prefix)
❌ Kovina's OpenReader (possessive)

Never stack additional brand prefixes before the product name.

## Future Products

When creating a new Kovina application:

1. Choose a product name (single word, PascalCase).
2. Prepend "Open" to form the display name.
3. Create the repository slug as lowercase concatenation.
4. Add the lockup using the template in `templates/app-title-template.svg`.
5. Add the product to the lockups directory.
