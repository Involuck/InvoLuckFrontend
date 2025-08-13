export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden involuck-bg flex items-center justify-center p-6">
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />
      <div className="w-full max-w-2xl text-center">
        <div className="inline-flex items-center justify-center rounded-2xl bg-brand-700/90 px-4 py-2 text-white shadow-xl shadow-brand-900/40">
          <span className="text-sm font-semibold tracking-wide">404 · Not Found</span>
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">
          Hey, you found a blank space, baby…
        </h1>
        <p className="mt-3 text-base md:text-lg text-brand-100/90">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-900/30 transition hover:bg-brand-700"
          >
            Go home
          </a>
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

