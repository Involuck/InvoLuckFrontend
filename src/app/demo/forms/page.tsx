'use client';

import * as React from 'react';
import { TextInput, Select, Switch, TagInput } from '@/components/pure/form';

export default function FormsDemoPage() {
  const [name, setName] = React.useState('');
  const [enabled, setEnabled] = React.useState(true);
  const [tags, setTags] = React.useState<string[]>(['InvoLuck', 'MERN']);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Forms Demo</h1>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">TextInput — sizes</h2>
          <div className="grid gap-4">
            <div>
              <label htmlFor="ti-sm" className="mb-1 block text-sm font-medium text-gray-700">Small</label>
              <TextInput id="ti-sm" size="sm" placeholder="Small" />
            </div>
            <div>
              <label htmlFor="ti-md" className="mb-1 block text-sm font-medium text-gray-700">Medium</label>
              <TextInput id="ti-md" size="md" placeholder="Medium" />
            </div>
            <div>
              <label htmlFor="ti-lg" className="mb-1 block text-sm font-medium text-gray-700">Large</label>
              <TextInput id="ti-lg" size="lg" placeholder="Large" />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">TextInput — states</h2>
          <div className="grid gap-4">
            <div>
              <label htmlFor="ti-default" className="mb-1 block text-sm font-medium text-gray-700">Default</label>
              <TextInput id="ti-default" placeholder="Default" />
            </div>
            <div>
              <label htmlFor="ti-success" className="mb-1 block text-sm font-medium text-gray-700">Success</label>
              <TextInput id="ti-success" state="success" placeholder="Looks good" />
              <p className="mt-1 text-sm text-emerald-600">Everything looks good.</p>
            </div>
            <div>
              <label htmlFor="ti-error" className="mb-1 block text-sm font-medium text-gray-700">Error</label>
              <TextInput id="ti-error" state="error" placeholder="There is an error" />
              <p className="mt-1 text-sm text-red-600">Please fix this field.</p>
            </div>
            <div>
              <label htmlFor="ti-disabled" className="mb-1 block text-sm font-medium text-gray-700">Disabled</label>
              <TextInput id="ti-disabled" disabled placeholder="Disabled" />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Select</h2>
          <div className="grid gap-4">
            <Select
              options={[
                { value: '', label: 'Select an option', disabled: true },
                { value: 'draft', label: 'Draft' },
                { value: 'sent', label: 'Sent' },
                { value: 'paid', label: 'Paid' }
              ]}
              size="md"
            />
            <Select
              options={[
                { value: 'basic', label: 'Basic' },
                { value: 'pro', label: 'Pro' },
                { value: 'enterprise', label: 'Enterprise' }
              ]}
              size="lg"
              state="success"
            />
            <Select
              options={[
                { value: 'error', label: 'This shows error state' }
              ]}
              size="sm"
              state="error"
            />
          </div>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Switch</h2>
          <div className="flex items-center gap-3">
            <Switch checked={enabled} onChange={setEnabled} />
            <span className="text-gray-700">Enabled: {enabled ? 'Yes' : 'No'}</span>
          </div>
        </section>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">TagInput</h2>
          <TagInput value={tags} onChange={setTags} />
          <p className="mt-2 text-sm text-gray-600">Tags: {tags.join(', ') || 'none'}</p>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Controlled input</h2>
          <div className="grid gap-2">
            <label htmlFor="ti-name" className="text-sm font-medium text-gray-700">Name</label>
            <TextInput
              id="ti-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name"
            />
            <p className="text-sm text-gray-600">Value: <span className="font-mono">{name || '""'}</span></p>
          </div>
        </section>
      </div>
    </div>
  );
}
