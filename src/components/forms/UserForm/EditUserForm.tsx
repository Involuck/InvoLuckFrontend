'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Inside src/components/forms/UserForm/EditUserForm.tsx
import FileUploader from "../FileUploader/FileUploader";



type Props = {
  userId: string;
};

export default function EditUserForm({ userId }: Props) {
  const router = useRouter();

  // Local state for form fields
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [role, setRole] = useState("Admin");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: collect form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // Here you would usually send `formData` to your backend
    console.log("Form submitted:", {
      name,
      email,
      role,
      profilePicture,
    });

    router.push('/users'); // Redirect to users page after update
  };

  // Handle cancel button
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit User {userId}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* User email input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* User role selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          {/* FileUploader for profile picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <FileUploader
              onFileSelect={(file: File | null) => setProfilePicture(file)}
            />
          </div>

          {/* Action buttons */}
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
