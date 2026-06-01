# Prompt esempi per Codex

## Avvio progetto

Vedi `prompts/codex_start_project.txt`.

## Aggiunta risorsa React Admin

```text
Usa la skill react-admin-resource.
Crea la risorsa React Admin per cobie.component.
Deve avere List, Show, Edit, Create.
Usa filtri workbook_id, name, type_name, space_name.
Non duplicare dati in Redux.
Verifica che RLS sia documentata.
```

## Revisione sicurezza

```text
Usa la skill supabase-rls-security-review.
Analizza tutte le migration in supabase/migrations.
Trova tabelle senza RLS, policy troppo ampie, funzioni security definer pericolose e service_role leakage.
Produci findings con severità e patch SQL.
```
