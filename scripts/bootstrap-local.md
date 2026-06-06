# Bootstrap locale

## Prerequisiti

- Node.js LTS
- Supabase CLI
- Docker
- npm/pnpm/yarn

## Step

```bash
supabase start
supabase migration list
supabase migration up
cd frontend
npm install
cp ../.env.example ../.env
cp .env.example .env.local
npm run dev
```

Note:

- `.env` alla root serve a script e comandi Supabase.
- `frontend/.env.local` serve al dev server Vite e deve contenere solo variabili `VITE_`.
- Entrambi sono ignorati da git; committare solo `.env.example`.
- Usare `supabase db reset` solo dopo conferma esplicita, perche' e distruttivo.

## Dopo login

1. Crea utente in Supabase Auth.
2. Inserisci membership in `app.organization_members`.
3. Verifica che React Admin mostri solo dati dell'organizzazione.
