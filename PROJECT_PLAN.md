# Piano di progetto: COBie React Admin su Supabase/PostgreSQL

## 1. Obiettivo

Realizzare una piattaforma web gestionale per alimentare, governare e interrogare dati COBie, con primo focus su:

- anagrafiche COBie;
- gestione asset/componenti;
- localizzazione spaziale;
- tipologie asset;
- sistemi;
- attributi;
- documenti;
- attività manutentive;
- risorse;
- API REST;
- future funzioni import/export Excel COBie.

## 2. Scope fase 0 - foundation agentica

Deliverable:

- repo scaffold;
- regole Codex;
- skill agentiche;
- modello dati iniziale;
- migrazioni SQL;
- contratto API;
- strategia React Admin;
- guardrail sicurezza;
- backlog multi-agente.

Criterio di uscita:

- tutti gli agenti possono lavorare senza inventare stack, naming, policy o flussi.

## 3. Scope fase 1 - MVP dati COBie

Deliverable:

- schema PostgreSQL `cobie`;
- tabelle sheet-compatible;
- RLS tenant-based;
- seed dati minimi;
- React Admin con risorse principali;
- REST API Supabase/PostgREST;
- viste API per asset operativi;
- test manuali CRUD;
- validazioni minime.

Risorse React Admin minime:

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

## 4. Scope fase 2 - import/export COBie workbook

Deliverable:

- Edge Function o worker per upload workbook;
- parsing Excel;
- staging import;
- validazione sheet/colonne;
- mapping verso tabelle;
- report errori;
- export workbook compatibile;
- conservazione `raw_row`;
- round-trip minimo senza perdita dati noti.

## 5. Scope fase 3 - dominio gestionale

Deliverable:

- asset registry operativo;
- prenotazioni asset;
- piani manutentivi;
- ordini/interventi;
- dashboard;
- audit trail;
- allegati documentali;
- log modifiche;
- ruoli operativi.

## 6. Principi architetturali

- PostgreSQL è fonte primaria della verità.
- Il frontend non implementa autorizzazione reale: solo UX.
- RLS e funzioni server-side fanno enforcement.
- Supabase REST API espone le tabelle e viste autorizzate.
- React Admin è usato per il backoffice CRUD.
- Edge Functions sono usate per import/export, segreti, operazioni privilegiate e transazioni complesse.
- Il modello deve preservare il workbook originale tramite `raw_row jsonb`.

## 7. Piano per sprint

### Sprint 0: decisioni e standard

- Confermare template COBie più recente.
- Scaricare e archiviare template.
- Estrarre sheet e colonne.
- Aggiornare `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml`.
- Congelare versione di riferimento.

### Sprint 1: DB e API

- Applicare migrazioni.
- Abilitare RLS.
- Generare tipi TypeScript.
- Esporre REST API via schema autorizzato.
- Verificare PostgREST su tabelle e viste.

### Sprint 2: React Admin

- Creare app Vite.
- Configurare Supabase client.
- Configurare auth provider.
- Configurare data provider.
- Creare Resource principali.
- Implementare layout e navigazione.

### Sprint 3: validazione e qualità

- Regole obbligatorie.
- View per record incompleti.
- Smoke test RLS.
- Checklist COBie.
- Test CRUD.

### Sprint 4: import/export

- Upload file.
- Parsing Excel.
- Staging.
- Validazione.
- Commit dati.
- Export.

## 8. Rischi

- Il template Excel più recente può variare trimestralmente.
- COBie v3 e COBie 2.4 spreadsheet non sono la stessa cosa.
- React Admin può richiedere dataProvider custom per filtri complessi.
- Supabase Free può bastare per PoC ma non per produzione dati/documenti.
- RLS errata può esporre dati cross-tenant.

## 9. Decisioni iniziali

- Target operativo: COBie UK 2.4 spreadsheet Q2 2026.
- Compatibilità concettuale: COBie v3.
- UI: React Admin first.
- Grid avanzate: Material React Table solo dove React Admin è insufficiente.
- API: PostgREST/Supabase REST per CRUD, RPC per funzioni specifiche.
- Import/export: non nel browser, ma Edge Function/worker.
