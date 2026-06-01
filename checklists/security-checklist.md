# Security checklist

- [ ] Nessun secret nel frontend.
- [ ] Nessuna service_role key nel browser.
- [ ] RLS attiva su tutte le tabelle app/cobie.
- [ ] Policy SELECT/INSERT/UPDATE/DELETE coerenti.
- [ ] INSERT/UPDATE con WITH CHECK.
- [ ] Cross-tenant negato.
- [ ] Storage privato.
- [ ] Funzioni security definer revisionate.
- [ ] Input Edge Functions validati.
- [ ] Errori non divulgano dettagli sensibili.
