begin;

alter table if exists public.individual enable row level security;
alter table if exists public.organization enable row level security;

commit;
