begin;

insert into public.approved_admin_users (email, notes)
values
  ('replace-with-admin1@example.com', 'initial seed'),
  ('replace-with-admin2@example.com', 'initial seed')
on conflict (email) do nothing;

commit;
