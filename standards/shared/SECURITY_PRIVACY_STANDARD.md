# Security & Privacy Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.2.0](../VERSION.md)
>
> Canonical security and privacy standard for every Kovina Open project. Defines how user data is protected, how permissions are managed, how secrets are handled, and how threats are mitigated — the immune system of the app organism.
>
> Platform documents reference this standard rather than defining their own security and privacy rules.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [No Telemetry by Default](#3-no-telemetry-by-default)
4. [No Ads](#4-no-ads)
5. [No Dark Patterns](#5-no-dark-patterns)
6. [Permission Minimization](#6-permission-minimization)
7. [Platform Permission Rules](#7-platform-permission-rules)
8. [Secrets Management](#8-secrets-management)
9. [Environment Variables](#9-environment-variables)
10. [Local Secrets](#10-local-secrets)
11. [API Keys](#11-api-keys)
12. [Encryption Expectations](#12-encryption-expectations)
13. [Data Minimization](#13-data-minimization)
14. [Privacy Policy Accuracy](#14-privacy-policy-accuracy)
15. [Logging Rules](#15-logging-rules)
16. [Crash & Error Reporting](#16-crash--error-reporting)
17. [Third-Party Service Rules](#17-third-party-service-rules)
18. [Authentication Expectations](#18-authentication-expectations)
19. [Session Handling](#19-session-handling)
20. [Threat Model Basics](#20-threat-model-basics)
21. [Safe Defaults](#21-safe-defaults)
22. [Prohibited Patterns](#22-prohibited-patterns)
23. [QA Checklist](#23-qa-checklist)
24. [Agent Checklist](#24-agent-checklist)

---

## 1. Authority

### This document owns

- Privacy guarantees — no telemetry by default, no ads, no dark patterns.
- Permission minimization rules for every platform.
- Secrets management — environment variables, local secrets, API keys.
- Encryption expectations for data at rest and in transit.
- Data minimization principles and privacy policy accuracy requirements.
- Logging rules, crash/error reporting rules, third-party service rules.
- Authentication expectations and session handling.
- Threat model basics, safe defaults, and all prohibited security patterns.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Data storage architecture, persistence, export/import, sync | [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) |
| Data classification (user data, cache, operational state) | [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) |
| Privacy policy legal text | Legal review per-project |
| Platform-specific permission API details | Platform standards |
| Accessibility implications of security flows | [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) |
| Store privacy declaration forms | [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md) |

### Dependencies

This document works alongside [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) (data persistence and encryption), [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) (security flows that affect accessibility), [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md) (privacy declarations), and platform standards (per-platform permission APIs). Platform standards reference this document instead of defining their own security and privacy rules.

---

## 2. Philosophy

A Kovina application earns trust. It does not assume trust.

Security and privacy are not features to add before release — they are architectural constraints applied from the first line of code. Every feature request must be evaluated against a simple question: **does this need user data to function?** If the answer is no, the data is not collected. If the answer is maybe, the data is not collected.

The core commitments:

1. **The user's data belongs to the user.** The application is a guest in the user's device. It takes what it needs to function and nothing more.
2. **No surveillance.** Telemetry, analytics, and crash reporting are opt-in, never on-by-default. User behavior is not tracked, profiled, or monetized.
3. **Safe defaults win.** Every security-sensitive decision defaults to the safest option. The user may relax constraints explicitly, but the starting position is always "deny."
4. **Transparency is not optional.** Users are told what data is collected, why, how long it is kept, and who it is shared with. No buried policies, no legalese obfuscation.

---

## 3. No Telemetry by Default

### Rule

| Rule | Rationale |
|---|---|
| Telemetry (usage data, analytics, feature tracking) is never enabled by default | Opt-in only. The user explicitly chooses to share. |
| Telemetry is always off on first launch | Zero-data baseline. |
| Telemetry opt-in is requested at an appropriate moment (not on first launch, not as a gate) | Contextual consent, not coercive. |
| Telemetry opt-in is reversible — the user can disable it at any time | Ongoing control. |
| Telemetry data is anonymous (no user-identifying information) | Privacy preserving. |
| Telemetry data is never sold or shared with third parties | Core guarantee. |
| Telemetry data retention is documented and finite | No indefinite storage. |

### Telemetry Exception

| Exception | Rule |
|---|---|
| Anonymous crash reporting | Crash reporting is optional and opt-in, separate from general telemetry. |

---

## 4. No Ads

### Rule

| Rule | Rationale |
|---|---|
| No Kovina application displays advertising of any kind | User experience purity. No attention extraction. |
| No in-app promotions for third-party products or services | Trust boundary. |
| No affiliate links or referral-based monetization | Financial incentive neutrality. |
| Cross-promotion of other Kovina applications is acceptable, but must be non-intrusive and dismissible | Ecosystem discovery without coercion. |

---

## 5. No Dark Patterns

### Prohibited Patterns

| Pattern | Why It Is Prohibited |
|---|---|
| **Confirmshaming** — language that shames the user into opting in ("No thanks, I hate privacy") | Manipulative |
| **Roach motel** — easy to sign up, impossible to cancel or delete account | Anti-user |
| **Hidden costs** — fees or data collection revealed after the user has invested time | Deceptive |
| **Preselected opt-ins** — checkboxes for data sharing that are already checked | Violation of active consent |
| **Nagging** — repeated requests for the same permission after the user declined | Harassment |
| **Forced action** — requiring data sharing or account creation to use basic functionality | Coercive |
| **Misleading buttons** — buttons that imply one action but perform another (e.g., "Decline" that actually accepts) | Deceptive |
| **False scarcity** — countdown timers or limited-time offers that are not real | Manipulative |
| **Difficult cancellation** — requiring multiple steps, phone calls, or support contact to cancel or delete | Anti-user |

---

## 6. Permission Minimization

### Principle

Every permission requested by a Kovina application must be justified by a core feature. Permissions are requested at the moment they are needed — not at install, not on first launch, not preemptively "just in case."

### Permission Rules

| Rule | Rationale |
|---|---|
| Request the minimum set of permissions for the application to function | No exploratory permissions |
| Permission requests are accompanied by a clear explanation of why the permission is needed and what it will be used for | Informed consent |
| Permissions are requested at the point of use, not at install or first launch | Contextual consent |
| Denied permissions are respected without nagging | User choice |
| Permissions that are no longer needed are released | Ongoing minimization |
| Permissions are requested individually, not in batches | Granular user control |
| Use `ACCESS_FINE_LOCATION` only when the app truly needs precise location — prefer `ACCESS_COARSE_LOCATION` | Data precision minimization |

### Permission Categories

| Category | Rule |
|---|---|
| Camera | Required only for camera-based features. Not for analytics or background scanning. |
| Microphone | Required only for audio recording features. Not for ambient listening. |
| Location | Required only for location-aware features. Coarse-grained preferred over fine-grained. Requested per session, not persistently. |
| Contacts | Required only for contact-related features (sharing, importing). Not for social graph harvesting. |
| Photos / Media | Required only for media import/export features. Requested per item, not per library. |
| Notifications | Required only for notification features. Requested after the user has demonstrated the value of notifications. |
| Bluetooth | Required only for Bluetooth-dependent features. Not for device tracking. |
| Health / Fitness | Required only for health-related features. Never shared with third parties. |

---

## 7. Platform Permission Rules

### Web / PWA

| Permission | Mechanism |
|---|---|
| Notifications | `Notification.requestPermission()` — requested in response to user gesture |
| Geolocation | `navigator.geolocation` — requested at point of use |
| Camera / Microphone | `getUserMedia()` — requested at point of use |
| Clipboard | `navigator.clipboard` — requested at point of use |
| File system | File input element or File System Access API — user gesture initiated |

### iOS

| Permission | Mechanism |
|---|---|
| All permissions | `Info.plist` usage description strings are required and must be accurate |
| Camera | `NSCameraUsageDescription` — request at first camera use |
| Photo Library | `NSPhotoLibraryUsageDescription` — request at first image pick |
| Location | `NSLocationWhenInUseUsageDescription` — never `NSLocationAlways` unless essential |
| Notifications | Request after demonstrating value (e.g., "We'll notify you when sync completes") |

### Android

| Permission | Mechanism |
|---|---|
| All permissions | Declared in `AndroidManifest.xml`. Runtime permissions requested at point of use. |
| Location | `ACCESS_COARSE_LOCATION` preferred. Request at point of use. |
| Camera | `CAMERA` — runtime permission at first camera use |
| Storage | `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO` (Android 13+) — scoped, not blanket storage access |
| Notifications | `POST_NOTIFICATIONS` (Android 13+) — runtime permission at point of use |

### Windows

| Permission | Mechanism |
|---|---|
| All capabilities | Declared in `Package.appxmanifest` |
| Camera | `Webcam` capability — declared with justification |
| Microphone | `Microphone` capability — declared with justification |
| Location | `Location` capability — declared with justification |

### macOS

| Permission | Mechanism |
|---|---|
| All entitlements | Declared in entitlements file |
| Camera | `com.apple.security.device.camera` — with usage description |
| Microphone | `com.apple.security.device.audio-input` — with usage description |
| Location | `com.apple.security.personal-information.location` — with usage description |

---

## 8. Secrets Management

### Definition

A secret is any value that, if exposed, would compromise security: API keys, tokens, passwords, signing keys, database credentials, encryption keys.

### Rules

| Rule | Rationale |
|---|---|
| Secrets are never hardcoded in source code | Hardcoded secrets leak in version control |
| Secrets are never committed to version control (even in `.env.example`) | `.env.example` documents variable names, not values |
| Secrets are loaded from environment variables at runtime | Platform-agnostic |
| Development secrets and production secrets are different sets | No cross-contamination |
| Compromised secrets are rotated immediately | Incident response |
| Secrets are stored in the platform's secure credential store where applicable | OS-level security |
| Secrets that must be distributed (e.g., public API keys for client apps) are designed to be public with server-side rate limiting | No true client secret is possible — design accordingly |

---

## 9. Environment Variables

### Convention

All Kovina applications use environment variables for configuration that varies between environments.

| Rule | Rationale |
|---|---|
| All environment variables are documented in `.env.example` | Onboarding and transparency |
| `.env.example` contains placeholder values, never real secrets | Safe to commit |
| `.env` files are listed in `.gitignore` | Never committed |
| Production environment variables are managed through the deployment platform (GitHub Secrets, Cloudflare Secrets, etc.) | Platform-grade security |
| Environment variables are validated on application startup (fail-fast if required vars are missing) | Immediate feedback |
| Environment variable names follow `SCREAMING_SNAKE_CASE` | Convention |

### Required Documentation

Every Kovina application's `docs/Development.md` documents:

- All environment variables the application needs.
- Where to obtain values for each variable.
- Which variables are required and which are optional.

---

## 10. Local Secrets

### Storage Rules

| Secret Type | Storage Location |
|---|---|
| Authentication tokens | Platform credential store (Keychain, Keystore, Credential Manager, `keytar`, `safeStorage`) |
| User passwords | Never stored. Validate against server/hash. |
| Database encryption keys | Platform secure enclave / TPM / OS keychain |
| Session tokens | HTTP-only cookies (web), platform credential store (native) |
| OAuth refresh tokens | Platform credential store |
| Device-local API keys | Application sandbox, not in source |

### Prohibited Local Patterns

| Pattern | Why It Is Prohibited |
|---|---|
| Storing tokens in `localStorage` (web) | Accessible to any JavaScript on the origin |
| Storing tokens in plaintext files in the app directory | Readable by any process with file system access |
| Storing tokens in UserDefaults / SharedPreferences | Not encrypted, accessible by other apps on rooted/jailbroken devices |
| Hardcoded API keys in mobile app source | Extracted by decompilation |
| Encryption keys derived from user passwords without proper KDF | Weak key derivation |

---

## 11. API Keys

### Public API Keys

Keys that must be included in client applications (Stripe publishable key, Supabase anon key, etc.):

| Rule | Rationale |
|---|---|
| Public keys are designed to be public — their exposure does not compromise security | Public key model |
| Server-side rate limiting and CORS prevent unauthorized use by other domains | Defense in depth |
| Public keys are stored as environment variables even in client apps | Consistent practice |
| Public keys are scoped to the minimum necessary permissions | Limited blast radius |

### Secret API Keys

Keys that authenticate server-to-server communication:

| Rule | Rationale |
|---|---|
| Secret keys are stored in server-side environment variables only | Never exposed to clients |
| Secret keys are never included in client applications | Irretrievable from decompilation |
| Secret keys are rotated on a regular schedule | Credential hygiene |
| Compromised secret keys are revoked and replaced immediately | Incident response |

---

## 12. Encryption Expectations

### Data in Transit

| Requirement | Standard |
|---|---|
| All network communication uses TLS 1.2 minimum, TLS 1.3 preferred | Industry standard |
| Certificate validation is enabled in production | No self-signed or pinned certificates in production |
| HTTP is redirected to HTTPS (web) | No plaintext traffic |
| WebSocket connections use WSS | Encrypted WebSocket |

### Data at Rest

| Requirement | Scope |
|---|---|
| Platform-level encryption (FileVault, BitLocker, device encryption) | All user data |
| Application-level encryption for sensitive user data | Per application classification (see [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) §4) |
| Authentication tokens encrypted at rest via platform credential store | All authentication data |

### Encryption Rules

| Rule | Rationale |
|---|---|
| Custom encryption algorithms are never implemented | Use platform-provided or standard library crypto |
| Encryption keys are generated using cryptographically secure random number generators | Key strength |
| Encryption keys are stored in the platform's secure enclave or equivalent | Hardware-backed security |
| Encryption is transparent to the user unless the app is specifically a security tool | Usability |

---

## 13. Data Minimization

### Principle

A Kovina application collects the minimum data necessary to provide its stated functionality. No exploratory data collection.

| Rule | Rationale |
|---|---|
| Collect only data that is directly necessary for a stated feature | Feature-bound data collection |
| Do not collect data "because it might be useful later" | Speculative data collection is prohibited |
| Do not request access to data the app does not need (contacts, photos, location) unless the feature requires it | Permission discipline |
| Anonymize where possible — aggregate counts over individual tracking | Privacy-by-design |
| Set retention limits on all collected data — no indefinite storage | Finite retention |
| Server-side logs containing user data are purged after 90 days maximum | Log hygiene |

### Data Retention Limits

| Data Type | Maximum Retention |
|---|---|
| User account data | Until account deletion |
| User content (documents, files) | Until user deletes or account deletion |
| Authentication logs (login attempts) | 90 days |
| Application logs (user actions) | 30 days |
| Crash reports | 90 days |
| Telemetry (if opted in) | 180 days |
| Beta feedback | Duration of beta + 30 days |

---

## 14. Privacy Policy Accuracy

### Rule

Every Kovina application that collects any user data must have a privacy policy.

| Requirement | Standard |
|---|---|
| Privacy policy states exactly what data is collected, why, and how long it is kept | Honest and specific |
| Privacy policy lists all third-party services that receive user data | Full transparency |
| Privacy policy is written in clear, non-legal language | Human-readable |
| Privacy policy is linked from the app's settings, website footer, and store listing | Three access points |
| Privacy policy is updated when data collection practices change | Living document |
| Privacy policy is versioned — previous versions are archived | Change tracking |

### What Privacy Policies Must State

1. What data the application collects (be specific: "email address and display name" not "account information").
2. Why each piece of data is collected (tied to specific features).
3. How long each type of data is retained.
4. Which third-party services receive data and what data they receive.
5. How the user can request data deletion.
6. How the user can export their data.
7. How to contact the developer with privacy concerns.

---

## 15. Logging Rules

### What to Log

| Log Type | Content | Retention |
|---|---|---|
| Application errors | Error type, stack trace (anonymized), timestamp, app version | 30 days locally |
| Authentication events | Login success/failure, timestamp (no password, no token) | 90 days server-side |
| User actions (audit) | Action type, affected record type, timestamp (no PII) | 30 days locally |
| Performance metrics | Duration, component, success/failure (no user context) | 30 days locally |
| Sync events | Records synced, conflicts, duration (no record content) | 30 days locally |

### What Never to Log

| Data | Why |
|---|---|
| Passwords or password hashes | Irreversible compromise |
| Authentication tokens or session IDs | Credential theft |
| Full user record content | Unnecessary data exposure |
| API keys or secrets | Credential theft |
| User-identifying information in analytics logs | Privacy violation |
| Raw network request/response bodies containing user data | Data exfiltration risk |

### Logging Rules

| Rule | Rationale |
|---|---|
| Logs never contain secrets | Safe rotation and storage |
| Logs are stored on-device by default; server logs have documented retention | Data minimization |
| Logs are sanitized before sending to a remote service | Privacy boundary |
| Logs are not sent to a remote service without user consent | Telemetry opt-in |
| Log file access is restricted to the application sandbox | No unauthorized reading |

---

## 16. Crash & Error Reporting

### Rules

| Rule | Rationale |
|---|---|
| Crash reporting is opt-in, separate from general telemetry | Informed choice per purpose |
| Crash reports contain only: stack trace, app version, OS version, device model | Minimum viable debugging |
| Crash reports never contain: user data, tokens, passwords, file contents | Privacy boundary |
| Crash reporting is requested after a crash occurs, not on first launch | Immediate context |
| Crash reporting uses a first-party or privacy-respecting third-party service | Data sovereignty |

### Prohibited Crash Data

- Full file contents at the time of crash.
- User input that was not part of the crash context.
- Screenshots of the user's screen.
- Network request bodies.
- Credentials or tokens in memory dumps.

---

## 17. Third-Party Service Rules

### Evaluation Criteria

Before integrating a third-party service (analytics, crash reporting, cloud sync, authentication provider):

| Criterion | Requirement |
|---|---|
| Privacy policy | Must align with Kovina's data commitments. No data resale. |
| Data storage location | Preference for EU or US. Documented in privacy policy. |
| Data retention | Must support finite retention and user deletion requests. |
| Subprocessors | Must be disclosed. |
| SLA | Must meet the application's uptime requirements. |
| Self-hosting option | Preferred where practical. |

### Rules

| Rule | Rationale |
|---|---|
| Every third-party service is documented in the privacy policy | Full transparency |
| Third-party SDKs are kept to the minimum necessary | Attack surface reduction |
| Third-party SDKs are updated promptly when security patches are released | Vulnerability management |
| Third-party services are scoped to the minimum data they need | Data minimization extends to partners |
| No third-party SDK loads before user consent (for tracking/analytics) | Consent gate |

---

## 18. Authentication Expectations

### When Authentication Is Required

| Scenario | Requirement |
|---|---|
| Syncing data across devices | Authentication required |
| Multi-user or collaborative features | Authentication required |
| Accessing user-owned data from a server | Authentication required |
| Local-only application with no sync | Authentication not required — may be optional for premium features |

### Authentication Methods

| Method | Recommendation |
|---|---|
| OAuth 2.0 / OIDC (Google, GitHub, Apple) | Preferred for consumer apps |
| Email + passwordless magic link or one-time code | Acceptable alternative |
| Email + password (with proper hashing — bcrypt/Argon2) | Acceptable only if OAuth is not feasible |
| Device-local auth (Face ID, Touch ID, Windows Hello) | Recommended as secondary unlock (not primary auth) |
| SMS-based authentication | Discouraged (SIM swap attacks, non-international) |

### Authentication Rules

| Rule | Rationale |
|---|---|
| Authentication is always optional for local-only features | No login gate for basic functionality |
| Authentication state is preserved across app restarts | Session persistence |
| Authentication failure does not delete local data | Data preservation |
| Authentication tokens are stored in the platform credential store | Security boundary |
| MFA is supported where the provider offers it | Defense in depth |
| Sign-in is not required to browse read-only content | No paywall for public information |

---

## 19. Session Handling

| Rule | Rationale |
|---|---|
| Sessions expire after a reasonable period of inactivity (30 days by default) | Security hygiene |
| Session tokens are revoked on sign-out | No residual access |
| Concurrent sessions on different devices are supported | Multi-device usage |
| Session revocation on one device does not sign out other devices | Device independence |
| Sessions survive app updates | No forced re-authentication on update |
| Session state is encrypted at rest in the platform credential store | Token protection |

---

## 20. Threat Model Basics

Every Kovina application should consider the following threat model:

### Threat: Data Breach (Server)

| Mitigation | Implementation |
|---|---|
| Server stores minimal user data | Data minimization (§13) |
| Passwords are never stored | OAuth or passwordless auth |
| Server data is encrypted at rest | Platform-level encryption |
| Access to server data is logged and audited | Audit trail |

### Threat: Data Breach (Device)

| Mitigation | Implementation |
|---|---|
| User data is encrypted at rest | Platform-level encryption |
| Authentication tokens are in the credential store | OS-level security |
| No sensitive data in unprotected storage (UserDefaults, localStorage) | Storage discipline |

### Threat: Network Interception

| Mitigation | Implementation |
|---|---|
| All traffic uses TLS 1.2+ | Encryption in transit |
| Certificate validation is enabled | No MITM (in production) |

### Threat: Social Engineering / Phishing

| Mitigation | Implementation |
|---|---|
| No email-based password reset (passwordless or OAuth) | Reduces phishing surface |
| Permissions are requested only at point of use | Contextual awareness |
| Privacy-invasive requests are flagged | User education |

### Threat: Supply Chain

| Mitigation | Implementation |
|---|---|
| Third-party SDKs are minimized | Dependency discipline |
| Dependencies are audited regularly | `npm audit`, `cargo audit`, etc. |
| Lockfiles are committed | Reproducible builds |

---

## 21. Safe Defaults

### Default Security Settings

| Setting | Default | Rationale |
|---|---|---|
| Telemetry / analytics | Off | No surveillance by default |
| Crash reporting | Off | Opt-in |
| Notifications | Off until requested | No interruption by default |
| Location access | Deny | Point-of-use request only |
| Cloud sync (where optional) | Off until user enables | Local-first default |
| Data export | On (feature available) | User-owned data |
| Auto-lock / session timeout | Off | User preference (recommended: 30 days) |
| Content filtering (where applicable) | Off / minimal | User preference |

---

## 22. Prohibited Patterns

| Pattern | Why It Is Prohibited |
|---|---|
| **Telemetry on by default** | Violation of "no surveillance" principle |
| **Third-party tracking SDKs (Google Analytics, Facebook Pixel, etc.)** | Surveillance capitalism |
| **Advertising of any kind** | Attention extraction |
| **Dark patterns to collect more data** | Manipulation, trust destruction |
| **Storing passwords in plaintext** | Irreversible security failure |
| **Hardcoded API keys or secrets in source code** | Credential leak via version control |
| **Sending full error logs or crash dumps without user consent** | Privacy violation |
| **Loading remote code (hot-reload scripts, remote evaluation)** | Arbitrary code execution risk |
| **Reading clipboard contents without user action** | Privacy invasion |
| **Fingerprinting the user (canvas fingerprinting, device fingerprinting)** | User tracking without consent |
| **Collecting data "for future features"** | Speculative data hoarding |
| **Selling or renting user data** | Core value violation |
| **AI model training on user data without explicit opt-in** | Trust violation |
| **Unencrypted local storage of sensitive data** | Data exposure risk |
| **Silent updates that change privacy posture** | Transparency violation |

---

## 23. QA Checklist

- [ ] Telemetry and analytics are off by default (opt-in only).
- [ ] No advertising or affiliate links are present.
- [ ] No dark patterns exist in the UI (confirmshaming, roach motel, preselected opt-ins, forced actions, misleading buttons).
- [ ] Permissions are requested at point of use with an explanation.
- [ ] Denied permissions are not re-requested.
- [ ] No secrets are hardcoded in source code.
- [ ] `.env.example` documents all environment variables with placeholder values.
- [ ] No `.env` files are tracked by version control.
- [ ] All network communication uses TLS 1.2+.
- [ ] Authentication tokens are stored in the platform credential store.
- [ ] Passwords are never stored (OAuth or passwordless auth).
- [ ] Crash reports are opt-in and contain no user data.
- [ ] Logs contain no secrets, passwords, tokens, or PII.
- [ ] Privacy policy exists, is accurate, and is linked from settings.
- [ ] Third-party services are documented in the privacy policy.
- [ ] Account deletion is self-service.
- [ ] MFA is supported where the authentication provider offers it.
- [ ] No telemetry SDK loads before user consent.
- [ ] No third-party tracking SDKs are present.
- [ ] No remote code loading is implemented.
- [ ] No canvas or device fingerprinting is implemented.
- [ ] Unauthenticated users can use local-only features.
- [ ] Authentication survives app restart.
- [ ] Blocked permissions show graceful degradation — not crashes.

---

## 24. Agent Checklist

Before an AI agent declares security and privacy work complete:

### Privacy

- [ ] Telemetry and analytics are opt-in (off by default).
- [ ] No advertising or affiliate links are present.
- [ ] No dark patterns exist in any flow.
- [ ] Privacy policy accurately describes data collection.
- [ ] Privacy policy is linked from settings.
- [ ] Third-party services are documented in the privacy policy.

### Permissions

- [ ] Permissions are requested at point of use, not on first launch.
- [ ] Permission requests include an explanation of why the permission is needed.
- [ ] Denied permissions are not re-requested.
- [ ] No unnecessary permissions are declared.

### Secrets

- [ ] No secrets are hardcoded in source code.
- [ ] `.env.example` exists with placeholder values.
- [ ] `.env` files are in `.gitignore`.
- [ ] Authentication tokens are stored in the platform credential store.
- [ ] No passwords are stored anywhere.
- [ ] Public API keys in client apps are designed to be public (server-side protection).

### Network

- [ ] All traffic uses TLS 1.2+.
- [ ] HTTP redirects to HTTPS.
- [ ] No custom certificate validation in production.

### Logging

- [ ] Logs contain no secrets, passwords, tokens, or PII.
- [ ] Crash reports are opt-in.
- [ ] Crash reports contain no user data.
- [ ] Log retention is documented and finite.

### Authentication

- [ ] Authentication is optional for local-only features.
- [ ] Session tokens survive app restart.
- [ ] Sign-out revokes the session.
- [ ] Account deletion is self-service.
- [ ] MFA is supported where available.

### Prohibited Patterns

- [ ] No telemetry on by default.
- [ ] No third-party tracking SDKs.
- [ ] No advertising.
- [ ] No remote code loading.
- [ ] No device fingerprinting.
- [ ] No speculative data collection.
- [ ] No selling or sharing user data.

---

*This standard defines the canonical security and privacy requirements for all Kovina projects. Platform-specific standards reference this document instead of defining their own security and privacy rules. Companion to [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) (data persistence, encryption), [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) (accessible security flows), and [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md) (privacy declarations).*
