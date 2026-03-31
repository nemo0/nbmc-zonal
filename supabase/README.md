# Supabase Setup (RLS Disabled)

This project now uses a non-RLS model:

- public registration form APIs use `SUPABASE_ANON_KEY` (insert-only privileges)
- authenticated dashboard APIs use `SUPABASE_SERVICE_ROLE_KEY` on the server

No Auth0-to-Supabase JWT bridge is required in this mode.

## 1) Apply SQL migrations

Run the SQL files in order:

1. `supabase/sql/001_create_registration_tables.sql`
2. `supabase/sql/002_grant_table_privileges.sql`
3. `supabase/sql/003_enable_rls.sql` (this now disables RLS)
4. `supabase/sql/004_public_insert_policies.sql` (policy cleanup)
5. `supabase/sql/005_authenticated_read_update_policies.sql` (policy cleanup)

You can also run `supabase/rls_policies.sql` as a one-shot equivalent for brand-new setups.

## 2) Runtime env vars

Set the following:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only secret, never expose in client-side code)
