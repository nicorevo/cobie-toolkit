-- Manual RLS smoke test template.
-- Eseguire in ambiente dev con utenti reali.
-- Non eseguire in produzione senza adattamento.

-- 1. Verifica anon
set role anon;
select count(*) from cobie.component;

-- 2. Verifica authenticated con JWT simulato richiede ambiente Supabase.
-- Usare test applicativi o pgTAP con helper auth.uid() mock se configurato.

reset role;
