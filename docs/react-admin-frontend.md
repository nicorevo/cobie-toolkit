# Frontend React Admin

## Obiettivo

Costruire un backoffice efficiente per alimentare entità COBie.

## Stack

- Vite
- React
- TypeScript
- React Admin
- Material UI
- Supabase JS
- ra-supabase o dataProvider custom
- Redux Toolkit per stato UI/app

## Risorse MVP

- Workbooks
- Contacts
- Facilities
- Floors
- Spaces
- Zones
- Types
- Components
- Systems
- Attributes
- Documents
- Jobs
- Resources
- Issues
- Picklists

## Linee guida UI

- Ogni risorsa deve avere List.
- Create/Edit solo quando l'entità è alimentabile manualmente.
- Campi COBie tecnici possono essere collassati in accordion.
- `raw_row` non va mostrato nella form standard: solo in view diagnostica.
- Usare filtri per `workbook_id`, `name`, `category`.
- Usare ReferenceInput quando il rapporto è stabile.
- Non caricare picklist complete grandi in ogni form senza caching/paginazione.

## Data provider

Strategia A:
- usare `ra-supabase`.

Strategia B:
- dataProvider custom su Supabase JS/PostgREST se servono mapping complessi.

Stato MVP:

- `frontend/src/admin/dataProvider.ts` usa `ra-supabase`.
- Il provider imposta il profilo PostgREST in base alla risorsa:
  - risorse COBie su schema `cobie`;
  - read model su schema `api`;
  - tabelle tenant applicative su schema `app`.
- `DELETE` non è esposto nella UI MVP, anche se il provider mantiene il metodo standard React Admin.
- Le chiamate reali restano protette da RLS e dai grant Supabase; la UI non è un boundary di sicurezza.

## Auth provider

- Supabase Auth.
- recuperare sessione;
- login/logout;
- checkAuth;
- checkError;
- getIdentity;
- getPermissions.

## Redux

Usare Redux per:

- selezione workbook corrente;
- preferenze UI;
- sidebar/layout;
- filtri globali persistenti;
- stato wizard import.

Non usare Redux per:

- cache principale dei record React Admin;
- token sensibili;
- autorizzazione reale.

## Stato risorse implementate

Implementate con verifica automatica `lint`, `typecheck` e `build`:

- `workbook`: List, Show, Create, Edit, selezione workbook corrente in Redux.
- `contact`: List, Show, Create, Edit.
- `facility`: List, Show, Create, Edit.
- `floor`: List, Show, Create, Edit.
- `space`: List, Show, Create, Edit.
- `zone`: List, Show, Create, Edit.
- `type`: List, Show, Create, Edit.
- `component`: List, Show, Create, Edit.
- `system`: List, Show, Create, Edit.
- `attribute`: List, Show, Create, Edit.
- `document`: List, Show, Create, Edit.
- `job`: List, Show read-only.
- `resource`: List, Show read-only.
- `issue`: List, Show read-only.
- `picklist`: List, Show read-only.
- `cobie_validation_issues`: List, Show read-only diagnostic view.

Le form manuali richiedono ancora `organization_id` e `workbook_id` espliciti. Questo evita di fingere autorizzazione lato frontend: RLS valida membership e coerenza `organization_id`/`workbook_id`.

## Smoke manuali pendenti

Da eseguire quando è disponibile una sessione Supabase/Auth reale o un utente locale seedato:

- raggiungere la login React Admin senza crash runtime;
- login/logout;
- lista workbook visibile per membership;
- create/list/select workbook corrente;
- CRUD smoke per Contact, Facility, Floor, Space, Zone, Type, Component, System, Attribute e Document;
- list/show smoke read-only per Job, Resource, Issue e Picklist;
- lista read-only Validation Issues e filtro per workbook/severity.
- errore autorizzazione mostrato correttamente quando RLS nega una write.
