UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE id = '492e0749-29ec-4370-8ee2-759ff860fa9d';