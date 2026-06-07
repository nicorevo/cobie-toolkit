# AGENTS.md

## Stack del progetto

Applicazione gestionale basata su:

- Vite
- React
- TypeScript strict
- Redux Toolkit
- React Admin
- Material UI
- Material React Table per griglie custom
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Supabase Storage
- Supabase Edge Functions
- Supabase REST API / PostgREST

Non usare Next.js, Server Components, API Routes Next.js o `@supabase/ssr`.

## Obiettivo iniziale

Costruire un frontend React Admin e un modello PostgreSQL/Supabase per alimentare entità COBie e renderle disponibili via API REST.

## Regole architetturali

- Questa è una SPA React, non un'app SSR.
- PostgreSQL è la fonte primaria della verità.
- Supabase REST API/PostgREST è il primo layer API.
- React Admin è il primo frontend gestionale.
- Redux Toolkit serve solo per stato UI/app, non come fonte primaria dati server.
- Material React Table serve solo per griglie custom dove React Admin non basta.
- Non introdurre backend custom finché Supabase REST/RPC/Edge Functions bastano.
- Usare Edge Functions per import/export, operazioni privilegiate, segreti, integrazioni esterne e transazioni complesse.

## Regole operative agentiche

- Parallelizzare sempre quando possibile letture, audit indipendenti, verifiche non conflittuali e task che non toccano gli stessi file.
- Non parallelizzare modifiche sequenziali o ad alto rischio: migration, RLS/security policy, file condivisi senza coordinamento, comandi distruttivi o step che dipendono dall'esito dello step precedente.
- Quando un piano definisce task parallelizzabili, preferire l'esecuzione parallela e documentare eventuali eccezioni.

## Regole skill agentiche

- Prima di iniziare un task non banale, usare `using-agent-skills` per scegliere il sottoinsieme minimo di skill applicabili.
- Le skill COBie locali restano autorevoli per dominio, sicurezza Supabase, React Admin e import/export COBie.
- Le skill di workflow installate in `.codex/skills` vanno usate come supporto trasversale: spec, pianificazione, implementazione incrementale, test, review, sicurezza, performance, documentazione e shipping.
- Per task Supabase usare anche `supabase`; per SQL, migrazioni, indici, performance PostgreSQL o RLS usare anche `supabase-postgres-best-practices`.
- Per diagrammi Mermaid, ERD, flowchart, sequence diagram, Gantt o diagrammi architetturali usare `mermaid-syntax`.
- Per frontend React usare anche `react-dev` e `vercel-react-best-practices`; per Material UI usare `mui`; per configurazione/build Vite usare `vite`; per audit UI/accessibilità usare `web-design-guidelines`.
- Se una skill frontend include pattern Next.js, SSR, Server Components o React Native, ignorarli per questo progetto: valgono solo le parti compatibili con SPA Vite + React Admin + MUI.
- Prima di applicare pattern legati a versioni specifiche, verificare `package.json` o la documentazione locale: non assumere React 19, MUI v7 o Vite 8 se il progetto non li dichiara.
- Le skill elencate in `agents/TEAM.md` sono candidate per ruolo, non una lista da caricare integralmente a ogni task.
- Ogni agente deve dichiarare nel proprio handoff le skill usate e quelle raccomandate per l'agente successivo.
- Quando una skill entra in conflitto con una regola COBie/Supabase di questo repository, prevalgono `AGENTS.md`, le skill COBie locali e le policy RLS del database.

## Regole COBie

- Non inventare campi COBie definitivi: leggere il template XLTX di riferimento.
- Conservare sempre il record originale importato in `raw_row jsonb`.
- Non eliminare colonne o dati non mappati.
- Ogni entità COBie deve essere collegata a `workbook_id` e `organization_id`.
- Le tabelle COBie devono essere sheet-compatible.
- Le validazioni devono distinguere tra:
  - vincoli tecnici PostgreSQL;
  - obbligatorietà COBie;
  - obbligatorietà contrattuale/progetto;
  - warning di qualità dati.

## Regole Supabase

- Ogni tabella applicativa esposta via API deve avere RLS abilitata.
- Ogni tabella con RLS deve avere policy esplicite.
- Ogni INSERT/UPDATE deve avere `WITH CHECK`.
- Le policy multi-tenant devono verificare membership reale tramite `auth.uid()`.
- Non fidarsi mai di `organization_id`, `tenant_id`, `user_id`, `created_by` passati dal client senza verifica lato database.
- Non usare mai `service_role` nel frontend.
- Bucket Storage privati di default.
- Ogni modifica schema deve passare da `supabase/migrations`.
- Non modificare migration già applicate in ambienti condivisi.

## Regole Vite/React

- Usare `VITE_SUPABASE_URL`.
- Usare `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Le credenziali locali possono stare in `.env` o `frontend/.env.local`, ma questi file devono restare ignorati da git.
- Chiedere credenziali reali solo quando servono per verificare funzionamento Supabase/Auth/API/Edge Functions, non durante analisi, spec o scaffold.
- Non usare variabili `NEXT_PUBLIC_*`.
- Tenere il Supabase client in `src/lib/supabase/client.ts`.
- Tenere tipi generati in `src/lib/supabase/types.ts`.
- TypeScript strict.
- Evitare `any`.

## Regole React Admin

- Ogni Resource deve essere collegata a tabella, vista o RPC documentata.
- Non implementare autorizzazione solo nel frontend.
- Le azioni nascoste nella UI devono essere comunque bloccate da RLS.
- Per dataset > 500 record usare paginazione/sorting/filtering lato server.
- Non duplicare dati React Admin in Redux.
- Preferire dataProvider Supabase/ra-supabase; creare dataProvider custom solo se necessario.

## Regole API

- Esporre API via schema controllato, tabelle e viste sicure.
- Le API devono essere paginabili.
- RPC solo per operazioni che non sono CRUD semplice.
- Le RPC privilegiate devono validare utente, organizzazione e autorizzazione.
- Documentare ogni endpoint in `api/openapi.cobie-rest.yaml` o `api/postgrest-endpoints.md`.

## Regole qualità

Prima di completare una modifica:

- eseguire typecheck;
- eseguire lint;
- eseguire test se presenti;
- eseguire smoke test RLS se tocca database/policy;
- aggiornare documentazione se cambia schema, API o sicurezza.

## Divieti

- Non committare `.env` con valori reali.
- Mantenere versionabile solo `.env.example`.
- Non mettere service keys nel codice frontend.
- Non fare reset distruttivi del DB senza richiesta esplicita.
- Non caricare interi workbook grandi nel browser per processing serio.
- Non bypassare RLS con funzioni `security definer` non revisionate.
- Non introdurre dipendenze produttive senza motivazione.
