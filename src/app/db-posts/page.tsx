"use client"
import { PostDb } from '@/types/post'
import React, { useEffect, useState } from 'react'

const PostPage = () => {
    // const posts=await (await fetch("http://localhost:3000/api/posts")).json();
    const [posts, setPosts] = useState<PostDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts"); // hitting your API route
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: PostDb[] = await res.json();
      setPosts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);
  return (
     <div className="min-h-screen  bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post:PostDb) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <h2 className="text-sm font-semibold text-gray-500 mb-2">
                {post.author}
              </h2>
              <p className="text-gray-600 text-sm">{post.description}</p>
              <div className="mt-4 flex justify-between items-center">
                 <div>
                    <button className='px-4 py-1 border rounded shadow-fuchsia-100 text-stone-800 cursor-pointer'>Click</button>
                 </div>
                <div className="text-xs text-gray-400">
                  ID: {post._id.toString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostPage