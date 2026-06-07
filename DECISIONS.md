# Architecture Decision Records sintetici

## ADR-001: React Admin invece di Next.js

Decisione: usare React SPA con Vite e React Admin.

Motivo:
- obiettivo iniziale backoffice CRUD;
- semplicità di hosting;
- buona integrazione con Supabase;
- rapidità nel costruire maschere dati e griglie.

Conseguenza:
- nessun server-side rendering;
- la sicurezza deve essere in RLS/Edge Functions, non nel frontend.

## ADR-002: Supabase REST API come API principale

Decisione: usare PostgREST/Supabase REST per CRUD.

Motivo:
- le API sono auto-generate dallo schema PostgreSQL;
- riduce codice backend;
- coerente con React Admin dataProvider.

Conseguenza:
- lo schema DB va progettato come contratto API;
- nomi, grants, RLS e viste diventano parte dell'API.

## ADR-003: modello sheet-compatible con raw_row

Decisione: tabelle tipizzate per foglio COBie + `raw_row jsonb`.

Motivo:
- COBie spreadsheet ha molte varianti e aggiornamenti;
- serve round-trip import/export;
- evita perdita dati quando una colonna non è ancora modellata.

Conseguenza:
- il modello dati non è ancora completamente normalizzato;
- in futuro si potrà aggiungere un dominio gestionale più normalizzato sopra COBie.

## ADR-004: React Admin per COBie CRUD, Material React Table per griglie operative

Decisione:
- React Admin per risorse standard.
- Material React Table per viste operative custom.

Motivo:
- React Admin accelera CRUD.
- MRT offre griglie più controllabili quando servono interazioni custom.

## ADR-005: Multi-tenant obbligatorio fin dall'inizio

Decisione: tutte le tabelle applicative hanno `organization_id`.

Motivo:
- prevenzione data leakage;
- RLS semplice e verificabile;
- scalabilità verso prodotto SaaS/enterprise.

## ADR-006: Ruoli MVP basati su membership organizzativa

Decisione: per il MVP usare la membership `app.organization_members` e i ruoli gia previsti (`owner`, `admin`, `editor`, `viewer`, `member`) senza introdurre un sistema RBAC applicativo separato.

Motivo:
- riduce superficie di sicurezza;
- mantiene l'enforcement in PostgreSQL/RLS;
- permette di verificare isolamento tenant prima di aggiungere permessi granulari.

Conseguenza:
- eventuali permessi UI sono solo UX;
- regole piu granulari potranno essere aggiunte dopo smoke test RLS.

## ADR-007: Nessun delete esposto nella UI MVP

Decisione: la UI React Admin Fase 1 non espone delete per entita COBie.

Motivo:
- i dati COBie sono record di consegna/audit;
- il modello soft delete non e ancora definito;
- il delete fisico aumenta il rischio di perdita dati e rottura round-trip.

Conseguenza:
- eventuali policy SQL `delete` esistenti devono essere riesaminate nel Task 4;
- delete, soft delete o archiviazione saranno decisi separatamente prima del rilascio produttivo.

## ADR-008: Editabilita resource Fase 1

Decisione: nel primo pass frontend, Create/Edit sono previsti per Workbooks, Contacts, Facilities, Floors, Spaces, Zones, Types, Components, Systems, Attributes e Document metadata. Jobs, Resources, Issues e Picklists partono read-only salvo nuova decisione nel resource matrix.

Motivo:
- privilegia il percorso COBie minimo workbook -> facility/location -> type/component -> metadata;
- evita form premature per fogli con regole piu contrattuali o di catalogo;
- mantiene Picklists come riferimento controllato.

Conseguenza:
- `docs/mvp-resource-matrix.md` deve dettagliare campi e filtri;
- le risorse read-only possono essere rese editabili in task successivi dopo validazione.

## ADR-009: Documenti Fase 1 come metadata

Decisione: in Fase 1 i Documenti sono gestiti come metadata COBie. Upload file, Storage lifecycle e signed URL sono Fase 2+.

Motivo:
- evita di introdurre Storage policy prima della review import/export;
- mantiene il MVP centrato su schema, API, RLS e CRUD;
- riduce rischio di esporre file cross-tenant.

Conseguenza:
- `cobie.document` conserva riferimenti COBie e campi file/reference;
- allegati reali saranno progettati con Edge Function/Storage privato.

## ADR-010: Data provider React Admin

Decisione: usare `ra-supabase` come prima opzione. Creare un dataProvider custom solo se Task 9 dimostra che filtri, reference o paginazione richiesti dal MVP non sono coperti.

Motivo:
- resta coerente con React Admin first e Supabase REST first;
- evita astrazione prematura;
- consente di fallire presto su un caso concreto.

Conseguenza:
- Task 9 deve documentare eventuali limiti;
- un dataProvider custom richiede nuova decisione o aggiornamento ADR.

## ADR-011: Regole contrattuali non bloccanti per MVP

Decisione: Fase 1 implementa solo validazioni minime COBie/qualita dati gia documentate. Regole contrattuali/progetto specifiche sono rinviate a una matrice dedicata.

Motivo:
- le regole contrattuali dipendono dal progetto/commessa;
- non devono bloccare il CRUD MVP;
- serve prima un modello chiaro di severity `error`, `warning`, `info`.

Conseguenza:
- le viste validation MVP possono segnalare incompletezza e riferimenti mancanti;
- regole progetto-specifiche saranno aggiunte dopo conferma del catalogo e dei casi d'uso.

## ADR-012: Import/export server-side con staging privato

Decisione: Fase 2 import/export usa Storage privato, Edge Functions per il boundary pubblico e uno schema non esposto `cobie_io` per batch, righe staging, issue report ed export job.

Motivo:
- parsing/generazione workbook non deve avvenire nel browser;
- staging non deve essere raggiungibile direttamente via PostgREST;
- serve un validation report consultabile prima del commit;
- service role e accesso Storage privilegiato devono restare server-side.

Conseguenza:
- la UI chiamera Edge Functions/RPC e viste `api`, non tabelle staging;
- il primo commit supportato sara `create_new_workbook`, evitando replace distruttivi;
- eventuale worker separato potra processare file grandi senza cambiare il contratto database.
