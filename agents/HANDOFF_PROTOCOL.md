# Protocollo handoff tra agenti

Ogni agente deve produrre un handoff con questo formato:

```md
# Handoff

## Agent
Nome agente

## Task
ID e titolo task

## Files changed
- path

## Decisions
- decisione
- motivo

## Assumptions
- assunzione
- rischio

## Open questions
- domanda

## Required next agent
- agente successivo

## Validation performed
- comandi/test/checklist

## Blockers
- blocker
```

Regole:

- Non passare codice non verificato come "done".
- Non modificare decisioni architetturali senza ADR.
- Non modificare security policy senza review del Supabase Security Agent.
- Non modificare catalogo COBie senza report diff template.
