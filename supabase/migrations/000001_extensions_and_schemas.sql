create extension if not exists pgcrypto;

create schema if not exists app;
create schema if not exists cobie;
create schema if not exists api;

create or replace function app.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
