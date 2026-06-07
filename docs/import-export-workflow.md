# Workflow import/export COBie

Status: high-level workflow. Detailed Fase 2 architecture is in `docs/import-export-design.md`.

## Import

1. Browser richiede una import batch a Edge Function.
2. Edge Function valida JWT, membership organizzazione e modalita import.
3. Edge Function crea `cobie_io.import_batch` in schema non esposto.
4. Browser carica workbook in Storage privato tramite target approvato o signed upload URL.
5. Edge Function o worker legge workbook da Storage.
6. Identifica template, sheets e headers.
7. Registra sheet metadata in `cobie_io.import_sheet`.
8. Carica righe in staging `cobie_io.import_row`, preservando `raw_row`.
9. Esegue validazioni strutturali, required, referenziali, picklist e type parsing.
10. Produce report in `cobie_io.import_issue` e viste `api` sicure.
11. Utente approva commit se non esistono errori bloccanti.
12. Commit transazionale in tabelle COBie.
13. Conserva staging/report secondo retention policy.

## Export

1. Utente seleziona workbook.
2. Edge Function valida membership e crea `cobie_io.export_job`.
3. Edge Function o worker compone fogli secondo catalogo congelato.
4. Query tabelle COBie nello stesso workbook autorizzato.
5. Ricostruisce righe da campi tipizzati + `raw_row`.
6. Applica sheet order e headers.
7. Salva file export in Storage privato.
8. Restituisce signed URL temporaneo.

## Error model

- `STRUCTURE_MISSING_SHEET`
- `STRUCTURE_MISSING_COLUMN`
- `REQUIRED_FIELD_EMPTY`
- `REFERENCE_NOT_FOUND`
- `DUPLICATE_NAME`
- `PICKLIST_INVALID`
- `TYPE_PARSE_ERROR`
- `BUSINESS_RULE_WARNING`
- `TEMPLATE_VERSION_UNSUPPORTED`
- `FILE_TYPE_UNSUPPORTED`
- `FILE_TOO_LARGE`
- `INTERNAL_PROCESSING_ERROR`
