begin;

drop policy if exists individual_authenticated_select on public.individual;
drop policy if exists organization_authenticated_select on public.organization;
drop policy if exists individual_authenticated_update on public.individual;
drop policy if exists organization_authenticated_update on public.organization;

drop policy if exists individual_admin_select on public.individual;
drop policy if exists organization_admin_select on public.organization;
drop policy if exists individual_admin_update on public.individual;
drop policy if exists organization_admin_update on public.organization;

commit;
