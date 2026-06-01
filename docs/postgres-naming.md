# Naming PostgreSQL

## Schemi

- `app`: entità applicative non COBie.
- `cobie`: tabelle COBie sheet-compatible.
- `api`: viste/RPC esposte.

## Tabelle

Usare singular snake_case:

- `cobie.component`
- `cobie.facility`
- `cobie.workbook`

## Campi

- `id`
- `organization_id`
- `workbook_id`
- `name`
- `created_by_email`
- `created_on`
- `source_sheet`
- `source_row_number`
- `raw_row`
- `inserted_at`
- `updated_at`

## Vincoli

Formato:

```text
<table>_<columns>_<constraint_type>
```

Esempio:

```text
component_workbook_id_name_key
```

## Indici

Formato:

```text
idx_<table>_<columns>
```
