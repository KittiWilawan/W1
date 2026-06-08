-- Align local DB role values with app (member/admin instead of normaluser/admin)

alter table public.profiles drop constraint if exists profiles_role_check;

update public.profiles
set role = 'member'
where role = 'normaluser' or role is null;

alter table public.profiles alter column role set default 'member';

alter table public.profiles
  add constraint profiles_role_check check (role in ('member', 'admin'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, phone, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'phone',
    coalesce(
      nullif(new.raw_user_meta_data->>'role', 'normaluser'),
      'member'
    )
  );
  return new;
end;
$$;
