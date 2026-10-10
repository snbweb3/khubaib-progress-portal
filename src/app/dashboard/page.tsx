import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const role = profile?.role || 'student'

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-700">Khubaib Portal</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">{profile?.full_name || user.email} ({role})</span>
          <form action="/auth/signout" method="post">
            <button className="text-sm text-red-600 hover:underline">Sign out</button>
          </form>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        {role === 'teacher' || role === 'admin' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/teacher/attendance" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Mark Attendance</h3>
              <p className="text-sm text-slate-600">Record daily presence for your class</p>
            </Link>
            <Link href="/teacher/lectures" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Lectures Taught</h3>
              <p className="text-sm text-slate-600">Log topics and materials covered</p>
            </Link>
            <Link href="/teacher/performance" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Enter Scores</h3>
              <p className="text-sm text-slate-600">Record quiz/test performance</p>
            </Link>
            <Link href="/teacher/tests" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Schedule Tests</h3>
              <p className="text-sm text-slate-600">Plan upcoming assessments</p>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/student/progress" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">My Progress</h3>
              <p className="text-sm text-slate-600">View attendance, scores, and statistics</p>
            </Link>
            <Link href="/student/schedule" className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Upcoming Tests</h3>
              <p className="text-sm text-slate-600">See scheduled assessments</p>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
