# Handoff

## Agent
Import/Export Agent + Supabase Security Agent

## Task
Task 18: Import/export architecture spike

## Files changed
- `docs/import-export-design.md`
- `docs/import-export-workflow.md`
- `docs/security-guardrails.md`
- `docs/api-rest.md`
- `docs/implementation-plan-mvp.md`
- `DECISIONS.md`

## Skills used
- `using-agent-skills`
- `cobie-import-export`
- `cobie-standard-ingestion`
- `cobie-quality-validation`
- `supabase`
- `supabase-rls-security-review`
- `postgres-cobie-modeling`
- `documentation-and-adrs`

## Decisions
- Use private Storage plus Edge Functions as the public import/export boundary.
- Use a non-exposed `cobie_io` schema for import batches, sheet metadata, staged rows, validation issues and export jobs.
- Expose only safe `api` views/RPC and Edge Function endpoints.
- Support `create_new_workbook` as the first commit mode; defer replace/append until audit and duplicate strategy are designed.
- Use a worker boundary for large parsing/export generation instead of forcing all heavy work into Edge Functions.

## Assumptions
- Human review accepts starting Fase 2 discovery, but manual browser/Auth smoke remains required before production release.
- The COBie Q2 2026 template remains the Fase 2 target.
- Existing row-based `cobie.picklist` is not definitive for round-trip because the real `Picklist` sheet is column-oriented.

## Open questions
- Exact role threshold for import approval/commit: `owner/admin/editor` or a new import permission.
- Whether workbook import should support append in the first implementation slice or only new workbook creation.
- Retention duration for source workbooks, staging rows and generated exports.
- Worker runtime choice: Edge background task, self-hosted worker or another Supabase-compatible job runner.

## Required next agent
Database Architect Agent for `cobie_io` migration design, followed by Supabase Security Agent for RLS/Storage policy review.

## Recommended next skills
- `postgres-cobie-modeling`
- `supabase`
- `supabase-postgres-best-practices`
- `supabase-rls-security-review`
- `cobie-import-export`
- `test-driven-development`

## Validation performed
- Design checked against current project docs and Fase 2 requirements RF-11 through RF-15.
- Official Supabase docs/changelog reviewed for Edge Functions, Storage RLS and RLS security notes.
- No browser-side workbook processing introduced.
- No migration or executable code introduced in this spike.

## Blockers
- Migration, Storage policy and Edge Function implementation are not yet created.
- Manual browser/Auth smoke from Fase 1 remains pending before a release decision.
