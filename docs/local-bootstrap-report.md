# Local Bootstrap Report

Status: Task 5 completed on remote Linux Docker host.

Date: 2026-06-07

## Local machine outcome

The local workstation can run the Supabase CLI, but it is not currently the verified Docker host for this project.

```bash
HOME=/home/nicro/Scaricati/cobie-react-admin-agentic-kit/.local/supabase-home ./node_modules/.bin/supabase --version
```

Result:

```text
2.105.0
```

Local Docker was installed, but the first bootstrap path was blocked by Docker socket/user setup and then by a reproducible Supabase Postgres image runtime failure:

```text
exec /usr/bin/sh: exec format error
```

No local database reset or destructive command was run.

## Remote Docker host

Task 5 was verified on the Linux Docker host provided for this project:

```text
host: 192.168.1.150
ssh user: codex
host name: Vostro-3500
architecture: x86_64
docker: 29.4.2
```

The project was copied to:

```text
/home/codex/work/cobie-react-admin-agentic-kit
```

Current operational details, published URLs, project containers and demo credentials are intentionally kept in the git-ignored `LOCAL_WORKSPACE_CONTEXT.md` file at the project root. Agents and prompts should read that file when present before running remote commands.

Project-local SSH keys and `known_hosts` are stored under `.local/ssh/`.
`.local/.shh` is not used. See `docs/environment-operations.md` for the
versioned procedure; never print or commit private-key contents.

Local-only files were excluded from transfer:

- `.git/`
- `.local/`
- `node_modules/`
- `frontend/node_modules/`
- `dist/`
- `frontend/dist/`
- `.env*`
- `frontend/.env*`

Supabase CLI was copied as local project tooling:

```text
.local/bin/supabase
.local/bin/supabase-go
```

## Migration fixes made during bootstrap

The first remote `supabase start` reached SQL migration execution and failed at `000006_api_rpc_contracts.sql` because `api.validate_workbook` referenced `api.cobie_validation_issues` before that view existed.

Fixes applied:

- API views now use `WITH (security_invoker = true)`.
- `api.validate_workbook` now uses explicit columns instead of `select *`.
- `api.validate_workbook` now performs an explicit organization membership check before returning validation rows.
- A new grants migration was added for authenticated PostgREST access without granting DELETE:
  - `20260607093913_api_authenticated_grants.sql`.
- A new RLS hardening migration was added after the executable smoke test exposed a cross-tenant workbook pairing case:
  - `20260607095410_enforce_workbook_tenant_scope.sql`.

## Verification commands

Remote Supabase start succeeded:

```bash
HOME=$PWD/.local/supabase-home .local/bin/supabase start
```

Migration status:

```bash
HOME=$PWD/.local/supabase-home .local/bin/supabase migration up
```

Result:

```text
Connecting to local database...
Local database is up to date.
```

```bash
HOME=$PWD/.local/supabase-home .local/bin/supabase migration list --local
```

Result:

```text
000001 applied
000002 applied
000003 applied
000004 applied
000005 applied
000006 applied
000007 applied
20260607093913 applied
20260607095410 applied
```

View existence was verified for:

- `api.cobie_assets`
- `api.cobie_document_index`
- `api.cobie_space_index`
- `api.cobie_validation_issues`

RPC existence was verified for:

- `api.create_workbook`
- `api.validate_workbook`

`security_invoker=true` was verified on all API views.

After verification, the remote Supabase stack was stopped non-destructively to avoid leaving development services exposed on the LAN:

```bash
HOME=$PWD/.local/supabase-home .local/bin/supabase stop
```

The Supabase CLI reported that local data were backed up to the Docker volume for project `cobie-react-admin`.

## RPC smoke test

A temporary SQL smoke test inserted an organization, membership, workbook and invalid component inside a transaction, set the role to `authenticated`, called `api.validate_workbook`, and rolled back.

Result:

```text
VAL-003 | Component | TypeName
VAL-004 | Component | Space
ROLLBACK
```

No smoke-test data was persisted.

## RLS smoke test

The executable fixture was verified on the remote database container:

```bash
docker exec -i supabase_db_cobie-react-admin \
  psql -v ON_ERROR_STOP=1 -U postgres -d postgres \
  < scripts/rls-smoke-tests.sql
```

Result:

```text
RLS smoke: passed
ROLLBACK
```

The test covers cross-tenant SELECT/INSERT/UPDATE denial, workbook and organization scope consistency, and anon denial for tenant data/RPC.

## Frontend type and quality checks

The local workstation currently does not have `npm`, so frontend checks were executed on the remote Docker host with a Node container.

Generated Supabase types from the active local stack:

```bash
HOME=$PWD/.local/supabase-home \
SUPABASE_BIN=$PWD/.local/bin/supabase \
./scripts/generate-types.sh
```

Result:

```text
Generated frontend/src/lib/supabase/types.ts for schemas: app,cobie,api
```

Frontend quality gates:

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app \
  node:22-bookworm-slim \
  npm run lint
```

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app \
  node:22-bookworm-slim \
  npm run typecheck
```

Both commands completed successfully.

The production build was also verified after adding the Vite HTML entrypoint:

```bash
docker run --rm \
  -v /home/codex/work/cobie-react-admin-agentic-kit/frontend:/app \
  -w /app \
  node:22-bookworm-slim \
  npm run build
```

Result:

```text
✓ built
```

Vite reported a non-blocking large chunk warning for the initial React Admin bundle.

## Notes

No real Supabase project credentials were requested.

No `.env` file was copied to the server.

The remote Supabase local stack prints local default development keys during `supabase start`; those values are not recorded here and must not be used in production.
