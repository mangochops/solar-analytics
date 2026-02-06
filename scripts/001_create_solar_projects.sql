-- Create solar_projects table for tracking user's solar systems
create table if not exists public.solar_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_name text not null,
  description text,
  location text not null,
  latitude float,
  longitude float,
  system_capacity_kw float not null,
  panel_type text,
  number_of_panels integer,
  inverter_capacity_kw float,
  battery_capacity_kwh float,
  installation_date date,
  grid_connected boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.solar_projects enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own projects" on public.solar_projects;
drop policy if exists "Users can insert their own projects" on public.solar_projects;
drop policy if exists "Users can update their own projects" on public.solar_projects;
drop policy if exists "Users can delete their own projects" on public.solar_projects;

-- Create RLS policies
create policy "solar_projects_select_own" on public.solar_projects
  for select using (auth.uid() = user_id);

create policy "solar_projects_insert_own" on public.solar_projects
  for insert with check (auth.uid() = user_id);

create policy "solar_projects_update_own" on public.solar_projects
  for update using (auth.uid() = user_id);

create policy "solar_projects_delete_own" on public.solar_projects
  for delete using (auth.uid() = user_id);

-- Create index for faster queries
create index idx_solar_projects_user_id on public.solar_projects(user_id);
create index idx_solar_projects_created_at on public.solar_projects(created_at desc);
