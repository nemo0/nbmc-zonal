begin;

alter table if exists public.individual disable row level security;
alter table if exists public.organization disable row level security;

commit;
