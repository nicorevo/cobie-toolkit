# Validazione COBie

## Livelli

- Error: blocca commit/import.
- Warning: consente commit ma va riportato.
- Info: diagnostica.

## Regole MVP

VAL-001: workbook deve avere almeno Facility.  
VAL-002: `Name` obbligatorio dove previsto.  
VAL-003: `Component.TypeName` deve riferire Type esistente nello stesso workbook.  
VAL-004: `Component.Space` deve riferire Space esistente, se valorizzato.  
VAL-005: `Space.FloorName` deve riferire Floor esistente, se valorizzato.  
VAL-006: `Attribute.SheetName` e `Attribute.RowName` devono puntare a entità esistente.  
VAL-007: `Document.SheetName` e `Document.RowName` devono puntare a entità esistente.  
VAL-008: duplicati `Name` nello stesso foglio/workbook sono errori per fogli con name unique.  
VAL-009: date non parsabili sono errori o warning in base al campo.  
VAL-010: valori fuori picklist sono warning/error in base alla regola contrattuale.

## Implementazione

- viste SQL per controlli semplici;
- funzioni RPC per report aggregati;
- Edge Function per validazione workbook prima di import.
