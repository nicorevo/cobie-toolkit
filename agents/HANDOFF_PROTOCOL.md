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

## Skills used
- skill-name

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

## Recommended next skills
- skill-name

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
- Dichiarare sempre le skill usate, includendo almeno una skill di dominio/prodotto quando il task tocca COBie, Supabase, React Admin, frontend o API e una skill di workflow quando il task richiede spec, piano, implementazione, test o review.
