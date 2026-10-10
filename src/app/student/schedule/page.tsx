'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SchedulePage() {
  const [tests, setTests] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    loadTests()
  }, [])

  async function loadTests() {
    const { data } = await supabase
      .from('tests')
      .select('*')
      .order('scheduled_date', { ascending: true })

    setTests(data || [])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upcoming Tests</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Class</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.title}</td>
                <td className="p-3">{t.subject}</td>
                <td className="p-3">{t.class_name}</td>
                <td className="p-3">{t.scheduled_date}</td>
              </tr>
            ))}
            {tests.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-slate-500">No upcoming tests scheduled.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
