import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden involuck-bg p-6">
      {/* Background elements (no changes) */}
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />

      <div className="w-full max-w-2xl text-center">
        {/* --- CHANGES HERE --- */}
        {/* 1. 404 container: Increased padding to make it larger */}
        <div className="inline-flex items-center justify-center rounded-2xl bg-brand-700/90 px-6 py-3 text-white shadow-xl shadow-brand-900/40">
          {/* 2. 404 text: Increased font size */}
          <span className="text-lg font-semibold tracking-wide">
            404 · Not Found
          </span>
        </div>

        {/* 3. Main title: Increased top margin for better spacing */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white drop-shadow md:text-5xl">
          Hey, you found a blank space, baby…
        </h1>
        
        <p className="mt-3 text-base text-brand-100/90 md:text-lg">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Action buttons (no changes) */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-900/30 transition hover:bg-brand-700"
          >
            Go home
          </Link>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/15"
          >
            Open dashboard
          </a>
        </div>

        <p className="mt-6 text-xs text-brand-100/70">
          If you believe this is an error, contact support.
        </p>
      </div>
    </main>
  );
}