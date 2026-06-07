# Ricerca template COBie XLS/XLTX

## Risultato sintetico

La ricerca distingue due livelli:

1. **Standard COBie più recente:** NIBS indica COBie v3.0 come ultima versione dello standard.
2. **Template spreadsheet operativo più recente trovato:** pagina nima "COBie Templates", voce `COBie Template Q2 (April 2026)`, formato XLTX, con URL rilevato `COBie-UK-2.4-Template-2026-04.xltx.zip`.

## Nota critica

L'utente ha chiesto "xls ultima versione". Le risorse attuali sono in formato **XLTX** o ZIP contenente XLTX, non necessariamente `.xls` classico. Per il progetto conviene parlare di **COBie spreadsheet template**.

## Fonti operative

- NIBS COBie standard page: `https://nibs.org/nbims/v3/cobie/`
- nima COBie resources: `https://wearenima.im/resources/construction-operations-building-information-exchange-cobie/`
- buildingSMART COBie downloads: `https://cobiecert.buildingsmart.org/resources/downloads/`
- Annex A mapping rules: `https://nibs.org/wp-content/uploads/2025/04/NBIMS-US_V3_4.2_COBie_Annex_A.pdf`

## Template individuato

- Nome pagina: COBie Template Q2 (April 2026)
- URL rilevato dal link: `https://wearenima.im/wp-content/uploads/2024/06/COBie-UK-2.4-Template-2026-04.xltx.zip`
- Tipo: ZIP/XLTX
- Nota nima: da luglio 2025 il template include entità per IFC2x3, IFC4 e IFC4.3.
- Verifica locale 2026-06-06: pagina nima conferma `COBie Template Q2 (April 2026)` come template piu recente elencato.
- SHA-256 outer ZIP: `46156ff2f2ae75deffba1dc676a00665c9ab42e8b2a66dd922a27119568b37df`
- SHA-256 inner XLTX: `af0f3544b3343e1ecf0d244bb3cbfd64362c138c681eaa356cf6d0d4745fbbd5`
- Diff header: vedi `docs/template-diff-report.md`.

## Impatto sul progetto

- Usare COBie 2.4 UK/Q2 2026 come target spreadsheet iniziale.
- Mantenere compatibilità concettuale con COBie v3.
- Non finalizzare colonne finché non viene letto il file reale.
- Conservare `raw_row jsonb` per gestire differenze di template.
