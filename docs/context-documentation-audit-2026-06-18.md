# Context and Documentation Audit

Date: 2026-06-18

## Scope reviewed

The audit covered the repository sources that preserve prior project
decisions and agent conversations:

- `AGENTS.md`, `PROJECT_PLAN.md`, `REQUIREMENTS.md`, `DECISIONS.md`;
- `agents/TEAM.md`, task backlog, protocol and handoff reports;
- architecture, data model, API, security, deployment and testing documents;
- MVP release/test/bootstrap reports;
- workbook-scoped navigation spec, plan and task log;
- package scripts, smoke-test fixtures, migrations and current worktree diff;
- git-ignored `LOCAL_WORKSPACE_CONTEXT.md`, without copying its secrets.

External chat history that was not saved in the repository is not available
to this audit.

## Findings resolved

- Documented `.local/ssh/` as the project-local environment access directory.
- Explicitly recorded that `.local/.shh` is not a valid project path.
- Added a single operational guide for SSH, Supabase, containers and test
  order: `docs/environment-operations.md`.
- Updated the project status from starter-only to an executable MVP with
  remaining review gates.
- Linked environment operations from the main README, deployment guide and
  testing strategy.
- Replaced the stale frontend blueprint wording with commands and current
  implementation pointers.

## Current completeness position

The repository documents:

- stack and architecture boundaries;
- COBie template/version assumptions;
- PostgreSQL schema and normalization decisions;
- RLS and API security expectations;
- React Admin resource coverage and workbook-scoped navigation;
- API/PostgREST contract;
- import/export design boundaries;
- local/remote bootstrap and smoke-test procedures;
- agent roles, handoffs and pending work.

Remaining release evidence is operational rather than missing design
documentation:

- authenticated browser smoke for the current frontend;
- final code/security review of the uncommitted workbook-navigation changes;
- production hardening, including bundle review and dependency version policy;
- implementation of Fase 2 import/export, which is intentionally deferred.

## Documentation rule going forward

When environment topology, container names, URLs, credentials or key filenames
change, update `LOCAL_WORKSPACE_CONTEXT.md`. Update versioned documents only
when the reusable procedure or architecture changes.

