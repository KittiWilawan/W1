UPDATE auth.users 
SET app_metadata = jsonb_set(coalesce(app_metadata, '{}'::jsonb), '{role}', '"Admin"')
WHERE email = 'kitti.14.wila@gmail.com';