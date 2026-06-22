# Environment Operations

## Source of truth

Operational details that vary by workstation or environment are stored in
`LOCAL_WORKSPACE_CONTEXT.md` at the repository root. The file is ignored by
Git and may contain:

- remote Docker host and SSH user;
- published development URLs;
- remote project path;
- local demo credentials;
- expected container names and runtime versions.

Read that file before running environment commands. Versioned documentation
must not duplicate private keys, passwords, tokens, service-role keys or real
`.env` values.

## SSH tooling

Project-local SSH material is stored under:

```text
.local/ssh/
```

The path `.local/.shh` is not used. The directory name is `ssh`, without a
leading dot and with the standard spelling.

Expected local files are:

- the private key named in `LOCAL_WORKSPACE_CONTEXT.md`;
- the matching `.pub` file;
- `.local/ssh/known_hosts`.

The private key must remain ignored by Git and have restrictive permissions
such as `0600`. Never print or copy its contents into documentation, logs,
prompts or commits.

Use the exact host, user and key path from `LOCAL_WORKSPACE_CONTEXT.md`. A
typical non-interactive command shape is:

```bash
ssh \
  -i .local/ssh/<private-key-file> \
  -o UserKnownHostsFile=.local/ssh/known_hosts \
  -o StrictHostKeyChecking=yes \
  -o BatchMode=yes \
  <user>@<host> '<command>'
```

If the workstation-wide SSH configuration is broken or unsuitable, add
`-F /dev/null` while retaining the explicit project key and `known_hosts`.

## Environment verification

Verify in this order:

1. SSH reachability and remote hostname.
2. Project containers and health status.
3. Supabase CLI status from the remote project directory.
4. Published HTTP endpoints.
5. Migration status.
6. RLS and API smoke tests.
7. Frontend typecheck, lint and build.
8. Authenticated browser smoke.

Representative remote checks:

```bash
docker ps --format '{{.Names}}\t{{.Status}}\t{{.Ports}}'
HOME=$PWD/.local/supabase-home .local/bin/supabase status
HOME=$PWD/.local/supabase-home .local/bin/supabase migration list --local
```

Start Supabase only from the remote project path documented in
`LOCAL_WORKSPACE_CONTEXT.md`:

```bash
HOME=$PWD/.local/supabase-home .local/bin/supabase start
```

The frontend development container command is also maintained in
`LOCAL_WORKSPACE_CONTEXT.md`, because its absolute bind-mount path is
environment-specific.

## Inizializzazione di una nuova sessione di sviluppo

La frase convenzionale:

```text
INIZIALIZZA UNA NUOVA SESSIONE DI SVILUPPO
```

richiede all'agente di rendere disponibile e verificare l'ambiente remoto
prima di iniziare altro lavoro. La procedura e' idempotente: i servizi gia'
attivi non devono essere riavviati.

### 1. Caricare il contesto

1. Leggere `AGENTS.md`.
2. Leggere `LOCAL_WORKSPACE_CONTEXT.md`, se presente.
3. Usare `using-agent-skills` e selezionare il sottoinsieme minimo di skill;
   per questa procedura sono normalmente pertinenti `supabase` e
   `debugging-and-error-recovery`.
4. Controllare il worktree locale e preservare tutte le modifiche esistenti.

### 2. Verificare accesso e workspace remoto

1. Controllare che chiave privata, chiave pubblica e `known_hosts` esistano
   sotto `.local/ssh/`.
2. Verificare che la chiave privata abbia permessi restrittivi senza
   stamparne il contenuto.
3. Collegarsi con host, utente, chiave e project path definiti in
   `LOCAL_WORKSPACE_CONTEXT.md`.
4. Verificare hostname, utente remoto, path del progetto e disponibilita' di
   Docker.
5. In caso di errore di rete transitorio, distinguere un limite del sandbox
   da un host realmente irraggiungibile e ritentare una volta con la
   diagnostica minima necessaria.

### 3. Verificare il deployment del sorgente

Il workspace locale e' la fonte della copia di sviluppo. Prima del confronto,
costruire l'elenco con i file Git tracciati e i file non ignorati:

```bash
git ls-files -z --cached --others --exclude-standard
```

Confrontare checksum SHA-256 locali e remoti per quell'elenco. Il confronto
deve escludere implicitamente o esplicitamente:

- `.git/`;
- `.local/`;
- tutti i file `.env` reali;
- `node_modules/`;
- `dist/` e altri output generati.

Se mancano file di progetto o i checksum differiscono:

1. mostrare un riepilogo delle differenze;
2. copiare soltanto i file mancanti o differenti;
3. non usare sincronizzazioni con cancellazione automatica;
4. ripetere il confronto fino a ottenere parita' completa.

Verificare inoltre che `cobie-frontend-dev` monti la directory remota
`frontend/` in `/app`, così Vite serve il sorgente appena sincronizzato.

### 4. Verificare e avviare i servizi

1. Elencare i container del progetto senza agire sui container estranei.
2. Se lo stack Supabase non e' attivo, avviarlo con il comando definito in
   `LOCAL_WORKSPACE_CONTEXT.md`.
3. Se `cobie-frontend-dev` non e' attivo, avviarlo con il comando definito
   nello stesso file.
4. Controllare i log iniziali del frontend e verificare che Vite sia pronto.

### 5. Smoke test conclusivi

Verificare almeno:

- root Vite e `/admin`;
- Supabase Auth health;
- PostgREST;
- Storage status;
- Supabase Studio;
- Mailpit;
- analytics/logs health.

Una risposta `401` o `403` e' accettabile soltanto per endpoint che richiedono
autenticazione e deve essere esplicitamente interpretata. Gli endpoint health
e le UI pubblicate devono rispondere con successo.

### 6. Handoff

Concludere indicando:

- stato SSH e workspace remoto;
- parita' del sorgente e file eventualmente sincronizzati;
- container attivi o avviati;
- risultato degli endpoint;
- anomalie residue;
- skill utilizzate.

## Safety rules

- Do not use `supabase db reset` without explicit approval.
- Do not stop or alter unrelated containers on the shared Docker host.
- Do not sync `.git`, `.local`, `.env*`, dependency directories or build
  outputs to the remote runtime.
- Do not expose `service_role` or secret keys to the frontend.
- Record test date, environment and failures in `docs/test-report-mvp.md`.
