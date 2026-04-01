begin;

revoke select, update on table public.individual from authenticated;
revoke select, update on table public.organization from authenticated;

revoke usage, select on sequence public.individual_id_seq from authenticated;
revoke usage, select on sequence public.organization_id_seq from authenticated;

commit;
