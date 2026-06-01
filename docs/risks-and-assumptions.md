# Rischi e assunzioni

## Assunzioni

- Target iniziale: COBie UK 2.4 Template Q2 2026.
- Compatibilità concettuale futura con COBie v3.
- Supabase REST API sufficiente per CRUD iniziale.
- React Admin sufficiente per backoffice iniziale.
- Import/export non fa parte del primo scaffold eseguibile.

## Rischi

- Template COBie trimestrale può cambiare.
- Alcune relazioni COBie sono per nome, non per UUID.
- ra-supabase potrebbe non coprire tutti i casi filtro/reference.
- API direttamente dal DB richiedono schema e RLS molto rigorosi.
- Modello sheet-compatible può diventare scomodo per logiche gestionali avanzate.

## Mitigazioni

- `raw_row jsonb`.
- catalogo template versionato.
- viste API.
- dominio gestionale separato in futuro.
- smoke test RLS obbligatori.
