---
name: supabase-rls-security-review
description: Use this skill to review Supabase Row Level Security, grants, service_role usage, storage policies, security definer functions and tenant isolation.
---

# Supabase RLS Security Review Skill

## Review checklist

1. Tables without RLS.
2. RLS enabled but missing policies.
3. Policies using `true` too broadly.
4. Missing `WITH CHECK` on INSERT/UPDATE.
5. Policies trusting client-provided organization_id.
6. Functions declared `security definer` without fixed `search_path`.
7. Grants too broad for anon/authenticated.
8. Missing indexes for RLS predicates.
9. Service role used in frontend.
10. Storage buckets without policies.

## Severity

- Critical: cross-tenant data exposure or service_role leak.
- High: unauthorized mutation.
- Medium: authorization ambiguity.
- Low: hardening/documentation issue.

## Output

For each finding:

- severity
- affected object
- risk
- recommended SQL patch
- migration required yes/no
