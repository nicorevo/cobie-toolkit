# MVP Test Report

Date: 2026-06-07

## Revalidation attempt - 2026-06-18

Target: current uncommitted worktree, including workbook-scoped navigation and
the `floor.facility_id` migration.

### Results

| Check | Result | Evidence |
| --- | --- | --- |
| Documentation diff | Pass | `git diff --check` completed without errors. |
| Local Supabase CLI | Pass | Version `2.105.0` runs with project-local HOME. |
| Project SSH material | Pass | Private key exists under `.local/ssh/` with mode `0600`; `known_hosts` exists. Key contents were not read or printed. |
| Initial remote SSH | Partial pass | Host answered and reported `x86_64`. |
| Supabase containers | Partial pass | Database, Kong, Auth, REST, Realtime, Storage, Studio, Inbucket, Analytics, Vector and pg-meta were running; Edge Runtime was exited. |
| Frontend container | Fail | `cobie-frontend-dev` was not running. |
| Published HTTP endpoints | Fail | Frontend, API gateway, Studio, Inbucket and analytics checks returned connection failure. |
| Remote follow-up | Blocked | Host became unreachable with `No route to host` before sync/start/test commands could run. |
| Local frontend gates | Blocked | Workstation has Node but no `npm`, no Docker CLI and no installed `frontend/node_modules`. |
| Current migration/RLS/API smoke | Blocked | Could not sync the current worktree or reach the remote database after network loss. |
| Current browser/Auth smoke | Blocked | Frontend endpoint was unavailable. |

### Current verdict

**NO-GO for claiming the environments are fully operational on 2026-06-18.**

Required rechecks after the remote host is reachable:

1. synchronize the current worktree without `.git`, `.local`, `.env*`,
   dependencies or build outputs;
2. run `supabase start` and verify all required project containers;
3. start `cobie-frontend-dev`;
4. verify published HTTP endpoints;
5. run migration status, RLS smoke and API smoke;
6. run frontend typecheck, lint and build;
7. complete authenticated browser smoke.

The environment access procedure and correct `.local/ssh/` path are documented
in `docs/environment-operations.md`.

## Environment

- Remote Linux Docker host: `192.168.1.150`
- Remote user: `codex`
- Remote project path: `/home/codex/work/cobie-react-admin-agentic-kit`
- Supabase stack: local development stack on the remote Docker host
- Frontend checks: Node 22 container mounted on the remote `frontend/` directory

No Supabase keys, service keys, JWT secrets, or real user credentials are recorded in this report.

## Summary

| Check | Result | Notes |
| --- | --- | --- |
| RLS smoke | Pass | Cross-tenant SELECT/INSERT/UPDATE denial verified. |
| API/PostgREST/RPC smoke | Pass | All MVP resource list/filter paths plus create/update and validation view/RPC verified. |
| Frontend lint | Pass | Executed in remote Node container. |
| Frontend typecheck | Pass | Executed in remote Node container. |
| Frontend build | Pass | Non-blocking bundle size warning remains. |
| Manual browser UI smoke | Pending | Requires browser/Auth session verification. |

## Commands Run

RLS smoke:

```bash
docker exec -i supabase_db_cobie-react-admin \
  psql -v ON_ERROR_STOP=1 -U postgres -d postgres \
  < scripts/rls-smoke-tests.sql
```

API smoke:

```bash
HOME=$PWD/.local/supabase-home \
SUPABASE_BIN=$PWD/.local/bin/supabase \
./scripts/api-smoke-tests.sh
```

Frontend lint:

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app node:22-bookworm-slim npm run lint
```

Frontend typecheck:

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app node:22-bookworm-slim npm run typecheck
```

Frontend build:

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app node:22-bookworm-slim npm run build
```

## RLS Smoke Coverage

The SQL smoke fixture verifies:

- user A sees only organization/workbook/component data for tenant A;
- user A can insert and update records in tenant A;
- user A cannot insert or update cross-tenant COBie records;
- user A cannot pair a tenant A `organization_id` with a tenant B `workbook_id`;
- user B sees only tenant B data;
- anonymous access cannot select tenant data or call `api.validate_workbook`.

Result: pass.

## API Smoke Coverage

`scripts/api-smoke-tests.sh` seeds deterministic local development data, creates local authenticated JWTs from the local Supabase JWT secret, calls PostgREST with the anon key, and cleans up seeded records on exit.

Covered cases:

- workbook list for authenticated tenant user;
- component list scoped by tenant and workbook;
- cross-tenant component list returns no tenant A records for user B;
- filters for Contact, Facility, Zone, Type, System, Attribute, Document, Job, Resource, Issue and Picklist;
- component create and update;
- cross-tenant component create denial;
- validation issues read model;
- `api.validate_workbook` RPC.

Result: pass.

## Frontend Quality Gate

`npm run lint`, `npm run typecheck`, and `npm run build` all passed in the remote Node 22 container.

The build still reports a non-blocking chunk size warning for the React Admin bundle. This should be revisited before production hardening, but it does not block the current MVP implementation tasks.

## Pending Manual Smoke

The following checks are still pending because they require a browser session with a real or seeded Supabase Auth user:

- React Admin login and logout;
- workbook create/list visibility by membership and current workbook selection;
- CRUD smoke for Contact, Facility, Floor, Space, Zone, Type, Component, System, Attribute and Document;
- read-only list/show smoke for Job, Resource, Issue and Picklist;
- authorization errors rendered correctly in React Admin.

## Findings

- Blocker: none from automated checks.
- High: none from automated checks.
- Medium: none from automated checks.
- Low: React Admin build emits a large bundle warning.
- Pending risk: manual browser/Auth smoke has not been executed.
