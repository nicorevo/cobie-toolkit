# COBie Sheet Catalog Review Note

Status: catalog update deferred after template verification on 2026-06-06.

The Q2 2026 XLTX template was downloaded and inspected. Its headers differ from `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml`, especially:

- `Picklist` is singular and column-oriented.
- Several sheets use `ExtSystem`, `ExtObject`, `ExtIdentifier`.
- `Type` includes extension identifier columns omitted by the starter catalog.
- `Issue` uses paired `SheetName1`/`RowName1` and `SheetName2`/`RowName2`.

See `docs/template-diff-report.md` for source URL, checksums and extracted header details.

Do not treat the YAML catalog as final until a catalog update task has reconciled these differences with the PostgreSQL schema and import/export mapping.
