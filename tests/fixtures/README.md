# Test fixtures

## What goes here

- **Redacted real-world APD examples** for regression testing (Research Agenda R4).
- **Seeded-defect fixtures** — a known-good APD with one specific violation
  injected, plus the exact finding set the validator should return. These are how
  the Compliance Auditor is scored.
- **Synthetic project timelines** with known As-Needed APDU trigger events, for
  the Change Sentinel.

## Rules

1. **No PHI. No member-level data. Ever.** These are budget, architecture,
   procurement, and project-management documents; there is no clinical reason for
   member data to be here. If a source document contains any, it does not get
   committed — not even redacted.
2. Redact state-identifying detail unless the document is genuinely public.
   Many states publish APDs through procurement portals; those are fine, and the
   source URL goes in a sidecar `.source.md` file.
3. Every fixture pairs with an expected-findings file: `<name>.expected.json`.
4. Never edit a fixture to make a test pass. If the expected findings are wrong,
   fix the validator or the register — and record why in an ADR.

## Layout

```
/tests/fixtures
  /real-apds/<state>-<module>-<year>/     document + .source.md
  /seeded-defects/<defect-id>/            document + expected.json
  /timelines/<scenario>.json              Change Sentinel scenarios
```

Nothing is here yet. Populating this is Research Agenda **R4**, and it is a
prerequisite for trusting any validator's false-positive rate.
