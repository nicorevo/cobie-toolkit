---
name: rest-api-contract
description: Use this skill to design, document or review the REST API contract exposed through Supabase/PostgREST and RPC endpoints.
---

# REST API Contract Skill

## Required reading

1. `api/openapi.cobie-rest.yaml`
2. `api/postgrest-endpoints.md`
3. `docs/api-rest.md`
4. `supabase/migrations/`

## Rules

- Prefer PostgREST CRUD for simple resources.
- Prefer views for read-optimized endpoints.
- Prefer RPC for transactional operations.
- Every endpoint must document auth and tenant behavior.
- Avoid exposing internal staging tables directly.
- Include pagination and filtering examples.

## Output

- endpoints added/changed
- auth model
- query examples
- RLS assumptions
- OpenAPI changes
