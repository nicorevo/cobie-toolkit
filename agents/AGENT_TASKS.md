# Task multi-agente iniziali

## PM-001 - Congelare scope MVP

Owner: Project Manager Agent  
Input: `PROJECT_PLAN.md`, `REQUIREMENTS.md`  
Output: `docs/mvp-scope.md`  
Acceptance:
- risorse React Admin MVP elencate;
- endpoint REST MVP elencati;
- fuori scope esplicito.

## COBIE-001 - Verifica template

Owner: COBie Standards Agent  
Input: `scripts/download-latest-cobie-template.sh`  
Output: `docs/template-diff-report.md`, update catalog yaml  
Acceptance:
- fonte verificata;
- checksum registrato;
- sheets/headers estratti;
- differenze rispetto al catalogo riportate.

## DB-001 - Applicare schema iniziale

Owner: Database Architect Agent  
Input: `supabase/migrations/`  
Output: migration aggiornate  
Acceptance:
- migrazioni idempotenti in dev;
- tabelle COBie create;
- indici base presenti.

## SEC-001 - RLS review

Owner: Supabase Security Agent  
Input: migrazioni DB  
Output: `docs/security-review-report.md`  
Acceptance:
- nessuna tabella app senza RLS;
- smoke test pronto;
- findings classificati.

## API-001 - Contratto REST

Owner: API Agent  
Input: schema DB  
Output: update `api/openapi.cobie-rest.yaml`  
Acceptance:
- endpoints principali descritti;
- esempi di filtro/paginazione;
- auth e tenant behavior documentati.

## FE-001 - React Admin bootstrap

Owner: React Admin Agent  
Input: `frontend/README.md`, `docs/react-admin-frontend.md`  
Output: app Vite iniziale  
Acceptance:
- login Supabase;
- AdminApp carica;
- Resource Facility/Component/Type funzionanti in dev.

## QA-001 - Smoke test MVP

Owner: QA Agent  
Input: frontend, API, DB  
Output: `docs/test-report-mvp.md`  
Acceptance:
- CRUD testato;
- cross-tenant denied;
- build frontend passa.
