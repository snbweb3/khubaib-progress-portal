'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function StudentProgress() {
  const [attendance, setAttendance] = useState<any[]>([])
  const [performance, setPerformance] = useState<any[]>([])
  const [filterSubject, setFilterSubject] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: att } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', user.id)
      .order('date', { ascending: false })
      .limit(30)

    const { data: perf } = await supabase
      .from('performance')
      .select('*')
      .eq('student_id', user.id)
      .order('date', { ascending: false })

    setAttendance(att || [])
    setPerformance(perf || [])
  }

  const filteredPerf = filterSubject
    ? performance.filter(p => p.subject.toLowerCase().includes(filterSubject.toLowerCase()))
    : performance

  const attendanceRate = attendance.length
    ? Math.round((attendance.filter(a => a.status === 'present' || a.status === 'late').length / attendance.length) * 100)
    : 0

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Progress</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-slate-500">Attendance Rate (last 30)</p>
          <p className="text-3xl font-bold text-emerald-600">{attendanceRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-slate-500">Assessments Recorded</p>
          <p className="text-3xl font-bold text-emerald-600">{performance.length}</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Filter by subject..."
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full max-w-xs"
        />
      </div>

      <h2 className="text-xl font-semibold mb-3">Performance</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Score</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPerf.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.subject}</td>
                <td className="p-3">{p.score}/{p.max_score}</td>
                <td className="p-3">{p.assessment_type}</td>
                <td className="p-3">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-3">Recent Attendance</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.slice(0, 10).map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.date}</td>
                <td className="p-3 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
