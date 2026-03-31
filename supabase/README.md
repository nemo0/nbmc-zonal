# Supabase RLS Setup (Auth0 Bridge)

This app now sends Auth0 bearer tokens to Supabase Data API for protected routes.
The bridge uses the Auth0 ID token from the existing session (no audience/scope changes required).
The SQL migrations below are for a brand new Supabase project/database.

## 1) Configure Supabase to trust Auth0 JWTs

In Supabase Auth JWT settings, configure your Auth0 issuer/JWKS/audience so `auth.jwt()` resolves claims from Auth0 ID tokens.

## 2) Policy model

RLS policies allow:

- `anon`: `INSERT` only (public registration forms)
- `authenticated`: `SELECT` and `UPDATE`

No Auth0 claim customization is required for this model.

## 3) Apply policies

Run the plain SQL migration files in order:

1. `supabase/sql/001_create_registration_tables.sql`
2. `supabase/sql/002_grant_table_privileges.sql`
3. `supabase/sql/003_enable_rls.sql`
4. `supabase/sql/004_public_insert_policies.sql`
5. `supabase/sql/005_authenticated_read_update_policies.sql`

You can also run `supabase/rls_policies.sql` as a one-shot equivalent for brand-new setups.

## 4) Runtime env vars

Set the following:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (do not use service role)
