# Guardrail sicurezza

## Regole non negoziabili

1. Nessuna service role key nel frontend.
2. Nessun secret committato.
3. RLS obbligatoria su tabelle applicative.
4. `organization_id` obbligatorio per isolamento tenant.
5. Policy INSERT/UPDATE con `WITH CHECK`.
6. Storage privato di default.
7. Funzioni `security definer` solo dopo review.
8. Import/export lato server/Edge Function.
9. Validare input lato server per operazioni sensibili.
10. Test cross-tenant obbligatorio.

## RLS pattern

L'utente può accedere a una riga solo se:

```sql
exists (
  select 1
  from app.organization_members m
  where m.organization_id = <table>.organization_id
    and m.user_id = auth.uid()
)
```

## Divieti

- Non usare policy `using (true)` su dati tenant.
- Non fidarsi del client per ownership.
- Non usare `created_by` come autorizzazione primaria.
- Non esporre staging import direttamente.
- Non permettere delete fisico senza valutare soft delete/audit.

## Edge Function

Le Edge Functions con privilegi devono:

- leggere JWT;
- validare utente;
- validare organizzazione;
- verificare ruolo/membership;
- usare service role solo internamente;
- loggare senza secret;
- restituire errori non verbosi.

## Import/export

- Usare bucket Storage privato per workbook sorgenti, report e export generati.
- Non esporre lo schema staging tramite PostgREST.
- Mettere batch, righe staging, issue report ed export job in uno schema non esposto, ad esempio `cobie_io`.
- Esporre solo viste/RPC `api` con controllo membership reale.
- Validare membership e ruolo prima di creare batch, leggere file, processare import, committare o generare export.
- Usare service role solo dentro Edge Function/worker dopo la validazione del chiamante.
- Non loggare signed URL, JWT, service key o contenuto raw del workbook.
- Non abilitare replace/delete di workbook esistenti finche soft delete, audit e rollback non sono progettati.
