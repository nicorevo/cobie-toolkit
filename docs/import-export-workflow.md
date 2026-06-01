# Workflow import/export COBie

## Import

1. Upload workbook in Storage privato.
2. Creazione record `cobie.import_batch`.
3. Edge Function legge workbook.
4. Verifica template/sheets/headers.
5. Carica righe in staging.
6. Esegue validazioni.
7. Produce report.
8. Utente approva commit.
9. Commit in tabelle COBie.
10. Conserva `raw_row`.

## Export

1. Utente seleziona workbook.
2. Edge Function compone fogli secondo catalogo.
3. Query tabelle COBie.
4. Ricostruisce righe da campi tipizzati + raw_row.
5. Applica sheet order e headers.
6. Salva file export in Storage.
7. Restituisce signed URL.

## Error model

- `STRUCTURE_MISSING_SHEET`
- `STRUCTURE_MISSING_COLUMN`
- `REQUIRED_FIELD_EMPTY`
- `REFERENCE_NOT_FOUND`
- `DUPLICATE_NAME`
- `PICKLIST_INVALID`
- `TYPE_PARSE_ERROR`
- `BUSINESS_RULE_WARNING`
