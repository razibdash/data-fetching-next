import { Post } from '@/types/post';
import React from 'react'

const ServerPost = async() => {
    const res=await fetch('https://jsonplaceholder.typicode.com/posts',{
        next:{
            revalidate:172800
        }
    })
    const posts=await res.json();
  return (
    <div className="p-6">
  <h2 className="text-2xl font-bold mb-6 text-gray-200">Posts</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.slice(0,10).map((post:Post) => (
      <div
        key={post.id}
        className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold text-indigo-600 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm">{post.body}</p>
      </div>
    ))}
  </div>
</div>
  )
}

export default ServerPost