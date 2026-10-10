'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PerformancePage() {
  const [studentId, setStudentId] = useState('')
  const [subject, setSubject] = useState('')
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [type, setType] = useState('quiz')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function saveScore(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from('performance').insert({
      student_id: studentId,
      subject,
      score: Number(score),
      max_score: Number(maxScore),
      assessment_type: type,
    })

    if (error) setMessage(error.message)
    else {
      setMessage('Score saved!')
      setScore('')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Enter Performance Score</h1>
      <form onSubmit={saveScore} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Student ID (UUID)</label>
          <input value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Score</label>
            <input type="number" value={score} onChange={e => setScore(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Score</label>
            <input type="number" value={maxScore} onChange={e => setMaxScore(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="quiz">Quiz</option>
            <option value="test">Test</option>
            <option value="assignment">Assignment</option>
            <option value="oral">Oral</option>
          </select>
        </div>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
        <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg">Save Score</button>
      </form>
      <p className="mt-4 text-xs text-slate-500">Note: For a better UX, later add a student dropdown.</p>
    </div>
  )
}
