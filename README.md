# COBie React Admin Agentic Kit

Starter kit agentico per costruire una piattaforma **React Admin + Supabase/PostgreSQL** orientata alla gestione dati COBie.

Data di generazione: 2026-06-01

## Contesto operativo corrente

L'ambiente di sviluppo/smoke test verificato usa una macchina Linux Docker remota su `192.168.1.150`. Il progetto viene eseguito come:

- frontend Vite/React Admin in container Docker;
- stack Supabase locale completo gestito da Supabase CLI su container Docker;
- SQL, migrazioni, seed, configurazione Supabase e frontend versionati in questo repository.

I dettagli operativi locali, inclusi utente SSH, path della chiave, URL pubblicati, container Supabase e credenziali demo, stanno in `LOCAL_WORKSPACE_CONTEXT.md`. Quel file e' ignorato da git: ogni prompt/agente deve leggerlo se presente, ma non deve versionarne i contenuti.

Gli strumenti SSH locali sono sotto `.local/ssh/` (non `.local/.shh`). La
procedura versionata per verificare, avviare e testare gli ambienti e' in
`docs/environment-operations.md`.

## Obiettivo iniziale

Costruire un frontend gestionale in React Admin che:

1. usa PostgreSQL/Supabase come base dati;
2. modella le entità COBie derivate dalla forma spreadsheet;
3. consente alimentazione manuale delle entità COBie;
4. espone API REST tramite PostgREST/Supabase;
5. prepara import/export COBie Excel in una fase successiva;
6. può essere sviluppato da più agenti AI con regole, skill, guardrail e handoff chiari.

## Stack assunto

- Vite
- React
- TypeScript strict
- Redux Toolkit per stato UI/app
- React Admin per backoffice CRUD
- Material UI
- Material React Table per griglie custom complesse
- Supabase PostgreSQL
- Supabase Auth
- Supabase Row Level Security
- Supabase Storage
- Supabase Edge Functions per import/export e operazioni privilegiate
- Supabase REST API / PostgREST per CRUD

## Nota importante sullo standard COBie

La ricerca inclusa in `docs/cobie-xls-template-research.md` distingue tra:

- **COBie v3.0**: ultimo standard NIBS/NBIMS-US V4;
- **COBie 2.4 spreadsheet / UK template**: forma Excel operativa ancora molto usata.

L'ultima risorsa spreadsheet trovata nella pagina nima è:

`COBie Template Q2 (April 2026)`  
file rilevato: `COBie-UK-2.4-Template-2026-04.xltx.zip`

Questo kit usa una strategia **sheet-compatible COBie 2.4 UK/Q2 2026**, con preservazione `raw_row jsonb`, e prevede estensione controllata verso COBie v3.

## Avvio consigliato

1. Leggi `PROJECT_PLAN.md`.
2. Leggi `AGENTS.md`.
3. Leggi `LOCAL_WORKSPACE_CONTEXT.md` se esiste nella root del progetto.
4. Leggi `agents/TEAM.md`.
5. Fai eseguire a Codex il prompt `prompts/codex_start_project.txt`.
6. Attiva le skill in `.codex/skills`, incluse le skill COBie locali, le skill `agent-skills` installate da `addyosmani/agent-skills`, le skill Supabase, Mermaid e frontend React/MUI/Vite.
7. Prima di generare codice reale, fai completare al COBie Standard Agent la verifica del template più recente.

## File principali

- `AGENTS.md`: regole globali del repository per Codex.
- `LOCAL_WORKSPACE_CONTEXT.md`: contesto locale/runtime ignorato da git, da leggere se presente.
- `.codex/skills/*/SKILL.md`: skill operative per agenti specializzati.
- `agents/TEAM.md`: matrice agenti/skill candidate per i workflow multi-agente.
- `supabase/migrations/`: migrazioni SQL iniziali.
- `api/openapi.cobie-rest.yaml`: contratto API REST iniziale.
- `docs/security-guardrails.md`: regole di sicurezza.
- `docs/environment-operations.md`: accesso SSH e verifica degli ambienti.
- `docs/data-model-cobie.md`: modello dati COBie.
- `frontend/`: SPA React Admin.
- `agents/AGENT_TASKS.md`: attività distribuite per agenti.
- `prompts/`: prompt pronti da usare con Codex.

## Stato

Il repository contiene un **MVP eseguibile** con schema/migrazioni Supabase,
RLS, API smoke test e frontend React Admin. I gate automatici storici sono
documentati in `docs/test-report-mvp.md`; prima di una release restano
obbligatori lo smoke browser autenticato sul worktree corrente, la review
finale e l'hardening di produzione.
