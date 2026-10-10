# Khubaib Progress Portal

Lightweight school progress, attendance, lecture tracking, and performance statistics portal.

**Not a full LMS** — focused on operational tracking for teachers and visibility for students/sponsors.

## Features

- **Teachers**
  - Mark daily attendance (Present / Late / Absent / Excused)
  - Log lectures / topics taught
  - Enter performance scores (quizzes, tests)
  - Schedule upcoming tests

- **Students**
  - View personal attendance history
  - See performance statistics with basic filtering
  - Check upcoming scheduled tests

- **Tech**
  - Next.js (App Router) + Tailwind
  - Supabase (Auth + Postgres)
  - Resend (ready for email notifications)
  - Deployable on Vercel

## Setup

1. Create a Supabase project
2. Run the SQL in `supabase/schema.sql` in the SQL Editor
3. Enable Email auth (or magic links)
4. Copy `.env.local.example` to `.env.local` and fill in your keys
5. Create user accounts in Supabase Auth and insert matching rows in `profiles` (role: teacher or student)
6. `npm install && npm run dev`

## Deployment

- Connect the GitHub repo to Vercel
- Add environment variables in Vercel project settings
- Resend can be used for absence alerts or progress digests (API key in env)

## Volunteer Project Notes

Pilot with one class or school. Expand RLS policies for production. Add more filters and charts as needed.

Built for Khubaib Foundation.
