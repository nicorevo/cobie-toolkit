---
name: cobie-standard-ingestion
description: Use this skill when researching, downloading, reading or updating the COBie spreadsheet template, worksheet catalog, column map and COBie version assumptions.
---

# COBie Standard Ingestion Skill

## Purpose

Verify the latest COBie spreadsheet template and update the repository's worksheet catalog.

## Required reading

1. `docs/cobie-xls-template-research.md`
2. `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml`
3. `scripts/download-latest-cobie-template.sh`
4. `docs/cobie-v24-worksheet-map.md`

## Guardrails

- Do not assume the workbook columns from memory.
- Always record template URL, filename, checksum, download date and workbook sheets.
- Do not overwrite the existing catalog without diff.
- Preserve unknown columns in `raw_row`.
- Distinguish COBie v3 document standard from COBie 2.4 spreadsheet template.

## Workflow

1. Verify latest template source.
2. Download template into a local ignored folder, not committed unless license allows.
3. Extract sheets and headers.
4. Compare with `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml`.
5. Produce a diff report.
6. Update catalog only after review.

## Output

- source template
- workbook filename
- sheet list
- header differences
- relationship implications
- required schema changes
