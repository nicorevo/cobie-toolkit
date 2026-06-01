-- Seed minimo per sviluppo locale.
-- I valori auth.uid() reali saranno creati da Supabase Auth.
-- Inserire organization e membership manualmente in dev dopo aver creato un utente.

insert into app.organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Demo Organization')
on conflict (id) do nothing;

insert into cobie.workbook (id, organization_id, name, standard_version, template_name, status)
values (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Demo COBie Workbook',
  'COBie UK 2.4',
  'COBie Template Q2 April 2026',
  'draft'
)
on conflict (id) do nothing;
