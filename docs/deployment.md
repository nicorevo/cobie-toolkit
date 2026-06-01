# Deployment

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
