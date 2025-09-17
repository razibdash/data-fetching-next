import { User } from '@/types/users'
import React from 'react'

const AllUser = ({users}:{ users: User[] | null }) => {
  return (
    <section>
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600">@{user.username}</p>
              <p className="text-gray-700 mt-2">📧 {user.email}</p>
              <p className="text-gray-700">📞 {user.phone}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default AllUser