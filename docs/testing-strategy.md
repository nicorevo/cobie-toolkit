# Testing strategy

## Test minimi

- TypeScript typecheck.
- Lint.
- Build frontend.
- RLS smoke tests.
- API smoke tests.
- React Admin CRUD smoke.

## RLS smoke

Fixture:

- `scripts/rls-smoke-tests.sql`

Esecuzione su Supabase locale/remoto avviato:

```bash
docker exec -i supabase_db_cobie-react-admin \
  psql -v ON_ERROR_STOP=1 -U postgres -d postgres \
  < scripts/rls-smoke-tests.sql
```

Il fixture crea dati temporanei in una transazione e termina con `ROLLBACK`.
Non richiede service role key, `.env` frontend o utenti Supabase Auth reali: simula
`auth.uid()` tramite `request.jwt.claim.sub` nel database locale.

Casi coperti:

1. utente A vede organization A;
2. utente A non vede organization B;
3. utente A vede solo workbook/component di organization A;
4. utente A può inserire e aggiornare record della propria organization/workbook;
5. utente A non può inserire record in organization B;
6. utente A non può combinare `organization_id` della propria organization con `workbook_id` di un'altra organization;
7. utente A non può spostare component verso organization/workbook di un altro tenant;
8. utente B vede solo dati di organization B;
9. anon non vede dati tenant e non può invocare `api.validate_workbook`;
10. service role non è usata dal frontend o dal fixture.

## API smoke

Fixture:

- `scripts/api-smoke-tests.sh`

Esecuzione su Supabase locale/remoto avviato:

```bash
HOME=$PWD/.local/supabase-home \
SUPABASE_BIN=$PWD/.local/bin/supabase \
./scripts/api-smoke-tests.sh
```

Il fixture usa `supabase status -o env` per leggere solo `REST_URL`,
`ANON_KEY` e `JWT_SECRET` locali, genera JWT autenticati locali tramite il JWT
secret locale, chiama PostgREST con anon key e pulisce i record seedati al
termine. Non registra segreti nei file di repository.

Casi coperti:

1. GET list paginato per workbook;
2. GET filter per Contact, Facility, Zone, Type, Component, System, Attribute, Document, Job, Resource, Issue e Picklist;
3. isolamento tenant sulle liste component;
4. POST create component;
5. PATCH update component;
6. denial su create cross-tenant;
7. validation view `cobie_validation_issues`;
8. RPC `validate_workbook`.

DELETE resta non concesso/esposto nel MVP.

## UI smoke

- login;
- logout;
- create/list/select Workbook;
- CRUD Contact, Facility, Floor, Space, Zone, Type, Component, System, Attribute e Document;
- list/show Job, Resource, Issue e Picklist;
- lista Validation Issues read-only;
- errore autorizzazione mostrato correttamente.
