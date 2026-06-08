-- Notifications table (missing from remote schema migration)
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  title text not null,
  content text,
  report_id uuid references public.reports(id) on delete set null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

drop policy if exists "Users can read their own notifications" on public.notifications;
create policy "Users can read their own notifications" on public.notifications
  for select using (auth.uid() = user_id);

drop policy if exists "Authenticated users can insert notifications" on public.notifications;
create policy "Authenticated users can insert notifications" on public.notifications
  for insert with check (true);

drop policy if exists "Users can update their own notifications" on public.notifications;
create policy "Users can update their own notifications" on public.notifications
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete their own notifications" on public.notifications;
create policy "Users can delete their own notifications" on public.notifications
  for delete using (auth.uid() = user_id);

grant select, insert, update, delete on public.notifications to authenticated;
grant select on public.notifications to anon;

-- Profile settings columns used by SettingsProvider
alter table public.profiles add column if not exists dark_mode boolean default false;
alter table public.profiles add column if not exists large_text boolean default false;
alter table public.profiles add column if not exists language text default 'th';

-- Performance indexes
create index if not exists idx_notifications_user_read
  on public.notifications (user_id, read);

create index if not exists idx_notifications_user_created
  on public.notifications (user_id, created_at desc);

create index if not exists idx_reports_user_created
  on public.reports (user_id, created_at desc);

create index if not exists idx_profiles_role_admin
  on public.profiles (id) where role = 'admin';
