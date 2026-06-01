# Requisiti funzionali e non funzionali

## Requisiti funzionali fase 1

RF-01: L'utente autenticato può vedere solo i dati della propria organizzazione.  
RF-02: L'utente può creare un COBie workbook logico.  
RF-03: L'utente può alimentare manualmente le principali entità COBie.  
RF-04: L'utente può gestire componenti/asset e collegarli a Type, Space, Facility.  
RF-05: L'utente può gestire attributi associati a Component, Type, Space, Zone, System.  
RF-06: L'utente può gestire documenti collegati a entità COBie.  
RF-07: L'utente può interrogare le entità tramite API REST.  
RF-08: Le API devono supportare paginazione, sorting e filtri.  
RF-09: Le griglie devono evitare caricamenti bulk non paginati.  
RF-10: Il sistema deve conservare campi non ancora mappati in `raw_row`.

## Requisiti funzionali fase 2

RF-11: Upload di workbook COBie.  
RF-12: Validazione sheets e colonne.  
RF-13: Staging dati prima del commit.  
RF-14: Report errori import.  
RF-15: Export workbook compatibile.  

## Requisiti non funzionali

RNF-01: TypeScript strict.  
RNF-02: Migrazioni versionate.  
RNF-03: RLS obbligatoria.  
RNF-04: Nessun secret nel browser.  
RNF-05: Nessun uso di service_role nel frontend.  
RNF-06: Test RLS smoke prima del rilascio.  
RNF-07: Audit minimo created/updated.  
RNF-08: Documentazione aggiornata a ogni modifica strutturale.  
RNF-09: API REST documentate.  
RNF-10: Compatibilità futura con import/export COBie.
