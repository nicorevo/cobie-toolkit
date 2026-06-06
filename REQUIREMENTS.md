# Specifica funzionale raffinata

Stato: Draft da validare prima di passare a PLAN/TASKS.

## Obiettivo

Costruire una SPA gestionale React Admin + Supabase/PostgreSQL per alimentare, governare e interrogare dati COBie in modo multi-tenant.

Il primo MVP deve permettere a un utente autenticato di lavorare sui workbook della propria organizzazione, gestire manualmente le principali entita COBie sheet-compatible, consultarle via API REST paginabili e preservare i dati originali necessari al futuro import/export Excel.

## Assunzioni

- Target operativo iniziale: COBie UK 2.4 spreadsheet Q2 2026.
- Compatibilita futura: COBie v3 come mapping concettuale, non come modello primario del primo MVP.
- Fase 1: CRUD manuale, API REST, RLS tenant-based, validazioni minime.
- Fase 2: import/export Excel, staging, validation report e round-trip.
- React Admin e Supabase REST/PostgREST bastano per il CRUD iniziale.
- Edge Functions sono riservate a import/export, operazioni privilegiate, segreti e transazioni complesse.
- Le versioni frontend non sono congelate: prima di applicare pattern React/MUI/Vite legati a versioni specifiche, verificare `frontend/package.json`.

## Utenti e ruoli funzionali

- Utente autenticato: accede alla piattaforma e opera sui dati della propria organizzazione.
- Data manager COBie: crea workbook, alimenta entita COBie, corregge dati incompleti.
- API consumer autorizzato: interroga dati COBie tramite Supabase REST/PostgREST.
- Operatore import/export: in Fase 2 carica workbook, legge report errori, approva commit ed esporta workbook.
- Amministratore organizzazione: gestisce membership e autorizzazioni organizzative, se previsto dallo scope applicativo.

## Tech stack

- Vite + React + TypeScript strict.
- React Admin per backoffice CRUD.
- Material UI per componenti e layout.
- Material React Table solo per griglie operative non coperte bene da React Admin.
- Redux Toolkit solo per stato UI/app, non per cache dati server.
- Supabase PostgreSQL come fonte primaria della verita.
- Supabase Auth per autenticazione.
- Supabase RLS per autorizzazione reale.
- Supabase Storage privato per file import/export.
- Supabase Edge Functions per import/export e operazioni privilegiate.
- Supabase REST/PostgREST come primo layer API.

## Commands

Comandi frontend disponibili oggi:

```bash
cd frontend
npm run dev
npm run typecheck
npm run lint
npm run build
```

Comandi database/API da definire quando l'ambiente Supabase locale o remoto sara configurato:

```bash
supabase migration list
supabase migration up
supabase gen types typescript --local > frontend/src/lib/supabase/types.ts
```

## Project structure

```text
AGENTS.md                         -> regole globali per agenti e stack
REQUIREMENTS.md                   -> specifica funzionale corrente
PROJECT_PLAN.md                   -> piano per sprint e scope macro
DECISIONS.md                      -> decisioni architetturali sintetiche
agents/                           -> team, task e protocollo handoff
api/                              -> contratto REST/OpenAPI/PostgREST
docs/                             -> architettura, sicurezza, dati, frontend, testing
frontend/                         -> SPA Vite/React Admin
frontend/src/lib/supabase/         -> client e tipi Supabase generati
supabase/migrations/              -> modifiche schema versionate
supabase/seed.sql                 -> dati seed non sensibili
reference/                        -> template, cataloghi e fonti COBie
```

## Code style

Evitare `any`, mantenere componenti tipizzati e separare stato server da stato UI.

```ts
type WorkbookOption = {
  id: string;
  name: string;
};

type WorkbookSelectorProps = {
  value: string | null;
  choices: WorkbookOption[];
  onChange: (workbookId: string | null) => void;
};

export function WorkbookSelector({
  value,
  choices,
  onChange,
}: WorkbookSelectorProps) {
  return null;
}
```

Convenzioni:

- usare TypeScript strict e tipi generati Supabase quando disponibili;
- tenere il Supabase client in `frontend/src/lib/supabase/client.ts`;
- tenere i tipi generati in `frontend/src/lib/supabase/types.ts`;
- usare `.env` o `frontend/.env.local` solo per credenziali locali ignorate da git;
- non usare service key o secret nel frontend;
- non duplicare record React Admin in Redux;
- documentare ogni modifica strutturale a schema, API o sicurezza.

## Requisiti funzionali Fase 1 - MVP dati COBie

### RF-01 - Accesso autenticato e isolamento organizzazione

L'utente autenticato deve vedere e modificare solo dati appartenenti alle organizzazioni di cui e membro.

Acceptance:

- un utente membro di organizzazione A vede solo righe con `organization_id = A`;
- lo stesso utente non vede righe di organizzazione B via UI o API;
- ogni INSERT/UPDATE deve essere bloccato se tenta di usare una `organization_id` non autorizzata;
- l'autorizzazione reale e implementata da RLS, non dalla UI.

### RF-02 - Workbook logico COBie

L'utente deve poter creare e selezionare un workbook COBie logico dentro la propria organizzazione.

Acceptance:

- un workbook appartiene sempre a `organization_id`;
- ogni record COBie creato manualmente e collegato a `workbook_id`;
- la UI consente di filtrare le risorse per workbook corrente;
- le API consentono filtro per `workbook_id`.

### RF-03 - Alimentazione manuale entita COBie principali

L'utente deve poter creare, leggere, modificare e consultare le risorse MVP:

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

Acceptance:

- ogni risorsa MVP ha almeno una List React Admin;
- Create/Edit sono disponibili solo per entita alimentabili manualmente;
- i campi tecnici o diagnostici possono essere nascosti o collassati;
- `raw_row` non e modificabile nelle form standard;
- i dataset sono paginati lato server.

### RF-04 - Gestione asset/componenti

L'utente deve poter gestire Component come asset operativi e collegarli a Type, Space e Facility quando i riferimenti sono disponibili.

Acceptance:

- Component mostra almeno nome, workbook, type reference testuale o FK, space reference testuale o FK, facility;
- i riferimenti inter-sheet possono restare testuali nel modello sheet-compatible;
- FK nullable sono ammesse solo dove il riferimento e stabile e verificabile;
- la UI consente filtro per workbook, type, space e nome componente.

### RF-05 - Attributi associati a entita COBie

L'utente deve poter gestire attributi collegati a Component, Type, Space, Zone o System tramite `SheetName` e `RowName` o mapping equivalente.

Acceptance:

- Attribute conserva il riferimento COBie originale;
- la UI permette di filtrare attributi per sheet/entity target;
- le validazioni segnalano riferimenti a entita inesistenti;
- la API espone attributi paginabili e filtrabili.

### RF-06 - Documenti collegati a entita COBie

L'utente deve poter gestire document metadata collegati a entita COBie.

Acceptance:

- Document conserva `SheetName` e `RowName` o mapping equivalente;
- la UI permette di filtrare documenti per workbook e target entity;
- eventuali file fisici restano fuori dallo scope Fase 1 salvo metadata minimi;
- Storage privato e gestione file completa sono Fase 2+.

### RF-07 - API REST COBie

Le entita MVP devono essere interrogabili via Supabase REST/PostgREST.

Acceptance:

- ogni endpoint MVP e documentato in `api/postgrest-endpoints.md` o `api/openapi.cobie-rest.yaml`;
- le API supportano autenticazione con bearer token Supabase;
- paginazione, sorting e filtri sono disponibili sulle liste principali;
- viste API/read model sono preferite per query operative e dashboard.

### RF-08 - Griglie paginabili e non bulk

La UI deve evitare caricamenti bulk non paginati per dataset superiori a 500 record.

Acceptance:

- React Admin List usa paginazione lato server;
- filtri comuni includono almeno workbook, name e category dove applicabile;
- Material React Table e usata solo per griglie operative custom;
- nessuna form carica picklist grandi senza paginazione, caching o filtro.

### RF-09 - Preservazione dati originali e campi non mappati

Il sistema deve conservare i campi importati o non ancora mappati in `raw_row jsonb`.

Acceptance:

- ogni tabella COBie sheet-compatible contiene `raw_row`;
- l'intera riga originale viene conservata durante import Fase 2;
- nessun dato non mappato viene eliminato durante normalizzazione o update;
- export Fase 2 puo ricostruire righe da campi tipizzati + `raw_row`.

### RF-10 - Validazioni minime

Il sistema deve distinguere vincoli tecnici, obbligatorieta COBie, regole contrattuali e warning di qualita.

Acceptance:

- le validazioni producono severita `error`, `warning` o `info`;
- errori bloccanti impediscono commit/import Fase 2;
- warning e info restano consultabili;
- viste o RPC espongono almeno record incompleti e riferimenti mancanti.

## Requisiti funzionali Fase 2 - Import/export COBie

### RF-11 - Upload workbook COBie

L'utente autorizzato deve poter caricare un workbook COBie in Storage privato.

Acceptance:

- il file non viene processato seriamente nel browser;
- viene creato un `import_batch`;
- Edge Function valida utente, organizzazione e ruolo prima di leggere il file;
- errori strutturali sono restituiti in formato leggibile.

### RF-12 - Validazione sheets e colonne

Il sistema deve verificare template, fogli e header rispetto al catalogo di riferimento.

Acceptance:

- fogli mancanti producono `STRUCTURE_MISSING_SHEET`;
- colonne mancanti producono `STRUCTURE_MISSING_COLUMN`;
- colonne extra non vengono eliminate e sono preservate in `raw_row`;
- il report distingue errori bloccanti da warning.

### RF-13 - Staging prima del commit

Le righe importate devono passare da staging prima del commit nelle tabelle COBie.

Acceptance:

- staging non e esposto direttamente al frontend tramite API pubblica;
- ogni riga staging conserva numero riga, foglio e dati raw;
- l'utente puo consultare il report prima di approvare il commit;
- il commit e atomico o ha un modello di compensazione documentato.

### RF-14 - Report errori import

L'utente deve poter leggere un report errori per batch di import.

Acceptance:

- il report include sheet, row number, field, code, message e severity;
- codici minimi: `REQUIRED_FIELD_EMPTY`, `REFERENCE_NOT_FOUND`, `DUPLICATE_NAME`, `PICKLIST_INVALID`, `TYPE_PARSE_ERROR`, `BUSINESS_RULE_WARNING`;
- il report e filtrabile per severity e sheet;
- errori non espongono secret o dettagli interni sensibili.

### RF-15 - Export workbook compatibile

L'utente autorizzato deve poter richiedere export del workbook in formato compatibile con il template di riferimento.

Acceptance:

- export usa Edge Function o worker server-side;
- ordine fogli e header seguono il catalogo COBie congelato;
- righe sono ricostruite da campi tipizzati + `raw_row`;
- file export viene salvato in Storage privato;
- il download avviene tramite signed URL temporaneo.

## Requisiti non funzionali

### RNF-01 - TypeScript strict

Il frontend deve compilare in TypeScript strict senza `any` introdotti per aggirare errori.

### RNF-02 - Migrazioni versionate

Ogni modifica schema passa da `supabase/migrations`. Non modificare migration gia applicate in ambienti condivisi.

### RNF-03 - RLS obbligatoria

Ogni tabella applicativa esposta via API deve avere RLS abilitata e policy esplicite con `WITH CHECK` per INSERT/UPDATE.

### RNF-04 - Nessun secret nel browser

Il frontend usa solo `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. Nessuna service key o secret nel codice client. I file `.env` locali devono essere ignorati da git; resta versionabile solo `.env.example`.

### RNF-05 - Test RLS smoke prima del rilascio

Ogni modifica a schema, grants o policy richiede smoke test cross-tenant.

### RNF-06 - Audit minimo

Le tabelle applicative devono supportare almeno created/updated metadata coerenti con le regole Supabase/RLS.

### RNF-07 - Documentazione aggiornata

Ogni modifica a schema, API, sicurezza o flussi import/export aggiorna la documentazione correlata.

### RNF-08 - API documentate

Ogni endpoint, vista o RPC esposta deve essere documentata in `api/openapi.cobie-rest.yaml` o `api/postgrest-endpoints.md`.

### RNF-09 - Performance liste

Le liste devono supportare paginazione server-side. Per query operative frequenti, aggiungere indici o viste API dedicate.

### RNF-10 - Compatibilita import/export futura

Il modello Fase 1 non deve impedire staging, preservazione `raw_row`, validazione e export compatibile in Fase 2.

## Testing strategy

- Typecheck frontend: `cd frontend && npm run typecheck`.
- Lint frontend: `cd frontend && npm run lint`.
- Build frontend: `cd frontend && npm run build`.
- Smoke RLS: utenti di organizzazioni diverse non devono vedere o modificare dati cross-tenant.
- Smoke API: list paginata, filtro, sorting, create, update, RPC validate.
- Smoke UI React Admin: login, logout, list Facility, create Component, filtro workbook, errore autorizzazione.
- Import/export Fase 2: fixture workbook, staging, validation report, commit, export e round-trip minimo.

## Boundaries

Always:

- mantenere PostgreSQL/Supabase come fonte primaria della verita;
- applicare RLS lato database;
- usare React Admin per CRUD standard;
- usare server-side pagination/filtering/sorting per dataset rilevanti;
- preservare `raw_row` e dati non mappati;
- aggiornare documentazione quando cambia schema, API o sicurezza.

Ask first:

- richiedere credenziali reali per test Supabase/Auth/API/Edge Functions;
- cambiare modello dati COBie congelato;
- aggiungere dipendenze produttive;
- creare dataProvider custom al posto di `ra-supabase`;
- introdurre Edge Functions privilegiate;
- usare funzioni `security definer`;
- modificare migration gia applicate;
- cambiare scope Fase 1/Fase 2.

Never:

- usare Next.js, Server Components, API Routes Next.js o `@supabase/ssr`;
- mettere service role key o secret nel frontend;
- implementare autorizzazione solo lato UI;
- fare import/export serio interamente nel browser;
- bypassare RLS per comodita;
- eliminare colonne o dati non mappati;
- fare reset distruttivi del database senza richiesta esplicita.

## Success criteria Fase 1

- Un utente autenticato puo creare un workbook e gestire manualmente le risorse MVP nel proprio tenant.
- Le risorse MVP sono accessibili in React Admin con liste paginabili e filtri principali.
- Component puo essere gestito come asset collegato a Type, Space e Facility dove disponibile.
- Attribute e Document conservano riferimenti COBie e sono filtrabili.
- Le API REST MVP sono documentate, paginabili, filtrabili e protette da RLS.
- Test RLS cross-tenant dimostrano isolamento in lettura e scrittura.
- Typecheck, lint e build frontend passano.
- Documentazione schema/API/sicurezza resta allineata.

## Success criteria Fase 2

- Upload workbook avviene in Storage privato e viene processato lato server/Edge Function.
- Il sistema valida sheets, colonne, obbligatorieta e riferimenti.
- L'utente vede un report errori filtrabile prima del commit.
- Commit da staging a tabelle COBie preserva `raw_row`.
- Export produce workbook compatibile col catalogo di riferimento e disponibile via signed URL temporaneo.

## Open questions

- Quali ruoli applicativi servono oltre alla membership organizzativa base?
- Le Create/Edit React Admin sono necessarie per tutte le risorse MVP o alcune devono essere read-only in Fase 1?
- Il delete deve essere fisico, soft delete o assente per le entita COBie?
- Quale set minimo di campi deve apparire nella List e nelle form di ogni risorsa MVP?
- Il catalogo COBie Q2 2026 e gia congelato o va riconfermato prima di ogni modifica schema?
- `ra-supabase` copre i filtri/reference necessari o va pianificato un dataProvider custom?
- I documenti Fase 1 sono solo metadata COBie o includono anche allegati file?
- Quali regole contrattuali/progetto devono essere distinte dalle obbligatorieta COBie standard?
