begin;

drop policy if exists individual_public_insert on public.individual;
drop policy if exists organization_public_insert on public.organization;

commit;
