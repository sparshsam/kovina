# Data Storage Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.2.0](../VERSION.md)
>
> Canonical data architecture standard for every Kovina Open project. Defines how data is stored, persisted, synchronized, exported, imported, and deleted — the memory of the app organism.
>
> Platform documents reference this standard rather than defining their own storage rules.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Local-First Principle](#3-local-first-principle)
4. [Data Classification](#4-data-classification)
5. [What Data May Be Stored](#5-what-data-may-be-stored)
6. [What Must Never Be Stored](#6-what-must-never-be-stored)
7. [User-Owned Data](#7-user-owned-data)
8. [Export & Import](#8-export--import)
9. [Backup & Restore](#9-backup--restore)
10. [Offline Behavior](#10-offline-behavior)
11. [Sync Behavior](#11-sync-behavior)
12. [Conflict Handling](#12-conflict-handling)
13. [Schema Versioning & Migrations](#13-schema-versioning--migrations)
14. [Data Deletion](#14-data-deletion)
15. [Cache vs User Data](#15-cache-vs-user-data)
16. [File Formats](#16-file-formats)
17. [Encryption Expectations](#17-encryption-expectations)
18. [Recovery States](#18-recovery-states)
19. [Storage Limits](#19-storage-limits)
20. [Auditability](#20-auditability)
21. [App-Specific Data Policies](#21-app-specific-data-policies)
22. [Prohibited Storage Patterns](#22-prohibited-storage-patterns)
23. [QA Checklist](#23-qa-checklist)
24. [Agent Checklist](#24-agent-checklist)

---

## 1. Authority

### This document owns

- Local-first philosophy and architecture for all Kovina applications.
- Data classification — what may be stored and what must never be stored.
- User-owned data principles, export/import requirements, backup/restore expectations.
- Offline behavior, sync behavior, and conflict resolution.
- Schema versioning, data migrations, and data deletion.
- Cache strategy (from the user's data perspective, not performance), file formats, and encryption expectations.
- Storage limits, recovery states, auditability, and app-specific data policy requirements.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Security of data in transit and at rest (encryption algorithms, key management) | [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md) |
| Performance-focused caching strategies (CDN, HTTP cache, service worker) | [PERFORMANCE_STANDARD.md](../shared/PERFORMANCE_STANDARD.md) |
| Database technology selection (SQLite, PostgreSQL, IndexedDB, etc.) | Product architecture (per-project) |
| Platform-specific storage API details (UserDefaults, SharedPreferences, etc.) | Platform standards |
| Privacy policy content and legal compliance | [WEBSITE_STANDARD.md](../platforms/WEBSITE_STANDARD.md) |

### Dependencies

This document works alongside [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md) (encryption and sensitive data handling), [PERFORMANCE_STANDARD.md](../shared/PERFORMANCE_STANDARD.md) (cache strategy), and platform standards (per-platform storage API guidance). Platform standards reference this document instead of defining their own data storage rules.

---

## 2. Philosophy

The user's data belongs to the user. The application is a caretaker, not an owner.

Kovina applications are **local-first by default**. The primary copy of user data lives on the user's device. Cloud synchronization is a convenience that extends the user's reach — it is not the source of truth. This principle drives every storage decision:

- **Offline is the default state.** The application must function fully without a network connection. Sync is a background concern, not a gate.
- **The user can leave at any time.** Data export is not a feature — it is a requirement. Import is the guarantee that no prior investment is lost.
- **Data is not locked in.** Every stored format is documented, open, and portable. Proprietary binary formats that cannot be read outside the application are prohibited.
- **Cache and data are distinct.** Cached content is disposable. User data is permanent until the user deletes it. The distinction is enforced at the storage layer, not just in the code.

---

## 3. Local-First Principle

### Definition

A local-first application stores and operates on the primary copy of user data on the user's device. The cloud is a synchronization layer, not a persistence layer.

### Requirements

| Requirement | Rationale |
|---|---|
| Every user action must succeed without a network round-trip | The app works on a plane, in a tunnel, offline |
| The local database/state is the source of truth | Sync is eventually consistent, not transactionally authoritative |
| Cloud data is derived from local data, not the reverse | The device directs, the cloud follows |
| Sync is asynchronous and non-blocking | The user never waits for sync to complete before acting |
| Conflict resolution favors the user's local changes by default | The local device represents the user's intent |
| First launch sets up local storage before attempting any network call | No data dependency on connectivity |

### Local-First Exceptions

| Exception | Rationale | Mitigation |
|---|---|---|
| Server-side only applications (MCP servers, backend APIs) | No user device to store data locally | Follow cloud-native persistence patterns with same export/import guarantees |
| Read-only reference data (public app catalogs, store listings) | Data is owned by the ecosystem, not the user | Cache aggressively, show staleness indicators |
| Authentication tokens | Must be accessible to the server for verification | Store locally with encryption, sync only for token refresh |

---

## 4. Data Classification

Every datum in a Kovina application belongs to exactly one classification:

| Class | Definition | Examples | Storage Rule |
|---|---|---|---|
| **User Data** | Content the user created, imported, or configured | Documents, scans, notes, preferences, tags | Primary copy on device. Synced to cloud. Exportable. |
| **Cached Content** | Referenced or computed data that can be regenerated | API responses, thumbnails, lookup tables, weather data | Stored locally. Disposable. No sync. |
| **Operational State** | Application runtime state that has no meaning outside the app | Scroll position, UI states, last-opened tab | Stored locally. Not synced. Not exportable. |
| **Analytics** | Usage data (only with user consent) | Crash reports, feature usage counters | Never by default. Only with explicit opt-in. |
| **Authentication** | Credentials and session information | Tokens, session cookies, refresh tokens | Stored securely via platform credential store. |

### Classification Rules

| Rule | Rationale |
|---|---|
| Every stored field is tagged with its classification | Auditability, export scoping, deletion correctness |
| User data and cached content are stored in separate databases or tables | Cache can be purged without affecting user data |
| Authentication data is never stored alongside application data | Security boundaries |
| Operational state is automatically cleared on app uninstall | No orphaned data |

---

## 5. What Data May Be Stored

A Kovina application may store:

### User Data

- Content the user explicitly creates (documents, entries, records).
- Content the user imports (files, data from other applications).
- User preferences and settings (within the app's scope).
- Tags, categories, metadata the user assigns to their content.
- History of user actions where needed for app functionality (undo, recent items).
- Offline changes queued for sync.

### Operational State

- UI state: selected tab, scroll position, expanded sections.
- Session state: authentication status, active user.
- Last-used settings: default sort order, view mode, recently used options.

### Cached Content

- API responses that are expensive to fetch (with a defined TTL).
- Generated assets (thumbnails, previews, computed summaries).
- Reference data that changes infrequently (app configuration, public catalogs).
- Downloaded media for offline viewing (with user awareness).

---

## 6. What Must Never Be Stored

| Prohibited Data | Rationale |
|---|---|
| Plaintext passwords or credentials of any kind | Irreversible compromise if the database is compromised |
| Authentication tokens in application databases | Tokens belong in the platform credential store |
| Unencrypted PII (personally identifiable information) beyond what the app explicitly requires | Data minimization |
| Health information, financial account numbers, or government IDs | Not relevant to Kovina's application categories |
| The user's real-time location without explicit, per-session consent | Privacy boundary |
| Content from other users without that user's consent (in multi-user apps) | Data ownership |
| Any data the app does not need to function | Data minimization principle |
| Cryptographic private keys that belong to the user | User-owned secrets, not app-managed |
| Keystroke-level interaction data | Surveillance, anti-pattern |

---

## 7. User-Owned Data

### Ownership Principle

Data created or imported by the user is the user's property. The application claims no ownership, license, or right to use it beyond what is necessary to provide the application's functionality.

### Ownership Rules

| Rule | Assurance |
|---|---|
| The application does not claim intellectual property rights over user data | Stated in terms of service / privacy policy |
| User data is not used for training AI models | Separate, explicit, opt-in consent required |
| User data is not sold, shared, or monetized | Core privacy guarantee |
| User data is not analyzed beyond what the app needs to function | Functional boundary |
| User data deletion by the user is honored within 30 days | Maximum retention window after delete request |

---

## 8. Export & Import

### Export Requirements

Every Kovina application that stores user data must provide an export mechanism.

| Requirement | Standard |
|---|---|
| Export includes all user data in a portable, documented format | JSON, CSV, or open standard formats only |
| Export includes all assets (images, files) as separate files, not embedded binaries | File-level access |
| Export does not require a network connection | Works entirely offline |
| Export completes within a reasonable time (≤ 30 seconds for typical datasets) | User patience limit |
| Export excludes operational state and cached content | Only user-meaningful data |
| Export format is documented in `docs/` | Third-party readability |
| Export is available from the settings page | Standard discoverable location |
| Automated export (scheduled or triggered) is not required but may be offered | Power user convenience |

### Export Format

The standard export format is a directory:

```
export-{app-name}-{date}/
├── data.json                    # All user data in JSON (array of records)
├── assets/                      # Exported media files
│   ├── {uuid1}.png
│   └── {uuid2}.pdf
└── EXPORT.md                    # Human-readable export documentation
```

### Import Requirements

Every Kovina application must support importing the same format it exports.

| Requirement | Standard |
|---|---|
| Import accepts the exact format produced by export | Round-trip fidelity |
| Import merges with existing data by default, with a replace option | User choice |
| Import validates data against the current schema before committing | Data integrity |
| Import provides a summary of what was imported (counts, any failures) | User feedback |
| Import is available from the settings page | Standard location |

---

## 9. Backup & Restore

### Application Responsibility

The application must survive the user losing their device, or the user switching to a new device, without permanent data loss.

| Scenario | Guarantee |
|---|---|
| Device lost or destroyed | Data is recoverable from cloud sync or latest export |
| App reinstalled | Local data is restored from cloud sync on first launch |
| User switches to a new device | Full data recovery via sign-in + cloud sync |
| Cloud service is unavailable | Local data is accessible and usable |
| Cloud service is permanently discontinued | Export was running regularly — user has their data |

### Platform Backup

| Platform | Backup Mechanism | Data Scope |
|---|---|---|
| Web / PWA | User-managed export | Full user data |
| iOS | iCloud backup (if enabled by user) | App container — all local data |
| Android | Google Drive backup (if enabled by developer) | App data directory |
| Windows | User-managed export + optional OneDrive backup | Export directory |
| macOS | Time Machine + optional iCloud backup | App support directory |

---

## 10. Offline Behavior

### Core Requirements

| Requirement | Rationale |
|---|---|
| Application launches and is fully functional without any network call | No dependency on connectivity for basic operation |
| All CRUD operations work offline and are queued for sync | User productivity is never blocked |
| Read operations use local data — never require a network fetch | Instant responsiveness |
| Offline changes are visually indicated (subtle badge or indicator) | User awareness of sync state |
| Offline indicator does not block or interrupt the user | Non-intrusive awareness |
| Conflict detection is deferred to sync time, not enforced offline | Uninterrupted local work |

### Offline Limits

| Limit | Standard |
|---|---|
| Maximum offline queue size | 10,000 pending changes or 100 MB (whichever comes first) |
| Offline queue data is stored with the same durability as user data | Survives app restart |
| Offline queue is cleared on successful sync | No stale accumulation |
| Offline queue is exposed to the user (can view pending items) | Transparency |

---

## 11. Sync Behavior

### Sync Model

Kovina applications use **background asynchronous sync**. The application syncs in the background without blocking the user interface.

| Principle | Implementation |
|---|---|
| Sync is eventual consistency | Changes propagate within seconds, not milliseconds |
| Sync is push + pull on every sync cycle | Bidirectional — send local changes, receive remote changes |
| Sync triggers on every network state change from offline to online | Opportunistic |
| Sync triggers on a periodic interval (every 30-60 seconds while active) | Regular freshness |
| Sync triggers on user-initiated manual refresh | User control |
| Sync never blocks UI rendering | Background thread / worker |

### Sync Rules

| Rule | Rationale |
|---|---|
| Sync is idempotent — running it twice produces the same result | Retry safety |
| Sync operates on changed records only (timestamp-based or change-log-based) | Efficiency |
| Sync does not overwrite local changes with older remote data | Last-write-wins is prohibited — local-first priority |
| Sync preserves creation timestamps | Data provenance |
| Sync exposes its status to the user (last sync time, pending changes) | Transparency |
| Sync fails gracefully on network errors — retry with exponential backoff | Resilience |

---

## 12. Conflict Handling

### Default Resolution

When the same record is modified both locally and remotely between sync cycles:

| Rule | Rationale |
|---|---|
| Local changes win by default | The local device represents the user's most recent intent |
| The remote change is stored as a separate version | No data is lost |
| The user is notified of conflicts that involve semantic data (not operational state) | User awareness |
| Conflicts in operational state are silently resolved (local wins) | No user distraction |
| A conflict log is accessible from settings | Transparency |

### Conflict Resolution Options

| Strategy | When to Use |
|---|---|
| **Local wins (default)** | General purpose — user intent is on the device |
| **Remote wins** | When the user explicitly discards local changes |
| **Merge (last-write-wins per field)** | When fields are independent (editing notes vs editing title) |
| **Manual resolution UI** | When fields are interdependent and automatic merge is risky |

---

## 13. Schema Versioning & Migrations

### Versioning

| Rule | Rationale |
|---|---|
| Every stored data schema has a version number | Migration targeting |
| Schema version is stored alongside the data | Self-describing storage |
| Schema version is an integer, monotonically increasing | Simple comparison |

### Migration Requirements

| Requirement | Standard |
|---|---|
| Every schema change has an associated forward migration | Move from version N to version N+1 |
| Migrations are written as reversible pairs (up/down where practical) | Rollback capability |
| Migrations run on app startup, before any data access | No data is read with an old schema |
| Migration failure blocks app startup with an error message | No data corruption risk |
| Migration performance is tested — long migrations show a progress indicator | User awareness |
| Migrations are idempotent — running them twice produces the same result | Safety on crash-recovery |
| Migration scripts are stored in version control | Audit trail, rollback history |
| No destructive migration ever deletes user data | User data preservation |

### Migration Types

| Type | Action | Example |
|---|---|---|
| Additive | Add new fields or tables with defaults | "Add `created_at` timestamp column" |
| Renaming | Rename a field or table (with backward-compatible alias for one version) | "Rename `name` to `title`" |
| Transformative | Change the shape or format of existing data | "Split `full_name` into `first_name` + `last_name`" |
| Removals | Remove a field or table (deprecated for one version first) | "Remove `legacy_tags` column" |

---

## 14. Data Deletion

### User-Initiated Deletion

| Requirement | Standard |
|---|---|
| User can delete individual items | Granular control |
| User can delete all their data at once | Complete reset |
| Deletion is not final until confirmed (undo toast / confirmation dialog) | Accidental deletion protection |
| Deletion is a logical delete (soft delete) for at least 30 days | Recovery window |
| Physical deletion occurs automatically after the recovery window | Storage reclamation |
| Deletion removes data from both local and cloud storage | Cross-context deletion |
| Deletion of synced data propagates to all connected devices | Ecosystem consistency |

### Account Deletion

| Requirement | Standard |
|---|---|
| User can delete their entire account with all associated data | Complete erasure |
| Account deletion is confirmed with re-authentication | Security boundary |
| Account deletion completes within 30 days | Regulatory compliance |
| User receives confirmation when deletion is complete | Closure |
| Account deletion does not require contacting support | Self-service |

---

## 15. Cache vs User Data

### Separation Rules

| Rule | Rationale |
|---|---|
| Cache data is stored in a separate storage location from user data | Cache can be cleared without data loss |
| Cache data has a defined TTL (time-to-live) | Automatic freshness |
| Cache data is never included in exports | Export contains only meaningful data |
| Cache data is included in backup only if regeneration is impossible | Backup size optimization |
| Cache data is cleared on sign-out | No residual data |
| Cache is not encrypted (in most cases) | Performance — cache contains no user data |

### Cache TTL Guidelines

| Content Type | Recommended TTL |
|---|---|
| API responses (dynamic) | 5 minutes |
| Reference data (app configuration) | 24 hours |
| Generated thumbnails / previews | Until source changes or 7 days |
| Static assets (images, fonts) | Long-lived (hash-based invalidation) |

---

## 16. File Formats

### Storage Formats

| Data Type | Format | Rationale |
|---|---|---|
| Structured user data | JSON (UTF-8) | Human-readable, portable, universally supported |
| Binary assets | Original format (PNG, PDF, etc.) | Preserve fidelity |
| Configuration | JSON or YAML | Standard, readable |
| Time-series or tabular data | SQLite | Efficient querying |
| Cached API responses | JSON | Matches source format |
| Images with compression requirements | WebP (web), JPEG (photos) | Performance with quality |

### Format Rules

| Rule | Rationale |
|---|---|
| All text data is UTF-8 encoded | Universal character support |
| JSON is well-formed, validated, and minified in production | Storage efficiency |
| Proprietary binary formats are prohibited | Portability |
| Every format used is documented in the project's `docs/` directory | Longevity |
| Compression is acceptable for storage but decompressed on access | Transparency |

---

## 17. Encryption Expectations

### Data at Rest

| Requirement | Standard |
|---|---|
| User data is encrypted at rest on all mobile and desktop platforms | Platform-provided encryption (FileVault, BitLocker, device encryption) |
| Application-level encryption is required for sensitive data | See [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md) |
| Cache data does not require application-level encryption | Cache contains no sensitive user data |
| Authentication tokens are stored in the platform credential store | OS-level security boundary |

### Data in Transit

Encryption in transit is governed by [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md). At minimum, all network communication uses TLS 1.2+.

### Encryption Rules

| Rule | Rationale |
|---|---|
| Encryption keys are never stored alongside the data they encrypt | Key separation |
| Application-level encryption does not interfere with search or indexing | Functionality preservation |
| Encryption is transparent to the user — no manual encryption/decryption steps | Usability |
| Encrypted exports include a decryption mechanism documented in the export | Accessibility |

---

## 18. Recovery States

### Data Recovery Scenarios

| Scenario | Expected Behavior |
|---|---|
| Corrupted local database detected | Attempt automatic repair. If repair fails, offer to restore from last sync or export. Log the corruption event. |
| Sync conflict causes data inconsistency | Flag the affected records, expose in conflict log, offer manual resolution. |
| Migration failure on app startup | Block startup with error message. Offer to roll back to previous version and re-attempt. |
| Cloud sync data inconsistent with local data | Cloud data is treated as suspect — local data is authoritative. Attempt re-sync from local. |
| Export file corrupted or unreadable | Show error message with possible causes. Offer to re-export. |

---

## 19. Storage Limits

### Local Storage

| Platform | Typical Limit | Notes |
|---|---|---|
| Web (localStorage) | 5–10 MB per origin | Browser-dependent |
| Web (IndexedDB) | Effectively unlimited (up to 50% of disk, browser-dependent) | Large datasets use IndexedDB |
| iOS | App container limits (varies) | Managed by OS |
| Android | No hard limit per app | Managed by OS |
| Windows | No hard limit | Disk space availability |
| macOS | No hard limit | Disk space availability |

### Application-Level Limits

| Rule | Rationale |
|---|---|
| The application warns the user when local storage reaches 80% of a sensible limit | Proactive management |
| The application provides a storage management UI (settings → storage) | User control |
| The application does not silently fail on storage quota exceeded | User awareness |
| Cached content is the first candidate for automatic cleanup | Preserve user data |

---

## 20. Auditability

### Data Audit Requirements

| Requirement | Implementation |
|---|---|
| All user data operations (create, update, delete) are logged locally | Debugging and transparency |
| Audit logs include: timestamp, operation type, affected record ID, user action | Sufficient context |
| Audit logs do not include: full record content, PII, passwords | Privacy-preserving |
| Audit logs are stored on-device only | No data exfiltration |
| Audit logs are pruned automatically (30 day rolling window) | Storage management |
| Sync operations are logged (timestamp, records synced, conflicts) | Sync debugging |

### User Transparency

| Requirement | Implementation |
|---|---|
| A data summary screen shows: total records, storage used, last sync time | User visibility |
| The user can view pending offline changes | Operational awareness |
| The user can view conflict history | Transparency |

---

## 21. App-Specific Data Policies

### Policy Requirements

Every Kovina application must document its data storage policy:

| Requirement | Location |
|---|---|
| What data the app stores and why | `docs/DATA.md` or application privacy page |
| The classification of each stored data type (§4) | `docs/DATA.md` |
| Export format documentation | `docs/DATA.md` |
| How sync works and what data is synced | `docs/DATA.md` |
| Data retention period after deletion | Privacy policy |
| Third-party data processing partners (if any) | Privacy policy |

### When Creating a New App

OpenForge generates a `docs/DATA.md` stub that appends to the project's documentation. The developer fills in the app-specific details using this standard as the framework.

---

## 22. Prohibited Storage Patterns

| Pattern | Why It Is Prohibited |
|---|---|
| **Storing user data exclusively in the cloud** | Violates local-first principle. Offline must work. |
| **Proprietary binary format for user data without documented export** | Data lock-in. The user cannot read their own data. |
| **Silent data sync without user awareness** | Transparency violation. |
| **Storing passwords in plaintext or reversible encryption** | Security failure. |
| **Storing authentication tokens in application databases** | Security failure — tokens belong in platform credential store. |
| **Sending full user database to a remote server without encryption** | Data exfiltration risk. |
| **Using localStorage for sensitive user data (web)** | No encryption, no size limit management. |
| **Data deletion that requires contacting support** | Anti-user — deletion must be self-service. |
| **Cache that is never evicted** | Storage bloat over time. |
| **Export that requires an active subscription** | User data hostage. |
| **Schema migration that deletes user data without warning** | Permanent data loss. |
| **Sync that blocks the UI thread** | Poor user experience. |
| **Storing application state in UserDefaults / SharedPreferences as primary data store** | Not designed for user data. |

---

## 23. QA Checklist

- [ ] Application works fully offline — no network dependency for any core operation.
- [ ] Local storage is the source of truth — cloud is derived from local.
- [ ] All user data is exportable in a documented, open format (JSON, CSV).
- [ ] Export works without a network connection.
- [ ] Import accepts the same format produced by export (round-trip verified).
- [ ] Every stored field is classified (User Data, Cache, Operational State, Analytics, Auth).
- [ ] User data and cache are stored in separate databases or tables.
- [ ] Authentication tokens are stored in the platform credential store.
- [ ] No plaintext passwords or credentials are stored anywhere.
- [ ] Schema version is stored alongside data. Migrations run on startup.
- [ ] Migration failure blocks startup with an error message.
- [ ] No destructive migration deletes user data.
- [ ] User can delete individual items and all data at once.
- [ ] Deletion has a 30-day recovery window (soft delete).
- [ ] Account deletion is self-service and completes within 30 days.
- [ ] Sync is asynchronous, idempotent, and non-blocking.
- [ ] Sync does not overwrite local changes with older remote changes.
- [ ] Offline changes are queued and visually indicated.
- [ ] Conflicts are logged and resolvable.
- [ ] User data is not sent to any third-party service without explicit consent.
- [ ] Cache has defined TTLs and is automatically evicted.
- [ ] Cache is never included in data exports.
- [ ] Export format is documented in `docs/DATA.md`.
- [ ] Storage usage is visible in settings with cleanup options.
- [ ] Data operations are audited locally (30-day rolling window).

---

## 24. Agent Checklist

Before an AI agent declares data storage work complete:

### Architecture

- [ ] Local-first architecture is implemented — offline is the default state.
- [ ] Cloud sync is asynchronous and non-blocking.
- [ ] Local data is the source of truth.
- [ ] Every stored field has a data classification.
- [ ] User data and cache are stored in separate storage locations.

### Export & Import

- [ ] Full data export works offline and completes within 30 seconds for typical datasets.
- [ ] Export format is JSON or documented open format.
- [ ] Import accepts the exact same format as export.
- [ ] Export includes all assets as separate files.
- [ ] Export documentation exists in `docs/DATA.md`.

### Deletion

- [ ] User can delete individual items (with confirmation).
- [ ] User can delete all data at once.
- [ ] Deletion has a 30-day soft-delete recovery window.
- [ ] Account deletion is self-service.
- [ ] Deletion propagates to cloud sync.

### Sync & Offline

- [ ] All CRUD operations work offline and are queued for sync.
- [ ] Offline changes are visually indicated.
- [ ] Sync is idempotent and uses exponential backoff.
- [ ] Local changes win in conflict resolution by default.
- [ ] Conflict log is accessible from settings.

### Schema & Migrations

- [ ] Schema version is stored with the data.
- [ ] Forward migrations exist for every schema change.
- [ ] Migrations are idempotent.
- [ ] No migration deletes user data.
- [ ] Migration failure blocks startup.

### Security

- [ ] No plaintext passwords or credentials stored anywhere.
- [ ] Authentication tokens are in the platform credential store.
- [ ] User data is encrypted at rest on mobile/desktop platforms.
- [ ] Export does not include cached content or operational state.

### Prohibited Patterns

- [ ] No proprietary binary formats for user data.
- [ ] No cloud-only data storage.
- [ ] No silent sync without user awareness.
- [ ] No export that requires a subscription.
- [ ] No cache that is never evicted.

---

*This standard defines the canonical data storage architecture for all Kovina projects. Platform-specific standards reference this document instead of defining their own storage rules. Companion to [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md) (encryption and sensitive data), [PERFORMANCE_STANDARD.md](../shared/PERFORMANCE_STANDARD.md) (caching strategy), and [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) (application architecture).*
