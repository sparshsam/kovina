# Documentation Standard

## Requirements

Every Kovina project must include:

| File | Required | Purpose |
|---|---|---|
| `README.md` | Yes | What, why, how to use |
| `LICENSE` | Yes | AGPLv3 or MIT |
| `CHANGELOG.md` | Yes | Release history |
| `CONTRIBUTING.md` | Yes | How to contribute |
| `SECURITY.md` | Yes | Vulnerability reporting |
| `CODE_OF_CONDUCT.md` | Yes | Community standards |
| `SUPPORT.md` | Yes | Support information |

## README Structure

The README should follow the showroom standard:

1. **Hero** — app icon, name, one-line value proposition, hero screenshot
2. **Primary CTA** — download/use links (Store, website, latest release, source code)
3. **Gallery** — large screenshots, desktop/mobile, dark/light mode
4. **Why This App** — short user-focused explanation
5. **Features** — clean two-column grid or table
6. **Built With** — technologies, prefer icons over paragraphs
7. **Version Journey** — timeline of important releases
8. **License**

Developer-focused content goes in `docs/`, not the README.

## Changelog Format

```markdown
## [Version] — YYYY-MM-DD

### Added
- New features.

### Changed
- Behavior changes.

### Fixed
- Bug fixes.

### Removed
- Deprecated features removed.
```
