# Security

A state Medicaid agency's security reviewer will read this file. Keep it true.

## Reporting a vulnerability

Email **[SECURITY CONTACT]**. Do not open a public issue. We will acknowledge
within two business days.

## Design commitments

These are architectural, not aspirational. Each is enforced somewhere you can
point at.

| Commitment | Where it is enforced |
|---|---|
| **No PHI, ever.** No member-level data in any schema, column, log line, or fixture. | Design constraint; `.gitignore`; fixture policy in `tests/fixtures/README.md`. A migration adding a PHI column does not merge. |
| **Tenant isolation at the data layer.** Not in application code. | Postgres row-level security. A test must prove a query without tenant context returns zero rows. ADR-0003. |
| **No outbound CMS integration.** The system never files on a state's behalf. | ADR-0004. There is no CMS endpoint in any environment. |
| **No attestation without a named human.** | Blocker-severity check `X-005`. Agents may draft explanation text; they may never set an attestation value. |
| **Append-only audit trail.** Create, edit, approve, export. Document versions are immutable. | The app role holds no UPDATE or DELETE grant on `audit_event`. |
| **Section 508 / WCAG 2.1 AA.** | Playwright accessibility assertions in E2E, not a manual checklist. Also a Condition for Enhanced Funding — 42 CFR 433.112(b)(12). |

## Compliance posture — stated honestly

States will ask about MARS-E 2.x, NIST 800-53 moderate, StateRAMP or FedRAMP,
SOC 2, IRS Publication 1075, and data residency.

**Say what we hold and what is in progress. Never claim a certification we do not
hold.** IRS Pub 1075 is designed out of scope by keeping Federal Tax Information
out of the system entirely — if a customer wants to load FTI, the answer is no,
for the same reason it is no for PHI.

Production hosting targets a StateRAMP-viable environment (AWS GovCloud or Azure
Government). Vercel is for demos and internal work only. ADR-0005.

## Secrets

No credentials in the repository, ever. `.env.example` documents the shape;
`.env*` is gitignored. If a secret is ever committed, rotate it immediately —
rewriting history is not sufficient.
