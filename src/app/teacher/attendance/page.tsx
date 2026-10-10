'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'

export default function AttendancePage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [students, setStudents] = useState<any[]>([])
  const [attendance, setAttendance] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, class_name')
      .eq('role', 'student')
      .order('full_name')
    setStudents(data || [])
    setLoading(false)
  }

  async function saveAttendance() {
    const records = Object.entries(attendance).map(([student_id, status]) => ({
      student_id,
      date,
      status,
    }))

    const { error } = await supabase.from('attendance').upsert(records, {
      onConflict: 'student_id,date',
    })

    if (error) alert(error.message)
    else alert('Attendance saved!')
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <div className="mb-4">
        <label className="mr-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Student</th>
              <th className="text-left p-3">Class</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.full_name}</td>
                <td className="p-3">{s.class_name}</td>
                <td className="p-3">
                  <select
                    value={attendance[s.id] || 'present'}
                    onChange={(e) =>
                      setAttendance({ ...attendance, [s.id]: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="absent">Absent</option>
                    <option value="excused">Excused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={saveAttendance}
        className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Save Attendance
      </button>
    </div>
  )
}
