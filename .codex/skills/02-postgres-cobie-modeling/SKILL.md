---
name: postgres-cobie-modeling
description: Use this skill when creating or modifying PostgreSQL schemas, COBie tables, migrations, indexes, views, RPCs or database constraints.
---

# PostgreSQL COBie Modeling Skill

## Required reading

1. `AGENTS.md`
2. `docs/data-model-cobie.md`
3. `docs/postgres-naming.md`
4. `reference/relationships.json`
5. Existing files in `supabase/migrations/`

## Rules

- Every table must include `id`, `organization_id`, `workbook_id` unless it is global metadata.
- Every sheet-compatible table must include `raw_row jsonb`.
- Use migrations only.
- Use `text` for spreadsheet-like fields until the standard-specific parser validates types.
- Add indexes for all FK-like references, common filters and RLS predicates.
- Avoid destructive migrations unless explicitly approved.

## Workflow

1. Identify sheet/resource.
2. Confirm field map.
3. Add/modify migration.
4. Add indexes.
5. Add views if API should not expose raw table.
6. Update docs.
7. Request RLS review.

## Output

- migrations changed
- tables/views/functions changed
- relationship changes
- compatibility notes
