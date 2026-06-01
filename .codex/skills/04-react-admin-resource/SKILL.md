---
name: react-admin-resource
description: Use this skill when creating or modifying a React Admin Resource backed by Supabase tables, views, RPCs, authProvider, dataProvider, filters or CRUD screens.
---

# React Admin Resource Skill

## Required reading

1. `AGENTS.md`
2. `docs/react-admin-frontend.md`
3. `docs/api-rest.md`
4. `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml`

## Rules

- Use React Admin for standard CRUD.
- Use server-side pagination, filtering and sorting.
- Do not implement security only in the UI.
- Use labels aligned with COBie sheet names.
- Keep form fields manageable; group fields by COBie sections.
- Do not duplicate Resource data in Redux.

## Workflow

1. Identify backing table/view/RPC.
2. Verify API availability.
3. Verify RLS policy.
4. Create List, Show, Create, Edit where needed.
5. Add filters.
6. Add reference inputs when relationships exist.
7. Add validation messages.
8. Update docs and checklist.

## Output

- resource name
- file paths
- CRUD enabled
- filters
- reference fields
- assumptions
