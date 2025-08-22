export default function NewUserPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter user email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
