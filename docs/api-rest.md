# API REST

## Principio

Usare Supabase Data REST API/PostgREST come API primaria.

Base URL locale:

```text
http://127.0.0.1:54321/rest/v1/
```

Base URL hosted:

```text
https://<project-ref>.supabase.co/rest/v1/
```

## Schemi Esposti

`supabase/config.toml` espone:

- `api`
- `cobie`
- `app`

`api` è il profilo di default. Per tabelle in `cobie` o `app`, impostare gli header PostgREST:

```http
Accept-Profile: cobie
Content-Profile: cobie
```

oppure usare il client schema-scoped:

```ts
supabase.schema('cobie').from('component')
```

## Risorse MVP

### Read Model API

- `/cobie_assets`
- `/cobie_space_index`
- `/cobie_document_index`
- `/cobie_validation_issues`

### Tabelle COBie

Con profilo `cobie`:

- `/workbook`
- `/contact`
- `/facility`
- `/floor`
- `/space`
- `/zone`
- `/type`
- `/component`
- `/system`
- `/attribute`
- `/document`
- `/job`
- `/resource`
- `/issue`
- `/picklist`

### Tabelle App

Con profilo `app`:

- `/organizations`
- `/organization_members`

## RPC MVP

- `/rpc/create_workbook`
- `/rpc/validate_workbook`

RPC pianificate ma non MVP:

- `/rpc/clone_workbook`
- `/rpc/commit_import_batch`
- `/rpc/export_workbook_request`

## API pianificate Fase 2 import/export

Lo staging import/export non deve essere esposto direttamente tramite PostgREST.
Il design propone uno schema non esposto `cobie_io` e una superficie pubblica
limitata a Edge Functions, RPC controllate e viste `api`.

Edge Functions pianificate:

- `/functions/v1/initiate-import`
- `/functions/v1/process-import-batch`
- `/functions/v1/request-export`
- `/functions/v1/get-export-download`

Viste `api` pianificate:

- `/import_batches`
- `/import_batch_issues`
- `/export_jobs`

RPC pianificate:

- `/rpc/commit_import_batch`

Dettaglio: `docs/import-export-design.md`.

## Pattern Query PostgREST

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

Tutte le chiamate autenticate devono passare:

```http
Authorization: Bearer <supabase-access-token>
apikey: <publishable-key>
```

La sicurezza reale è in RLS:

- `authenticated` vede solo organizzazioni di cui `auth.uid()` è membro;
- le righe COBie usano `app.is_valid_cobie_scope(organization_id, workbook_id)`;
- `anon` non ha accesso ai dati tenant;
- `DELETE` e' concesso via PostgREST solo per le lookup amministrative e resta limitato dalle policy RLS agli admin organizzazione; le cancellazioni di lookup referenziate sono bloccate dai vincoli FK.

Non usare mai `service_role` nel frontend.
