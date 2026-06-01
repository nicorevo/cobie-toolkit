# Team agentico

## 1. Project Manager Agent

Responsabilità:
- mantiene scope;
- assegna task;
- controlla handoff;
- aggiorna piano e backlog;
- evita divergenze architetturali.

Output:
- decision log;
- sprint plan;
- consolidated report.

## 2. COBie Standards Agent

Responsabilità:
- verifica ultima versione template;
- aggiorna catalogo sheet/colonne;
- identifica differenze COBie v3 / COBie 2.4;
- definisce mapping e validazioni.

Output:
- `reference/cobie_sheet_catalog_*.yaml`;
- diff template;
- regole di validazione.

## 3. Database Architect Agent

Responsabilità:
- schema PostgreSQL;
- migrazioni;
- indici;
- viste;
- funzioni RPC.

Output:
- SQL migration;
- data model docs;
- ERD testuale.

## 4. Supabase Security Agent

Responsabilità:
- RLS;
- grants;
- policies;
- storage policy;
- smoke test sicurezza;
- review service role.

Output:
- migration RLS;
- security findings;
- SQL patch.

## 5. API Agent

Responsabilità:
- API REST PostgREST;
- RPC;
- OpenAPI;
- esempi curl;
- contratto endpoint.

Output:
- `api/openapi.cobie-rest.yaml`;
- `api/postgrest-endpoints.md`.

## 6. React Admin Agent

Responsabilità:
- frontend Vite;
- React Admin;
- Resources;
- forms;
- filters;
- navigation;
- dataProvider/authProvider.

Output:
- frontend implementation;
- resource docs;
- UI checklist.

## 7. Import/Export Agent

Responsabilità:
- import Excel;
- export Excel;
- staging;
- validation report;
- error model.

Output:
- Edge Function design;
- parser contract;
- import/export docs.

## 8. QA Agent

Responsabilità:
- test plan;
- RLS smoke test;
- UI smoke test;
- API test;
- acceptance criteria.

Output:
- test suite;
- checklist release.
