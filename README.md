# Khubaib Progress Portal

Lightweight school progress, attendance, lecture tracking, and performance statistics portal for **Khubaib Foundation**.

**Not a full LMS** — focused on operational tracking for teachers and visibility for students.

## Features

### Teachers / Admin
- Mark daily attendance (Present / Late / Absent / Excused)
- Log lectures / topics taught
- Enter performance scores (quiz, test, assignment, oral)
- Schedule upcoming tests

### Students
- View personal attendance history + attendance rate
- See performance statistics with subject filtering
- Check upcoming scheduled tests

### Tech Stack
- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Supabase** (Auth + Postgres + RLS)
- **Resend** (ready for absence alerts & progress emails)
- Deployable on **Vercel**

## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/snbweb3/khubaib-progress-portal.git
   cd khubaib-progress-portal
   ```

2. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Open the SQL Editor and run the contents of `supabase/schema.sql`

3. **Set up Auth**
   - In Supabase → Authentication → Providers, enable Email
   - Create test users (teacher + student)
   - Insert matching rows into the `profiles` table (set `role` to `teacher` or `student`)

4. **Environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (optional for emails)

5. **Install & run**
   ```bash
   npm install
   npm run dev
   ```

## Deployment (Vercel)

1. Import the GitHub repo into Vercel
2. Add the same environment variables
3. Deploy

## Notes for Volunteers

- Start with one class as a pilot
- Expand Row Level Security (RLS) policies before wider use
- Student ID entry in the performance form is temporary — replace with a dropdown later
- Resend utility is ready in `src/lib/resend.ts` for absence alerts

Built for the Khubaib Foundation volunteer project.
