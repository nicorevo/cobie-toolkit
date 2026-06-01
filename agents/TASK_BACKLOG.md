# Backlog

## Epiche

E1. Standard COBie e catalogo template  
E2. PostgreSQL/Supabase schema  
E3. API REST  
E4. React Admin UI  
E5. Sicurezza/RLS  
E6. Import/export Excel  
E7. Validazione qualità COBie  
E8. Dominio gestionale asset/manutenzione/prenotazioni  

## User stories MVP

- Come admin, posso creare un workbook COBie.
- Come admin, posso inserire una Facility.
- Come admin, posso inserire Floor/Space.
- Come admin, posso inserire Type/Component.
- Come admin, posso collegare Component a Space e Type.
- Come admin, posso inserire Attribute e Document.
- Come utente autenticato, posso interrogare via REST solo dati della mia organizzazione.
- Come revisore, posso vedere record COBie incompleti.

## Technical stories

- Generare TypeScript types da Supabase.
- Configurare dataProvider.
- Configurare authProvider.
- Creare RLS smoke tests.
- Creare API views.
- Creare validation views.
