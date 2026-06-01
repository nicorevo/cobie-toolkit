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
