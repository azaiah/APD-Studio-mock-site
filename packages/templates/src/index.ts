import raw from '../data/apd-section-schema.json' with { type: 'json' };
import {
  SectionSchema, type Section, type SubmissionType, type DocumentType, type ValidationRule,
} from './schema.js';

export * from './schema.js';

export const schema: SectionSchema = SectionSchema.parse(raw);
export const sections: readonly Section[] = schema.sections;

const byId = new Map(sections.map((s) => [s.id, s]));

export function sectionById(id: string): Section {
  const s = byId.get(id);
  if (!s) throw new Error(`Unknown section id: ${id}`);
  return s;
}

export function sectionsFor(documentType: DocumentType): Section[] {
  return sections.filter((s) => s.documentType === documentType);
}

/**
 * Sections a given submission type must contain.
 *
 * The template marks PAPD-inapplicable sections 'not applicable' / 'not required'
 * — those are excluded. 'check template' means the retrieved PRA conversion did
 * not state it (GAP-007); treated as required so the validator errs toward
 * completeness rather than silently dropping a section.
 */
export function requiredSections(type: SubmissionType): Section[] {
  const doc: DocumentType = type === 'OAPD' ? 'MES_OAPD' : 'MES_APD';
  return sectionsFor(doc).filter((s) => {
    if (doc === 'MES_OAPD') return s.required !== false;
    const req = s.requiredBy?.[type];
    if (req === undefined) return false;
    return !/not applicable|not required/i.test(req);
  });
}

/** Every validation rule in the schema, including AoA and procurement checklist. */
export function allValidationRules(): ValidationRule[] {
  return [
    ...sections.flatMap((s) => s.validationRules),
    ...schema.aoaTemplate.validationRules,
    ...schema.procurementChecklist.validationRules,
  ];
}

/** The rules that carry the demo. Build these first. */
export function flagshipRules(): ValidationRule[] {
  return allValidationRules().filter((r) => r.flagshipRule === true);
}

export function machineCheckableRules(): ValidationRule[] {
  return allValidationRules().filter((r) => r.machineCheckable);
}
