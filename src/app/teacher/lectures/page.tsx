'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LecturesPage() {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [className, setClassName] = useState('')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function saveLecture(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('lectures').insert({
      title,
      subject,
      class_name: className,
      date_taught: new Date().toISOString().split('T')[0],
      taught_by: user?.id,
      notes,
    })

    if (error) setMessage(error.message)
    else {
      setMessage('Lecture logged!')
      setTitle('')
      setSubject('')
      setNotes('')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log Lecture Taught</h1>
      <form onSubmit={saveLecture} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title / Topic</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <input value={className} onChange={e => setClassName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes / Materials</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border px-3 py-2 rounded" rows={3} />
        </div>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
        <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg">Save Lecture</button>
      </form>
    </div>
  )
}
