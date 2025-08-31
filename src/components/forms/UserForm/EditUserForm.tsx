'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FileUploader from "@/components/forms/FileUploader/FileUploader";

type Props = {
  userId: string;
};

export default function EditUserForm({ userId }: Props) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/users');
  };

  const handleCancel = () => {
    router.back();
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit User {userId}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              defaultValue="Admin"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Profile Image (FileUploader) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <FileUploader onFileSelect={handleFileSelect} />

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="h-32 w-32 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
