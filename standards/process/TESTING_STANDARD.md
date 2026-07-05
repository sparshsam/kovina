# Testing Standard

## Philosophy

Tests are part of shipping. Untested changes are not complete.

## Requirements

Every Kovina project should include:

| Type | Requirement |
|---|---|
| Unit tests | Core logic, utilities, data processing |
| Component tests | UI components (where applicable) |
| Integration tests | API endpoints, database interactions |
| Build tests | `npm run build` or equivalent must succeed |

## Coverage

- Core logic: 80%+ coverage target.
- Edge cases: explicitly tested.
- Error states: tested, not assumed.

## CI

- Tests must run in CI before merge.
- CI failure blocks release.
- Flaky tests are treated as bugs.
