# Sintesi ricerca fonti

## Fonti COBie

1. NIBS / NBIMS COBie:
   - COBie è uno standard/processo per dati digitali di asset manutenibili.
   - COBie v3 è indicato come ultima versione del documento.
   - COBie v2.4 è stato pubblicato in NBIMS-US V3 ed è aggiornato a IFC4.
   - COBie può essere rappresentato in formato spreadsheet.

2. nima COBie templates:
   - La pagina risorse nima pubblica template COBie in formato XLTX.
   - Ultima voce trovata: COBie Template Q2 (April 2026).
   - Nota nima: da luglio 2025 il template include entità per IFC2x3, IFC4 e IFC4.3.

3. buildingSMART COBie Certified Professional:
   - Per COBie 2.4 standard servono Chapter 4.2 e Annex A.
   - Annex A documenta mapping rules per COBie spreadsheet.

## Fonti stack

1. Supabase React/Vite:
   - Usa variabili `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
2. Supabase Data REST API:
   - API REST auto-generata direttamente dal database.
3. React Admin + Supabase:
   - Integrazione con authentication, permissions, CRUD API, realtime.
4. ra-supabase:
   - dataProvider, authProvider, hooks e componenti.
5. TanStack / Material React Table:
   - TanStack è headless.
   - Material React Table è una grid/table già pronta basata su TanStack Table V8.

## Nota operativa

Non dare per definitivo il catalogo colonne finché non è stato scaricato e letto il file XLTX più recente. Questo starter kit include un catalogo iniziale conservativo e una strategia `raw_row jsonb` per evitare perdita informativa.
