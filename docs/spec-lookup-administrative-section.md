# Spec: Sezione Amministrativa Lookup COBie

## Assunzioni

1. Le tabelle lookup sono quelle gia' create dalla normalizzazione e referenziate da chiavi esterne nelle entita' COBie.
2. Il backend resta Supabase/PostgREST: niente backend custom e niente Edge Function per CRUD semplice.
3. "Censimento" significa List, Show, Create, Edit e Delete delle lookup.
4. Le lookup devono essere raccolte in una voce di menu React Admin chiamata "Sezione amministrativa".
5. Le lookup restano tenant/workbook scoped: ogni record mantiene `organization_id` e `workbook_id`.
6. La UI puo' chiedere `organization_id` e `workbook_id` espliciti finche' non esiste un selettore globale che li inietta automaticamente.

## Objective

Creare una sezione amministrativa frontend/backend per censire tutte le tabelle lookup usate dalle chiavi esterne normalizzate.

L'utente amministrativo deve poter creare, modificare ed eliminare, per workbook, valori come la categoria di Facility, Floor, Space, Zone, Type, System, Contact, Document, Attribute, Resource, Job, Issue e gli altri elenchi normalizzati. Le form principali gia' collegate via `ReferenceInput` devono poi mostrare questi valori nei dropdown.

## Tech Stack

- Vite SPA React.
- TypeScript strict.
- React Admin per List/Show/Create/Edit.
- Material UI per layout/menu.
- Supabase PostgreSQL con PostgREST come API primaria.
- RLS Supabase come boundary di sicurezza reale.

## Commands

Esecuzione locale frontend, se `npm` e' disponibile:

```bash
cd frontend && npm run dev -- --host 0.0.0.0
cd frontend && npm run lint
cd frontend && npm run typecheck
cd frontend && npm run build
```

Esecuzione verifiche via Docker remoto gia' usata nel progetto:

```bash
ssh -i .local/ssh/codex_cobie_192_168_1_150 -o UserKnownHostsFile=.local/ssh/known_hosts -o BatchMode=yes codex@192.168.1.150 'cd /home/codex/work/cobie-react-admin-agentic-kit && docker run --rm -v "$PWD/frontend":/app -w /app node:22-bookworm-slim npm run lint'
ssh -i .local/ssh/codex_cobie_192_168_1_150 -o UserKnownHostsFile=.local/ssh/known_hosts -o BatchMode=yes codex@192.168.1.150 'cd /home/codex/work/cobie-react-admin-agentic-kit && docker run --rm -v "$PWD/frontend":/app -w /app node:22-bookworm-slim npm run typecheck'
ssh -i .local/ssh/codex_cobie_192_168_1_150 -o UserKnownHostsFile=.local/ssh/known_hosts -o BatchMode=yes codex@192.168.1.150 'cd /home/codex/work/cobie-react-admin-agentic-kit && docker run --rm -v "$PWD/frontend":/app -w /app node:22-bookworm-slim npm run build'
```

Smoke backend/RLS se si toccano grant, policy o migrazioni:

```bash
ssh -i .local/ssh/codex_cobie_192_168_1_150 -o UserKnownHostsFile=.local/ssh/known_hosts -o BatchMode=yes codex@192.168.1.150 'cd /home/codex/work/cobie-react-admin-agentic-kit && docker exec -i supabase_db_cobie-react-admin psql -v ON_ERROR_STOP=1 -U postgres -d postgres < scripts/rls-smoke-tests.sql'
```

## Project Structure

```text
frontend/src/admin/AdminApp.tsx
  Registra Resource React Admin e layout/menu.

frontend/src/admin/dataProvider.ts
  Instrada le risorse lookup sullo schema PostgREST corretto.

frontend/src/admin/resources/
  Resource COBie esistenti e nuove resource lookup amministrative.

frontend/src/admin/resources/referenceInputs.tsx
  Helper ReferenceInput/ReferenceField gia' usati dai dropdown.

docs/react-admin-frontend.md
  Stato delle resource React Admin.

docs/api-rest.md
  Superficie PostgREST esposta.

api/postgrest-endpoints.md
  Endpoint tabellari da documentare.
```

## Lookup Scope

Le lookup da censire nella sezione amministrativa sono:

- `category_contact`
- `category_facility`
- `category_floor`
- `category_space`
- `category_zone`
- `category_type`
- `asset_type`
- `category_system`
- `assembly_type`
- `connection_type`
- `category_spare`
- `category_resource`
- `category_job`
- `job_status`
- `impact_type`
- `impact_stage`
- `category_document`
- `document_stage`
- `category_attribute`
- `category_coordinate`
- `issue_type`
- `issue_risk`
- `issue_chance`
- `issue_impact`

Le tabelle junction normalizzate, come `component_space`, `zone_space`, `system_component`, `assembly_child`, `spare_supplier`, `job_resource`, `job_prior`, `row_reference` e `issue_target`, non sono lookup pure. Vanno escluse dalla prima sezione amministrativa lookup oppure trattate in una futura sezione "Relazioni" con form dedicate.

## Code Style

Le resource lookup devono essere generate o scritte con una configurazione compatta e tipizzata, evitando una copia lunga per ogni tabella.

Esempio atteso:

```tsx
const lookupResources: LookupResourceConfig[] = [
  {
    name: 'category_facility',
    label: 'Facility Categories',
    valueField: 'category_name',
  },
];
```

Le form devono essere semplici:

```tsx
<SimpleForm>
  <TextInput source="organization_id" validate={requiredField} fullWidth />
  <TextInput source="workbook_id" validate={requiredField} fullWidth />
  <TextInput source={valueField} validate={requiredField} fullWidth />
</SimpleForm>
```

## Testing Strategy

- TypeScript: `npm run typecheck`.
- Lint: `npm run lint`.
- Build: `npm run build`.
- Backend/RLS smoke solo se la feature richiede nuove migrazioni, grant o policy.
- Smoke manuale browser:
  - aprire `/admin`;
  - verificare presenza voce "Sezione amministrativa";
  - aprire almeno `category_facility`;
  - creare/modificare una categoria;
  - eliminare una categoria non referenziata;
  - verificare che l'eliminazione di una lookup referenziata venga bloccata dal vincolo FK/RLS e mostri errore applicativo;
  - tornare su Facility Create/Edit e verificare che il dropdown Category mostri il valore censito.

## Boundaries

- Always:
  - usare React Admin Resource per CRUD lookup;
  - mantenere RLS come sicurezza reale;
  - mantenere `organization_id` e `workbook_id` su ogni lookup;
  - usare PostgREST/Supabase come backend primario;
  - aggiornare documentazione frontend/API.

- Ask first:
  - aggiungere migrazioni nuove;
  - cambiare policy RLS o grant;
  - introdurre nuove dipendenze;
  - cambiare il comportamento FK per cancellazioni di lookup referenziate.

- Never:
  - usare `service_role` nel frontend;
  - spostare autorizzazione reale nella UI;
  - creare backend custom per CRUD lookup semplice;
  - rendere globali lookup che sono workbook-scoped;
  - esporre tabelle junction come lookup se non hanno semantica di elenco.
  - forzare cancellazioni di lookup referenziate bypassando FK o RLS.

## Success Criteria

1. Esiste nel menu React Admin una voce "Sezione amministrativa".
2. Tutte le lookup in `Lookup Scope` sono raggiungibili da quella sezione.
3. Ogni lookup ha List, Show, Create, Edit e Delete.
4. Ogni lookup consente censimento dei campi minimi: `organization_id`, `workbook_id` e campo valore (`category_name`, `type_name`, `asset_type_name`, `status_name`, `stage_name`, `risk_name`, `chance_name`, `impact_name`, ecc.).
5. Le form COBie principali continuano a usare `ReferenceInput` e vedono i valori censiti.
6. La Delete UI consente di eliminare solo record non protetti da vincoli FK/RLS; i record referenziati devono fallire lato database.
7. `lint`, `typecheck` e `build` passano.
8. La documentazione React Admin/API indica la nuova sezione e le lookup gestite.

## Open Questions

1. Confermi che le tabelle junction normalizzate restino fuori dalla "Sezione amministrativa" lookup per ora?
2. Confermi che nella prima versione `organization_id` e `workbook_id` restino campi espliciti nelle form lookup?

## Implementation Plan

1. Creare una resource React Admin generica per lookup.
   - Un singolo file configura List, Show, Create, Edit e Delete per tutte le lookup.
   - Ogni lookup dichiara `name`, label e campo valore.
   - Le liste filtrano per `workbook_id` e per campo valore.

2. Registrare tutte le lookup come Resource.
   - Le resource usano lo schema `cobie` gia' configurato in `dataProvider`.
   - Le resource vengono raggruppate visivamente in una voce di menu "Sezione amministrativa".
   - Le lookup restano raggiungibili da React Admin per alimentare i dropdown gia' introdotti.

3. Aggiungere il menu amministrativo.
   - Implementare un menu custom React Admin compatto.
   - Tenere le risorse COBie principali nel menu esistente.
   - Raccogliere le lookup in una sezione/collapsible o gruppo dedicato chiamato "Sezione amministrativa".

4. Gestire Delete in UI.
   - Abilitare `DeleteButton`/bulk delete sulle lookup.
   - Lasciare a FK e RLS il blocco reale delle cancellazioni non ammesse.
   - Non introdurre cascade delete o bypass lato frontend.

5. Aggiornare documentazione.
   - Aggiornare `docs/react-admin-frontend.md`.
   - Aggiornare `docs/api-rest.md` e/o `api/postgrest-endpoints.md` per dichiarare le lookup gestibili.

6. Verificare.
   - Eseguire `lint`, `typecheck`, `build`.
   - Eseguire smoke RLS/API solo se emergono problemi backend o se vengono introdotte migration.
   - Smoke manuale su `/admin`: aprire "Sezione amministrativa", creare/modificare/eliminare una lookup non referenziata e verificare il dropdown nella form principale.

## Implementation Tasks

- [x] Task: Creare configurazione e componenti CRUD lookup
  - Acceptance: esiste una risorsa generica capace di gestire tutte le lookup dello scope con List, Show, Create, Edit e Delete.
  - Verify: `npm run typecheck`.
  - Files: `frontend/src/admin/resources/lookupResources.tsx`.

- [x] Task: Registrare le lookup nel router React Admin
  - Acceptance: tutte le lookup in `Lookup Scope` sono registrate come `Resource` con label leggibili.
  - Verify: build TypeScript e apertura menu React Admin.
  - Files: `frontend/src/admin/AdminApp.tsx`.

- [x] Task: Implementare menu "Sezione amministrativa"
  - Acceptance: il menu mostra una voce/gruppo "Sezione amministrativa" che contiene tutte le lookup, senza mescolare le tabelle junction.
  - Verify: smoke browser su `/admin`.
  - Files: `frontend/src/admin/AdminApp.tsx`, eventuale `frontend/src/admin/AdminMenu.tsx`.

- [x] Task: Verificare/abilitare Delete UI lookup
  - Acceptance: le lookup mostrano azioni Delete; una cancellazione non ammessa resta bloccata da FK/RLS.
  - Verify: smoke manuale e, se necessario, smoke RLS.
  - Files: `frontend/src/admin/resources/lookupResources.tsx`.

- [x] Task: Aggiornare documentazione
  - Acceptance: docs frontend/API indicano la nuova sezione amministrativa e le lookup CRUD.
  - Verify: review diff documentazione.
  - Files: `docs/react-admin-frontend.md`, `docs/api-rest.md`, `api/postgrest-endpoints.md`.

- [x] Task: Verifiche finali
  - Acceptance: lint, typecheck e build passano sul nodo remoto.
  - Verify: comandi Docker remoti documentati in `Commands`.
  - Files: nessun file aggiuntivo previsto.
