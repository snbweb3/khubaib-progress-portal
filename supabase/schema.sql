-- Khubaib Progress Portal Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text check (role in ('teacher', 'student', 'admin')) default 'student',
  class_name text,
  created_at timestamptz default now()
);

-- Attendance
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade,
  date date not null,
  status text check (status in ('present', 'late', 'absent', 'excused')) default 'present',
  notes text,
  marked_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  unique(student_id, date)
);

-- Lectures / Topics taught
create table public.lectures (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject text not null,
  class_name text,
  date_taught date,
  taught_by uuid references public.profiles(id),
  notes text,
  created_at timestamptz default now()
);

-- Performance / Scores
create table public.performance (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  score numeric,
  max_score numeric default 100,
  assessment_type text, -- quiz, test, assignment, oral
  date date default current_date,
  notes text,
  created_at timestamptz default now()
);

-- Scheduled tests
create table public.tests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject text,
  class_name text,
  scheduled_date date,
  description text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- RLS Policies (basic - enable and adjust as needed)
alter table public.profiles enable row level security;
alter table public.attendance enable row level security;
alter table public.lectures enable row level security;
alter table public.performance enable row level security;
alter table public.tests enable row level security;

-- Example policies (expand for production)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Teachers can view all" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
);

-- Similar for other tables... (add full policies in production)

-- Indexes
create index idx_attendance_student_date on public.attendance(student_id, date);
create index idx_performance_student_subject on public.performance(student_id, subject);
create index idx_lectures_date on public.lectures(date_taught);
