# Bootstrap locale

## Prerequisiti

- Node.js LTS
- Supabase CLI
- Docker
- npm/pnpm/yarn

## Step

```bash
supabase start
supabase db reset
cd frontend
npm install
cp ../.env.example .env.local
npm run dev
```

## Dopo login

1. Crea utente in Supabase Auth.
2. Inserisci membership in `app.organization_members`.
3. Verifica che React Admin mostri solo dati dell'organizzazione.
