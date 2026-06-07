# Handoff

## Agent
Project Orchestrator Agent + React Admin Agent + QA Agent

## Task
Task 17: MVP release checklist and handoff

## Files changed
- `frontend/src/admin/AdminApp.tsx`
- `frontend/src/admin/resources/workbooks.tsx`
- `frontend/src/admin/resources/contacts.tsx`
- `frontend/src/admin/resources/zones.tsx`
- `frontend/src/admin/resources/systems.tsx`
- `frontend/src/admin/resources/jobs.tsx`
- `frontend/src/admin/resources/resources.tsx`
- `frontend/src/admin/resources/issues.tsx`
- `frontend/src/admin/resources/picklists.tsx`
- `scripts/api-smoke-tests.sh`
- `docs/mvp-release-checklist.md`
- `docs/react-admin-frontend.md`
- `docs/testing-strategy.md`
- `docs/test-report-mvp.md`
- `docs/implementation-plan-mvp.md`

## Skills used
- `using-agent-skills`
- `project-orchestrator`
- `react-admin-resource`
- `react-dev`
- `documentation-and-adrs`
- `shipping-and-launch`

## Decisions
- Close RF-03 coverage by implementing all missing MVP React Admin resources before marking Task 17 complete.
- Keep Job, Resource, Issue and Picklist read-only, matching `docs/mvp-resource-matrix.md`.
- Use direct `cobie.workbook` Create/Edit in React Admin for MVP CRUD completeness while keeping `api.create_workbook` documented for controlled flows.
- Extend API smoke to cover all MVP resource list/filter endpoints.

## Assumptions
- Manual browser/Auth smoke will be run by a human or a later browser-enabled agent.
- The large React Admin bundle warning is acceptable for MVP validation and should be addressed before production hardening.
- Fase 2 import/export must not start until human review accepts Fase 1.

## Open questions
- Should Workbook creation in React Admin be moved from direct table create to `api.create_workbook` before production?
- Should Job, Resource, Issue and Picklist become editable after human review, or remain read-only through Fase 1?
- Which real Supabase/Auth user should be used for final UI smoke?

## Required next agent
QA Agent for browser/Auth smoke, then Project Manager Agent for Fase 2 approval.

## Recommended next skills
- `browser-testing-with-devtools`
- `web-design-guidelines`
- `test-driven-development`
- `code-review-and-quality`
- `cobie-import-export` after Fase 2 approval

## Validation performed
- Remote `npm run typecheck`: pass.
- Remote `npm run lint`: pass.
- Remote `npm run build`: pass with known bundle size warning.
- Remote extended `scripts/api-smoke-tests.sh`: pass.
- Previous RLS smoke in `docs/test-report-mvp.md`: pass.

## Blockers
- Manual browser/Auth smoke is pending.
- Production release is blocked until manual smoke, code review and production hardening are complete.
