# Modello dati COBie

## Strategia

Il modello iniziale era **sheet-compatible**. Il modello operativo corrente
evolve verso una base dati normalizzata: i valori importati restano in
`raw_row`, mentre i riferimenti usati dall'applicazione devono usare UUID,
lookup e tabelle ponte.

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
- Riferimenti inter-sheet normalizzati tramite FK UUID o tabelle ponte.
- I campi testuali ridondanti vanno rimossi quando lo stesso valore è
  ricavabile da una relazione normalizzata.
- Indici su `organization_id`, `workbook_id`, `name`.
- Indici su riferimenti comuni: `facility_id`, `floor_id`, `type_id`, `component_id`,
  `space_id` e sulle tabelle ponte.
- Usare `raw_row jsonb` su ogni tabella sheet-compatible.

## API read model consigliato

Creare viste:

- `api.cobie_assets`
- `api.cobie_spaces`
- `api.cobie_documents`
- `api.cobie_missing_required_fields`
- `api.cobie_validation_issues`

Queste viste devono essere preferite dal frontend per dashboard e ricerche operative.
