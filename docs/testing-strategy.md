# Testing strategy

## Test minimi

- TypeScript typecheck.
- Lint.
- Build frontend.
- RLS smoke tests.
- API smoke tests.
- React Admin CRUD smoke.

## RLS smoke

Casi:

1. utente A vede organization A;
2. utente A non vede organization B;
3. utente A non può inserire record in organization B;
4. anon non vede dati tenant;
5. service role non usata dal frontend.

## API smoke

- GET list paginato;
- GET filter;
- POST create;
- PATCH update;
- DELETE o soft delete;
- RPC validate_workbook.

## UI smoke

- login;
- logout;
- lista Facility;
- crea Component;
- filtra Component per workbook;
- errore autorizzazione mostrato correttamente.
