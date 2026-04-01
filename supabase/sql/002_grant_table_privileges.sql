begin;

grant usage on schema public to anon, authenticated, service_role;

revoke all on table public.individual from anon, authenticated, service_role;
revoke all on table public.organization from anon, authenticated, service_role;

grant insert on table public.individual to anon;
grant insert on table public.organization to anon;

grant insert, select, update, delete on table public.individual to service_role;
grant insert, select, update, delete on table public.organization to service_role;

grant usage, select on sequence public.individual_id_seq to anon, service_role;
grant usage, select on sequence public.organization_id_seq to anon, service_role;

commit;
