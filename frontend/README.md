# Frontend blueprint

## Scopo

Blueprint React Admin per collegarsi a Supabase/PostgreSQL.

## Setup previsto

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install react-admin @supabase/supabase-js ra-supabase @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux react-router-dom material-react-table
```

## Variabili

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

## Note

I file in questa cartella sono scheletri. L'agente frontend deve adattarli al progetto reale.
