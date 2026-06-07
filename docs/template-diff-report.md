# COBie Template Diff Report

Status: Task 3 complete, catalog update deferred pending review.

## Source verified

- Source page: https://wearenima.im/resources/construction-operations-building-information-exchange-cobie/
- Page check date: 2026-06-06
- Latest template listed on source page: `COBie Template Q2 (April 2026)`
- Download URL used: https://wearenima.im/wp-content/uploads/2024/06/COBie-UK-2.4-Template-2026-04.xltx.zip
- Outer ZIP filename: `COBie-UK-2.4-Template-2026-04.xltx.zip`
- Inner template filename: `COBie-UK-2.4 Template 2026-04.xltx`
- Outer ZIP SHA-256: `46156ff2f2ae75deffba1dc676a00665c9ab42e8b2a66dd922a27119568b37df`
- Inner XLTX SHA-256: `af0f3544b3343e1ecf0d244bb3cbfd64362c138c681eaa356cf6d0d4745fbbd5`

The source page states that downloadable COBie templates are provided in XLTX format and lists `COBie Template Q2 (April 2026)` before older 2026/2025/2024/2023 templates. NIBS remains the reference for COBie v3 standard context, while this project targets the operational UK COBie 2.4 spreadsheet template.

## Extracted worksheets

The downloaded template contains these non-empty worksheets:

- Instruction
- Contact
- Facility
- Floor
- Space
- Zone
- Type
- Component
- System
- Assembly
- Connection
- Spare
- Resource
- Job
- Impact
- Document
- Attribute
- Coordinate
- Issue
- Picklist

## Differences from starter catalog

The current starter catalog in `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml` should not yet be treated as definitive.

Key differences:

- The template has `Picklist` singular, while the starter map expects `PickLists`.
- The `Picklist` sheet is column-oriented with 57 columns of allowed values, not the row model `[SheetName, FieldName, Value, Description]` currently assumed by `cobie.picklist`.
- Many sheets use `ExtSystem`, `ExtObject`, `ExtIdentifier`, while parts of the starter catalog expect `ExternalSystem`, `ExternalObject`, `ExternalIdentifier`.
- `Type` includes `ExtSystem`, `ExtObject`, `ExtIdentifier` after warranty fields; the starter catalog omits those three columns for Type.
- `Issue` includes `SheetName1`, `RowName1`, `SheetName2`, `RowName2`; the starter catalog expects only `SheetName` and `RowName`.
- `Assembly` column order is `AssemblyType`, `SheetName`, `ParentName`, `ChildNames`; the starter catalog orders `SheetName`, `ParentName`, `ChildNames`, `AssemblyType`.
- `Spare` column order places `Description` before `SetNumber` and `PartNumber`; the starter catalog places `Description` last.
- `Floor` and `Space` include `ExtSystem` fields and have ordering differences against the starter catalog.

## Header sample from template

```text
Contact: Email, CreatedBy, CreatedOn, Category, Company, Phone, ExternalSystem, ExternalObject, ExternalIdentifier, Department, OrganizationCode, GivenName, FamilyName, Street, PostalBox, Town, StateRegion, PostalCode, Country
Facility: Name, CreatedBy, CreatedOn, Category, ProjectName, SiteName, LinearUnits, AreaUnits, VolumeUnits, CurrencyUnit, AreaMeasurement, ExternalSystem, ExternalProjectObject, ExternalProjectIdentifier, ExternalSiteObject, ExternalSiteIdentifier, ExternalFacilityObject, ExternalFacilityIdentifier, Description, ProjectDescription, SiteDescription, Phase
Type: Name, CreatedBy, CreatedOn, Category, Description, AssetType, Manufacturer, ModelNumber, WarrantyGuarantorParts, WarrantyDurationParts, WarrantyGuarantorLabor, WarrantyDurationLabor, WarrantyDurationUnit, ExtSystem, ExtObject, ExtIdentifier, ReplacementCost, ExpectedLife, DurationUnit, WarrantyDescription, NominalLength, NominalWidth, NominalHeight, ModelReference, Shape, Size, Color, Finish, Grade, Material, Constituents, Features, AccessibilityPerformance, CodePerformance, SustainabilityPerformance
Component: Name, CreatedBy, CreatedOn, TypeName, Space, Description, ExtSystem, ExtObject, ExtIdentifier, SerialNumber, InstallationDate, WarrantyStartDate, TagNumber, BarCode, AssetIdentifier
Issue: Name, CreatedBy, CreatedOn, Type, Risk, Chance, Impact, SheetName1, RowName1, SheetName2, RowName2, Description, Owner, Mitigation, ExtSystem, ExtObject, ExtIdentifier
Picklist: 57 category columns, starting ApprovalBy, AreaUnit, AssetType, Category-Facility, Category-Space, Category-Element...
```

## Implications

- Do not harden migrations against the existing starter catalog until the catalog is updated from this extracted template.
- Keep `raw_row jsonb` mandatory on all sheet-compatible tables.
- Treat `cobie.picklist` as unresolved: the current row-based table may need a transformation model from the column-oriented Picklist sheet.
- Review schema aliases for `ExtSystem`/`ExternalSystem` before import/export work.
- UI MVP can continue with typed fields already present, but import/export round-trip must preserve unmapped columns.

## Recommendation

Do not overwrite `reference/cobie_sheet_catalog_v24_uk_2026_q2.yaml` in this task. Create a catalog update task after database review so schema, catalog and import/export mapping move together.
