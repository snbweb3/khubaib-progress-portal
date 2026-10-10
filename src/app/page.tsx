import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-emerald-700">
          Khubaib Progress Portal
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Lightweight system for teachers to mark attendance, track lectures taught, schedule tests, and for students to view their progress and performance statistics.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition"
          >
            Dashboard
          </Link>
        </div>
        <p className="mt-12 text-sm text-slate-500">
          Built with Next.js + Supabase + Resend for Khubaib Foundation.
        </p>
      </div>
    </div>
  );
}
