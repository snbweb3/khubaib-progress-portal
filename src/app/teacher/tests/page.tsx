'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestsPage() {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [className, setClassName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function saveTest(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('tests').insert({
      title,
      subject,
      class_name: className,
      scheduled_date: date,
      description,
      created_by: user?.id,
    })

    if (error) setMessage(error.message)
    else {
      setMessage('Test scheduled!')
      setTitle('')
      setDescription('')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule a Test</h1>
      <form onSubmit={saveTest} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <input value={className} onChange={e => setClassName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={3} />
        </div>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
        <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg">Schedule Test</button>
      </form>
    </div>
  )
}
