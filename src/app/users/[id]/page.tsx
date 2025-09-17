import { getUser, getUserPost } from '@/lib/user';
import { UserDetailsProps } from '@/types/users'
import React from 'react'

const UserDetailsPage = async({params}:UserDetailsProps) => {
    const {id}=await params;
    //fetch user details by id
    const user=await getUser(id)
    //fetch user post by user post id
     const userPost=await getUserPost(user?.id);
     
  return (
    <div className="p-6 space-y-8 max-w-7xl m-auto ">
      {/* User Details Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">
          {user?.name} (@{user?.username})
        </h1>
        <p className="text-gray-700 mb-2">
          📧 <span className="font-medium">{user?.email}</span>
        </p>
        <p className="text-gray-700 mb-2">
          📞 <span className="font-medium">{user?.phone}</span>
        </p>
        <p className="text-gray-700 mb-2">
          🌍 <span className="font-medium">{user?.website}</span>
        </p>
        <p className="text-gray-700">
          🏢 <span className="font-medium">{user?.company.name}</span>
        </p>
      </div>

      {/* User Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Posts by {user?.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPost?.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-indigo-500 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDetailsPage