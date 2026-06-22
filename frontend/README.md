# React Admin frontend

## Scopo

SPA Vite/React Admin collegata a Supabase/PostgreSQL.

## Comandi

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Variabili

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Salvare questi valori in `frontend/.env.local` per il dev server Vite. Per script e comandi Supabase usare anche `.env` alla root. Non copiare service key nel frontend. Non committare file `.env` reali: resta versionabile solo `.env.example`.

## Implementazione

Le risorse e il comportamento corrente sono documentati in
`../docs/react-admin-frontend.md`. La selezione workbook e' stato UI persistito
in Redux/localStorage; i dati server restano gestiti da React Admin/PostgREST e
protetti da RLS.
