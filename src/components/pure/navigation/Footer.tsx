'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="pointer-events-none fixed bottom-0 inset-x-0 z-40">
      <div className="mx-auto max-w-5xl px-4 pb-4">
        <div className="pointer-events-auto rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md ring-1 ring-white/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,.5)]">
          <nav className="flex items-center justify-center gap-8 px-5 py-3 text-[11px] tracking-wide text-white/85">
            <Link
              href="/privacy"
              className="transition hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="opacity-30">•</span>
            <Link
              href="/terms"
              className="transition hover:text-white hover:underline"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
