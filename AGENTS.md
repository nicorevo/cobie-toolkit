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
- Non mettere service keys nel codice frontend.
- Non fare reset distruttivi del DB senza richiesta esplicita.
- Non caricare interi workbook grandi nel browser per processing serio.
- Non bypassare RLS con funzioni `security definer` non revisionate.
- Non introdurre dipendenze produttive senza motivazione.
