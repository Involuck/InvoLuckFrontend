// src/app/error/internal-server-error/page.tsx
import Link from 'next/link';

export default function InternalServerErrorPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden involuck-bg p-6">
      {/* Background elements */}
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />

      <div className="w-full max-w-2xl text-center">
        <div className="inline-flex items-center justify-center rounded-2xl bg-brand-700/90 px-6 py-3 text-white shadow-xl shadow-brand-900/40">
          <span className="text-lg font-semibold tracking-wide">
            500 · Server Error
          </span>
        </div>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white drop-shadow md:text-5xl">
          Something went wrong on our end.
        </h1>

        {/* --- CORRECTION 1 IS HERE --- */}
        <p className="mt-3 text-base text-brand-100/90 md:text-lg">
          We&apos;re experiencing some technical difficulties. Please try again
          later.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          {/* --- CORRECTION 2 IS HERE --- */}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-900/30 transition hover:bg-brand-700"
          >
            Try to go home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/15"
          >
            Open dashboard
          </Link>
        </div>

        <p className="mt-6 text-xs text-brand-100/70">
          If the problem persists, please contact support.
        </p>
      </div>
    </main>
  );
}
