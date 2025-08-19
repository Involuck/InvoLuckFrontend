'use client'

import { useRouter } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: Props) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/authenticated/users')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit User {params.id}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              defaultValue="john@example.com"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select defaultValue="Admin" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>
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
  )
}