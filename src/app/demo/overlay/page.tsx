'use client';

import * as React from 'react';
import { Modal } from '@/components/pure/overlay/Modal';

export default function OverlayDemoPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Overlay Demo</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Open Modal
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title="Example modal">
          <p className="text-gray-700">This is a minimal headless modal component.</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-gray-100 px-3 py-2 text-gray-800 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
