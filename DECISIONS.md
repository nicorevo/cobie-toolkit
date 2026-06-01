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
