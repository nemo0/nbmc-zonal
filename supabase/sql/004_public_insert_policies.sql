begin;

drop policy if exists individual_public_insert on public.individual;
drop policy if exists organization_public_insert on public.organization;

create policy individual_public_insert
  on public.individual
  for insert
  to anon
  with check (true);

create policy organization_public_insert
  on public.organization
  for insert
  to anon
  with check (true);

commit;
