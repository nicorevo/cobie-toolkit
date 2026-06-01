# Strategia field mapping

## Problema

COBie usa colonne spreadsheet; PostgreSQL usa naming stabile snake_case. Alcune colonne possono cambiare tra template regionali.

## Strategia

1. Mantenere mappa source column -> db column.
2. Conservare `raw_row`.
3. Non perdere colonne sconosciute.
4. Creare validazioni basate su catalogo versione.
5. Gestire alias.

## Esempio

```yaml
Component:
  Name: name
  TypeName: type_name
  Space: space_name
  SerialNumber: serial_number
  InstallationDate: installation_date_text
```

## Tipi

Fase 1:
- quasi tutti i campi come text;
- date come text + campo parsed futuro;
- numeric come text + parsed futuro;
- raw_row sempre jsonb.

Fase 2:
- parser valida e normalizza date/numeri;
- colonne typed aggiuntive se utili per query.
