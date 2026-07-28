/**
 * @apd-studio/budget — match-rate math and reconciliation.
 *
 * CRITICAL DESIGN RULE (CLAUDE.md hard rule 10, agent roster spec §4): the
 * arithmetic is code, not the model. An agent selects categories, allocation
 * bases, and rationale. This package does the math, deterministically, in
 * integer cents. NEVER let a language model compute a federal share.
 *
 * There is no model call anywhere in this package, and there must never be one.
 * It has exactly one dependency — @apd-studio/rules — from which every match
 * rate is read. No rate, threshold, or percentage is hardcoded here.
 *
 * Load-bearing invariants, each covered by tests:
 *   1. federal + state === total, exactly, at every amount including negatives
 *      and zero. The state share is the remainder, never independently rounded.
 *   2. Allocated program shares sum to the federal share exactly, even when the
 *      percentages do not divide evenly.
 *   3. Fiscal-year rollups equal the sum of their own lines, because they are
 *      built from per-line splits rather than by re-splitting a total.
 *   4. Reconciliation tolerance is zero.
 */
export * from './money.js';
export * from './rates.js';
export * from './lines.js';
export * from './rollup.js';
export * from './reconcile.js';
