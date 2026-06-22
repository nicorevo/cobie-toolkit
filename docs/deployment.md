# Deployment

Per host, utente, chiave, path remoto, URL e container correnti leggere
`LOCAL_WORKSPACE_CONTEXT.md`. Per la procedura operativa riutilizzabile vedere
`docs/environment-operations.md`.

Gli strumenti SSH del progetto sono in `.local/ssh/`; `.local/.shh` non e' un
percorso valido.

## Ambienti

- local
- dev
- staging
- production

## Supabase

- usare Supabase CLI per migrazioni;
- non modificare manualmente schema in production;
- generare tipi dopo migration;
- mantenere seed solo per local/dev.

## Frontend

Possibili hosting:

- Netlify
- Vercel static SPA
- Cloudflare Pages
- Nginx/Docker aziendale

## Variabili frontend

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

## Variabili Edge Functions

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
COBIE_STORAGE_BUCKET=
```

Le variabili Edge non devono comparire nel frontend.

## Gate prima del deploy

- migration status coerente con `supabase/migrations`;
- RLS smoke e API smoke passati;
- frontend typecheck, lint e build passati;
- smoke browser autenticato completato;
- nessun secret o file `.env` reale nel diff;
- rollback e ambiente target confermati.
