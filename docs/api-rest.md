# API REST

## Principio

Usare Supabase Data REST API/PostgREST come API primaria.

Base URL tipica:

```text
https://<project-ref>.supabase.co/rest/v1/
```

## Risorse MVP

- `/cobie_workbook`
- `/cobie_contact`
- `/cobie_facility`
- `/cobie_floor`
- `/cobie_space`
- `/cobie_zone`
- `/cobie_type`
- `/cobie_component`
- `/cobie_system`
- `/cobie_attribute`
- `/cobie_document`
- `/cobie_job`
- `/cobie_resource`
- `/cobie_issue`
- `/cobie_picklist`

## Viste API consigliate

- `/cobie_assets`
- `/cobie_space_index`
- `/cobie_document_index`
- `/cobie_validation_issues`

## RPC consigliate

- `/rpc/create_workbook`
- `/rpc/clone_workbook`
- `/rpc/validate_workbook`
- `/rpc/commit_import_batch`
- `/rpc/export_workbook_request`

## Pattern query PostgREST

Paginazione:

```http
Range: 0-49
Prefer: count=exact
```

Filtri:

```text
?workbook_id=eq.<uuid>&name=ilike.*pump*
```

Sorting:

```text
?order=name.asc
```

## Auth

Tutte le chiamate devono passare:

```http
Authorization: Bearer <supabase-access-token>
apikey: <publishable-or-anon-key>
```

La sicurezza reale è in RLS.
