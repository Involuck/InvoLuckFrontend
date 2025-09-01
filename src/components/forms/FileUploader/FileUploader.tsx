'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
  onFileSelect?: (file: File | null) => void; // callback to parent component
  accept?: string; // accepted MIME types
  showProgress?: boolean; // whether to show simulated upload progress
};

export default function FileUploader({
  onFileSelect,
  accept = 'image/*',
  showProgress = true
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  // Handle file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);

    if (selected && selected.type.startsWith('image/')) {
      const url = URL.createObjectURL(selected);
      setPreview(url);
    } else {
      setPreview(null);
    }

    setProgress(0);
    onFileSelect?.(selected);
  };

  // Simulated upload with progress bar
  const startUpload = () => {
    if (!file || !showProgress) return;
    setProgress(0);

    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  // Cleanup when unmounting or when file changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [preview]);

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Profile Picture
      </label>

      <div className="border-2 border-dashed rounded-lg p-4 text-center">
        <input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <label htmlFor="file-upload" className="cursor-pointer block">
          {!file ? (
            <div className="py-6 text-gray-500">Click to select a file</div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                  unoptimized
                />
              ) : (
                <div className="text-sm text-gray-700">{file.name}</div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startUpload}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setProgress(0);
                    onFileSelect?.(null);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </label>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mt-3 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
