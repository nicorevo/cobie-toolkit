# Architettura

## Vista logica

```text
Browser SPA
  |
  | React Admin / Supabase JS
  v
Supabase API Gateway
  |
  | PostgREST REST API
  v
PostgreSQL schemas: app, cobie, api
  |
  +-- RLS tenant isolation
  +-- Views for API/read models
  +-- RPC for controlled actions

Supabase Edge Functions
  |
  +-- import/export COBie workbook
  +-- operations requiring secrets/service role
  +-- external integrations
```

## Frontend

- Vite + React.
- React Admin per CRUD.
- Redux Toolkit solo per stato UI.
- Material React Table per griglie operative extra.

## Backend

- Supabase PostgreSQL.
- REST API auto-generata.
- RPC per operazioni controllate.
- Edge Functions per import/export e segreti.

## Schemi database

- `app`: organizzazioni, membership, profili.
- `cobie`: tabelle sheet-compatible.
- `api`: viste e RPC esposte in modo controllato.

## Flusso CRUD

1. Utente fa login con Supabase Auth.
2. React Admin invia richiesta al dataProvider.
3. dataProvider chiama Supabase REST API.
4. PostgREST applica ruolo JWT.
5. PostgreSQL applica RLS.
6. Solo righe dell'organizzazione autorizzata sono visibili/modificabili.

## Flusso import workbook

1. Utente carica file.
2. File va in Storage privato.
3. Edge Function valida workbook.
4. Dati vanno in staging.
5. Validation report.
6. Commit controllato verso tabelle COBie.
