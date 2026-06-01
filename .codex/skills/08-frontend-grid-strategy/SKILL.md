---
name: frontend-grid-strategy
description: Use this skill when building custom operational grids using Material React Table, TanStack Table, server-side pagination, filters, row actions or bulk operations.
---

# Frontend Grid Strategy Skill

## Rules

- Use React Admin Datagrid for normal admin CRUD.
- Use Material React Table for custom operational grids.
- Use server-side mode for large datasets.
- Store durable grid state in URL params or Redux only when needed.
- Do not fetch large tables without limits.
- Bulk actions must be authorized server-side.

## Output

- grid name
- dataset
- columns
- pagination mode
- filters
- indexes required
- row/bulk actions
- security assumptions
