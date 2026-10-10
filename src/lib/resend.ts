import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAbsenceAlert(to: string, studentName: string, date: string) {
  if (!process.env.RESEND_API_KEY) return { success: false, error: 'No API key' }

  try {
    await resend.emails.send({
      from: 'Khubaib Portal <onboarding@resend.dev>',
      to,
      subject: `Absence Alert: ${studentName}`,
      html: `<p>${studentName} was marked absent on ${date}.</p>`,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
