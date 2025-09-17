"use client";

import { useState } from "react";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("✅ Post created successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto mt-10  p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border text-stone-700 p-2 rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 text-stone-700 rounded-lg focus:ring focus:ring-blue-300"
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 text-stone-700 rounded-lg focus:ring focus:ring-blue-300"
          
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 mb-5 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

    </div>
  );
};

export default CreatePostForm;
