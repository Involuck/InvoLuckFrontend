'use client';

import * as React from 'react';

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Add tag and press Enter',
  disabled = false
}: TagInputProps) {
  const [internal, setInternal] = React.useState<string[]>(value ?? []);
  const [input, setInput] = React.useState('');
  const isControlled = Array.isArray(value);
  const tags = isControlled ? (value as string[]) : internal;

  const setTags = (next: string[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const remove = (i: number) => setTags(tags.filter((_, idx) => idx !== i));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const t = input.trim();
      if (t.length && !tags.includes(t)) {
        setTags([...tags, t]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input.length === 0 && tags.length > 0) {
      remove(tags.length - 1);
    }
  };

  return (
    <div
      className={`w-full rounded-md border border-gray-300 bg-white px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 text-sm"
          >
            {t}
            <button
              type="button"
              className="ml-1 rounded-full p-0.5 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Remove ${t}`}
              onClick={() => remove(i)}
              disabled={disabled}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 min-w-[8rem] border-none outline-none py-1 text-gray-900 placeholder:text-gray-400"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default TagInput;
