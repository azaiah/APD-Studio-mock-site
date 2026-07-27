import { z } from 'zod';

/**
 * The agent layer. See docs/specs/agent-roster.md for the full spec.
 *
 * Universal rules, enforced structurally rather than by instruction:
 *  - Grounded, not remembered. Agents read the Project Register (facts) and the
 *    Rule Register (law). They never assert a requirement from model memory.
 *  - Structured output. Schema-validated JSON. Prose is a FIELD, not the payload.
 *  - Citations required on every regulatory claim.
 *  - confidence + unknowns[] on every output. Unknowns become questions for a
 *    human, never invented content.
 *  - Versioned prompts. promptVersion is stored with every output.
 *  - Nothing is approved without humanApprovedBy.
 *  - No PHI reaches an agent. Enforced at the context-assembly layer.
 */

/** Every agent output extends this. No exceptions. */
export const AgentEnvelope = z.object({
  agentId: z.string(),
  promptVersion: z.string(),
  model: z.string(),
  confidence: z.enum(['high', 'medium', 'low']),
  /** The specific facts the agent needed and did not have. Never guessed. */
  unknowns: z.array(
    z.object({
      field: z.string(),
      whyNeeded: z.string(),
      /** Which template section requires it — so the SME understands the ask. */
      requiredBySectionId: z.string().optional(),
      likelyOwner: z.string().optional(),
    }),
  ),
  citations: z.array(z.object({ citation: z.string(), sourceDocId: z.string() })),
  /** Project Register fields the factual claims came from. */
  sourceFields: z.array(z.string()),
  status: z.literal('draft'),
  humanApprovedBy: z.null(),
});
export type AgentEnvelope = z.infer<typeof AgentEnvelope>;

export const AGENTS = [
  'intake-interview',
  'regulatory-analyst',
  'narrative-drafter',
  'budget-analyst',
  'alternatives-analyst',
  'compliance-auditor',
  'change-sentinel',
  'procurement-reviewer',
  'reporting',
  'cms-response',
  'reuse-scout',
] as const;
export type AgentId = (typeof AGENTS)[number];

export interface AgentDef {
  readonly id: AgentId;
  readonly title: string;
  readonly promptFile: string;
  readonly promptVersion: string;
  /** Build order. 1 = build first. See WORK-ORDER.md. */
  readonly buildPriority: number;
  readonly notes?: string;
}

export const ROSTER: readonly AgentDef[] = [
  { id: 'compliance-auditor', title: 'Compliance Auditor (adversarial)', promptFile: 'prompts/compliance-auditor.v1.md', promptVersion: 'v1', buildPriority: 1,
    notes: 'The flagship. Runs as an independent pass with NO access to the drafting agent reasoning. Best implemented as a panel with different lenses (fiscal, technical, procurement, program), findings merged and de-duplicated. A finding survives only if it cites a rule.' },
  { id: 'change-sentinel', title: 'Change Sentinel', promptFile: 'prompts/change-sentinel.v1.md', promptVersion: 'v1', buildPriority: 2,
    notes: 'Watches project data against the six enhanced As-Needed APDU triggers. Outputs the trigger, its citation, and the 60-day filing deadline as an actual date. Justifies an annual license by itself.' },
  { id: 'budget-analyst', title: 'Budget Analyst', promptFile: 'prompts/budget-analyst.v1.md', promptVersion: 'v1', buildPriority: 3,
    notes: 'Selects categories, allocation bases, and rationale. A deterministic engine does the math. NEVER lets the model compute a federal share.' },
  { id: 'narrative-drafter', title: 'Narrative Drafter', promptFile: 'prompts/narrative-drafter.v1.md', promptVersion: 'v1', buildPriority: 4,
    notes: 'One section at a time. Never the whole document in one shot — that is where consistency dies. Reads budget figures, never computes them.' },
  { id: 'regulatory-analyst', title: 'Regulatory Analyst', promptFile: 'prompts/regulatory-analyst.v1.md', promptVersion: 'v1', buildPriority: 5 },
  { id: 'alternatives-analyst', title: 'Alternatives Analyst', promptFile: 'prompts/alternatives-analyst.v1.md', promptVersion: 'v1', buildPriority: 6,
    notes: 'Reuse is a mandatory SCORING CRITERION, not a mandatory alternative. Getting that backwards produces false failures.' },
  { id: 'intake-interview', title: 'Intake & Interview', promptFile: 'prompts/intake-interview.v1.md', promptVersion: 'v1', buildPriority: 7 },
  { id: 'reporting', title: 'Reporting', promptFile: 'prompts/reporting.v1.md', promptVersion: 'v1', buildPriority: 8,
    notes: 'The stickiest module commercially — creates a monthly habit.' },
  { id: 'reuse-scout', title: 'Reuse Scout', promptFile: 'prompts/reuse-scout.v1.md', promptVersion: 'v1', buildPriority: 9 },
  { id: 'procurement-reviewer', title: 'Procurement Reviewer', promptFile: 'prompts/procurement-reviewer.v1.md', promptVersion: 'v1', buildPriority: 10 },
  { id: 'cms-response', title: 'CMS Response', promptFile: 'prompts/cms-response.v1.md', promptVersion: 'v1', buildPriority: 11 },
];
