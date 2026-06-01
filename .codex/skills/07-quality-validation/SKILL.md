---
name: cobie-quality-validation
description: Use this skill when defining or implementing COBie validation rules, data quality views, completeness reports or checker-style diagnostics.
---

# COBie Quality Validation Skill

## Rule categories

- Structural: sheets/columns exist.
- Required field: COBie required values.
- Referential: references to other sheet rows exist.
- Uniqueness: required unique names.
- Picklist: values appear in allowed list.
- Type: dates/numbers/units parse correctly.
- Business: project-specific requirements.
- Warning: suspicious but not blocking.

## Output

- validation rule id
- severity
- sheet
- field
- SQL/view/function implementation
- message template
- remediation hint
