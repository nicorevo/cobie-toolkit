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
- Il provider applica lo scope del workbook corrente alle risorse COBie e ai
  read model con `workbook_id`: senza workbook selezionato, le liste scoperte
  restituiscono vuoto e le letture puntuali sono bloccate; i record letti fuori
  dal workbook corrente vengono scartati.
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

## Navigazione workbook-scoped

- La selezione del workbook corrente e' obbligatoria per navigare le risorse
  COBie scoperte da `workbook_id`.
- Il workbook corrente viene salvato in `localStorage` e ripristinato al
  refresh.
- Al bootstrap dell'app, se non esiste un workbook corrente valido, viene
  selezionato automaticamente l'ultimo workbook accessibile ordinato per
  `created_at desc`.
- La selezione del workbook salva anche `organization_id` e nome workbook nel
  contesto UI. L'organization resta derivata dalla membership utente/workbook,
  non da input libero dell'utente.
- Il workbook corrente si cambia dalla pagina dedicata `Workbooks`; non ci
  sono azioni globali di cambio o pulizia sopra la breadcrumb.
- Le liste COBie usano `WorkbookScopedList`: senza workbook selezionato
  mostrano un prompt invece di caricare dati non scoperte.
- Le relazioni linkabili devono seguire relazioni reali del database. Nel
  modello corrente, la lista Facilities espone la colonna finale `Floors`,
  che apre i Floor filtrati per `workbook_id` e `facility_id` usando la FK
  normalizzata `floor.facility_id -> facility.id`; la lista Floors espone la
  colonna finale `Spaces`, che apre gli Space filtrati per `workbook_id` e
  `floor_id` usando la FK normalizzata `space.floor_id -> floor.id`.
- La breadcrumb amministrativa mostra `Workbooks / <Workbook> / ...` e
  risolve sempre i nomi leggibili dei record; nei deep link diretti recupera
  i nomi tramite dataProvider invece di mostrare ID grezzi.

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
- "Sezione amministrativa": lookup COBie List, Show, Create, Edit e Delete per:
  `category_contact`, `category_facility`, `category_floor`,
  `category_space`, `category_zone`, `category_type`, `asset_type`,
  `category_system`, `assembly_type`, `connection_type`, `category_spare`,
  `category_resource`, `category_job`, `job_status`, `impact_type`,
  `impact_stage`, `category_document`, `document_stage`,
  `category_attribute`, `category_coordinate`, `issue_type`, `issue_risk`,
  `issue_chance`, `issue_impact`.

Le form manuali mostrano `organization_id` in sola lettura e bloccano
`workbook_id` quando un workbook corrente e' selezionato. Il `dataProvider`
inietta comunque `organization_id` e `workbook_id` dal contesto corrente prima
di create/update: la UI migliora l'esperienza, ma RLS resta il controllo
autorevole di membership e coerenza `organization_id`/`workbook_id`.

Le lookup amministrative espongono Delete in UI. Il permesso reale resta nel
database: solo gli admin organizzazione passano la policy RLS di delete e i
vincoli FK impediscono di cancellare lookup gia' referenziate da righe COBie.

## Smoke manuali pendenti

Da eseguire quando è disponibile una sessione Supabase/Auth reale o un utente locale seedato:

- raggiungere la login React Admin senza crash runtime;
- login/logout;
- lista workbook visibile per membership;
- create/list/select workbook corrente;
- bootstrap con selezione automatica dell'ultimo workbook creato quando
  `localStorage` non contiene un workbook corrente;
- `organization_id` visibile ma non modificabile nelle form;
- CRUD smoke per Contact, Facility, Floor, Space, Zone, Type, Component, System, Attribute e Document;
- list/show smoke read-only per Job, Resource, Issue e Picklist;
- lista read-only Validation Issues e filtro per workbook/severity.
- sezione amministrativa lookup visibile nel menu;
- create/edit/delete di una lookup non referenziata, ad esempio una categoria Facility;
- errore DB mostrato quando si tenta di eliminare una lookup referenziata;
- errore autorizzazione mostrato correttamente quando RLS nega una write.
- workbook corrente persistente dopo refresh pagina;
- risorse COBie bloccate con prompt quando nessun workbook e' selezionato;
- link Facilities -> Floors filtra per `workbook_id` e `facility_id`;
- link Floors -> Spaces filtra per `workbook_id` e `floor_id`;
- breadcrumb su deep link come `/admin/floor/<id>/show` mostra il nome del
  record, non l'ID grezzo.
