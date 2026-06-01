---
name: cobie-import-export
description: Use this skill when implementing COBie Excel/XLSX/XLTX import, export, validation, staging, error reporting or round-trip preservation.
---

# COBie Import/Export Skill

## Rules

- Do not parse serious COBie workbooks entirely in the browser.
- Use Edge Function or worker for import/export.
- Use staging tables before committing.
- Preserve source filename, template version, sheet, row number and raw row.
- Generate a validation report before writing final data.
- Export must preserve sheet order and compatible headers.

## Workflow

1. Upload workbook.
2. Identify template version.
3. Extract sheets and headers.
4. Validate workbook structure.
5. Load rows into staging.
6. Validate references and required fields.
7. Commit to typed tables.
8. Return report.
9. Support export from typed tables + raw_row.

## Output

- function design
- staging schema
- validation report format
- error codes
- rollback behavior
