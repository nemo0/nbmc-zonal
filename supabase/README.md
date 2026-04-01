# Supabase Setup (RLS Disabled + Admin Allowlist)

This project now uses a non-RLS model:

- public registration form APIs use `SUPABASE_ANON_KEY` (insert-only privileges)
- authenticated dashboard APIs use `SUPABASE_SERVICE_ROLE_KEY` on the server
- admin access is restricted to emails in `public.approved_admin_users`
- direct `authenticated` role read/update access to registration tables is revoked

## 1) Apply SQL migrations

Run the SQL files in order:

1. `supabase/sql/001_create_registration_tables.sql`
2. `supabase/sql/002_grant_table_privileges.sql`
3. `supabase/sql/003_enable_rls.sql` (this now disables RLS)
4. `supabase/sql/004_public_insert_policies.sql` (policy cleanup)
5. `supabase/sql/005_authenticated_read_update_policies.sql` (policy cleanup)
6. `supabase/sql/006_create_approved_admin_users.sql`
7. `supabase/sql/007_seed_approved_admin_users.sql` (replace seed emails before running)
8. `supabase/sql/008_restrict_authenticated_table_access.sql` (required for existing setups)

You can also run `supabase/rls_policies.sql` as a one-shot equivalent for brand-new setups.

## 2) Runtime env vars

Set the following:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only secret, never expose in client-side code)

## 3) Admin auth behavior

- Admin login/signup endpoints are:
  - `/api/auth/login`
  - `/api/auth/signup`
  - `/api/auth/logout`
  - `/api/auth/me`
- Signup is only allowed when the email exists in `approved_admin_users` and `is_active = true`.
- To hard-block direct self-signup outside this app, disable public email signup in your Supabase Auth settings.
