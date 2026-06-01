# Modello dati COBie

## Strategia

Il modello iniziale è **sheet-compatible**, non completamente normalizzato.

Per ogni foglio COBie:

- tabella dedicata;
- chiave tecnica `id uuid`;
- `organization_id`;
- `workbook_id`;
- `source_sheet`;
- `source_row_number`;
- campi principali tipizzati;
- `raw_row jsonb` per preservare l'intera riga originale.

## Perché non normalizzare tutto subito

COBie in formato spreadsheet ha:

- varianti regionali;
- template aggiornati;
- campi opzionali/contrattuali;
- valori "n/a";
- riferimenti per nome;
- colonne che possono variare nella pratica.

La preservazione di `raw_row` permette import/export e audit senza perdita.

## Tabelle principali COBie 2.4 compatibili

- contact
- facility
- floor
- space
- zone
- type
- component
- system
- assembly
- connection
- spare
- resource
- job
- impact
- document
- attribute
- coordinate
- issue
- picklist

## Concetti COBie v3 da monitorare

COBie v3 usa famiglie concettuali:

- Facility / Company
- Level / Zone / SpaceType / Space / Coordinate
- Type / Component / System / Attribute
- Package / Job / Event / Instruction / Risk
- Document / Resource / PickList

Il progetto deve permettere mapping futuro da `contact` a `company`, `floor` a `level` e da `issue/impact` a concetti v3 come `risk/event/instruction`, se necessario.

## Regole di modellazione

- `name` non è sufficiente come PK tecnica: usare `id`.
- Mantenere `name` per compatibilità COBie.
- Riferimenti inter-sheet inizialmente testuali, con FK nullable dove sicuro.
- Indici su `organization_id`, `workbook_id`, `name`.
- Indici su riferimenti comuni: `facility_name`, `floor_name`, `space_name`, `type_name`, `component_name`.
- Usare `raw_row jsonb` su ogni tabella sheet-compatible.

## API read model consigliato

Creare viste:

- `api.cobie_assets`
- `api.cobie_spaces`
- `api.cobie_documents`
- `api.cobie_missing_required_fields`
- `api.cobie_validation_issues`

Queste viste devono essere preferite dal frontend per dashboard e ricerche operative.
