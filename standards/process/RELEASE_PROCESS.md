# Release Process

## Versioning

All Kovina projects follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes, significant rewrites, architectural shifts.
- **MINOR** — new features, non-breaking additions.
- **PATCH** — bug fixes, small improvements, documentation.

## Release Stages

| Stage | Description | Version convention |
|---|---|---|
| Experimental | Working but unstable | `0.{N}.{M}` |
| Beta | Feature-complete, polishing | `0.{N}.{M}-beta` |
| Release Candidate | Final testing before stable | `{N}.{M}.{P}-rc` |
| Stable | General availability | `{N}.{M}.{P}` |

## Checklist

Before every release:

- [ ] All tests pass.
- [ ] CHANGELOG.md updated with all changes.
- [ ] Version bumped in package.json / Cargo.toml / etc.
- [ ] README.md reflects current state.
- [ ] Screenshots in README and assets/ are current.
- [ ] All download links tested.
- [ ] All website links tested.
- [ ] Breaking changes documented with migration paths.
- [ ] Tag created in git.
- [ ] Release notes written on GitHub.
