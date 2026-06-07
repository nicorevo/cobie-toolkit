# Database Migration Review

Status: Task 4 complete. Task 5 applied bootstrap fixes for API view security, `validate_workbook` authorization and authenticated grants.

## Scope

Reviewed starter migrations:

- `000001_extensions_and_schemas.sql`
- `000002_tenant_auth_baseline.sql`
- `000003_cobie_core_v24_compat_schema.sql`
- `000004_cobie_support_indexes_views.sql`
- `000005_rls_policies.sql`
- `000006_api_rpc_contracts.sql`
- `000007_validation_views.sql`

Review criteria:

- tenant isolation with `organization_id`;
- `workbook_id` and `raw_row` on sheet-compatible COBie tables;
- RLS enabled with explicit policies;
- INSERT/UPDATE policies with `WITH CHECK`;
- risky `security definer` functions;
- view/RPC exposure risks;
- schema drift against the verified Q2 2026 template.

Supabase documentation check: the Supabase RLS docs state that views can bypass RLS by default and recommend `security_invoker = true` on Postgres 15+ for views that should obey underlying table policies.

## Summary

The starter migrations are a usable foundation but should not be treated as production-ready without patching. Tenant-isolated sheet tables mostly satisfy the project rules, but review found security and compatibility issues that must be addressed before MVP release.

Task 5 follow-up on 2026-06-07 resolved three bootstrap/security items:

- API views now use `WITH (security_invoker = true)`.
- `api.validate_workbook` now checks workbook organization membership and returns explicit columns.
- `20260607093913_api_authenticated_grants.sql` grants authenticated PostgREST access without granting DELETE.

## Findings

| Severity | Object | Finding | Risk | Recommended action |
|---|---|---|---|---|
| High | `api.cobie_assets`, `api.cobie_space_index`, `api.cobie_document_index`, `api.cobie_validation_issues` | Views are created without `security_invoker = true`. | In Supabase/Postgres, views can bypass underlying table RLS depending on owner/security behavior. | Add `WITH (security_invoker = true)` for Postgres 15+ or protect views with grants/unexposed schema strategy. |
| High | `cobie.picklist` | `organization_id` and `workbook_id` are nullable, but RLS policy only exposes rows where `organization_id is not null`. | Global picklists are neither clearly exposed nor clearly blocked by contract; import/export mapping differs from template. | Decide whether picklists are org-scoped or global read-only; add explicit audited policy and mapping. |
| Medium | `cobie.*` delete policies | Generic admin delete policy exists for all sheet tables, but ADR-007 says MVP UI exposes no delete and soft delete is undecided. | Physical delete could remove audit/round-trip data if API exposes delete. | Remove or defer delete policy before production, or document admin-only API delete explicitly and test it. |
| Medium | `api.validate_workbook(p_workbook_id)` | Function filters by `workbook_id` only and relies on view/RLS behavior. | If view security is wrong, cross-tenant validation data could leak. | After securing views, add explicit workbook membership check or join to `cobie.workbook` with `app.is_org_member`. |
| Medium | `app.is_org_member`, `app.is_org_admin` | `security definer` helper functions are used. They set `search_path = app, public`, which is good, but they need explicit ownership/grants review. | Security definer functions can become privilege escalation points if ownership or grants drift. | Verify owner, grants and execution privileges during local Supabase review. |
| Medium | COBie catalog/schema | Verified Q2 2026 template uses `ExtSystem` fields and column-oriented `Picklist`; current schema normalizes many fields as `external_*` and row-based picklist. | Import/export round-trip could lose or remap headers incorrectly without explicit mapping. | Keep `raw_row`; create catalog/schema mapping patch after template diff review. |
| Low | Index coverage | Base `(organization_id, workbook_id)` indexes exist for MVP tables and common reference indexes exist for component/space/attribute/document. | Some resource filters may scan until additional name/category/status indexes are added. | Add indexes based on `docs/mvp-resource-matrix.md` after API/query verification. |
| Low | Grants/schema exposure | Migrations do not document grants for `anon`/`authenticated` or exposed schemas. | Supabase Data API availability may not match docs if schema exposure/grants differ. | Document Supabase API schema settings and add explicit grants if needed. |

## Positive checks

- Every main COBie sheet-compatible table has `id`, `organization_id`, `workbook_id`, `source_sheet`, `source_row_number` and `raw_row`.
- RLS is enabled for `app.organizations`, `app.organization_members`, `cobie.workbook` and the listed COBie sheet tables.
- INSERT and UPDATE policies include `WITH CHECK` for workbook and generated sheet policies.
- RLS predicates use membership helpers rather than trusting client-owned `user_id`.
- Base indexes exist for `organization_id, workbook_id` on MVP tables.

## Required patches before MVP release

1. Secure API views with `security_invoker` or an equivalent grants strategy. Resolved in Task 5.
2. Reconcile or explicitly defer the `cobie.picklist` model against the verified Q2 2026 `Picklist` worksheet.
3. Decide whether SQL delete policies remain, are removed, or are replaced with soft delete.
4. Harden `api.validate_workbook` with explicit authorization once view security is settled. Resolved in Task 5.
5. Document Supabase schema exposure/grants for `api` and `cobie` schemas. Initial authenticated grants added in Task 5; API docs still need update.

## Recommended next task

Proceed to Task 6 for an executable RLS smoke fixture. Keep the unresolved picklist/delete/API-doc findings in scope for the relevant follow-up tasks.
