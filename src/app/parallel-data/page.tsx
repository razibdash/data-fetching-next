import AllUser from '@/components/AllUser'
import UserSkeleton from '@/components/UserSkeleton'
import { getAllPost, getAllUser } from '@/lib/data'
import React, { Suspense } from 'react'

const ParallelData = async() => {
   const [posts,users]= await Promise.all([
    getAllPost(),
    getAllUser()
   ])
  return (
    <div className="p-8 space-y-10 max-w-7xl m-auto">
      {/* Users Section */}
       <Suspense fallback={<UserSkeleton />}>
         <AllUser users={users} />
       </Suspense>

      {/* Posts Section */}
      <section>
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts?.slice(0, 10).map((post) => (
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
      </section>
    </div>
  )
}

export default ParallelData