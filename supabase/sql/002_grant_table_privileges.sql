begin;

grant usage on schema public to anon, authenticated;

revoke all on table public.individual from anon, authenticated;
revoke all on table public.organization from anon, authenticated;

grant insert on table public.individual to anon;
grant insert on table public.organization to anon;

grant select, update on table public.individual to authenticated;
grant select, update on table public.organization to authenticated;

grant usage, select on sequence public.individual_id_seq to anon, authenticated;
grant usage, select on sequence public.organization_id_seq to anon, authenticated;

commit;
