'use client'
import { Post } from '@/types/post'
import React, { useEffect, useState } from 'react'

const ClientPosts = () => {
    const [posts,setPosts]=useState<Post[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<string|null>(null);

const dataFetch = async () => {
  setLoading(true); // ✅ Start loading before fetch
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: Post[] = await response.json();
    setPosts(data);

  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred");
    }
  } finally {
    setLoading(false); // ✅ Always stop loading
  }
};

  // ✅ run fetch on mount
  useEffect(() => {
    dataFetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
  <div className="p-6">
  <h2 className="text-2xl font-bold mb-6 text-gray-200">Posts</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.slice(0,10).map((post) => (
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

export default ClientPosts