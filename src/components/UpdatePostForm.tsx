"use client";

import { useState } from "react";

type UpdatePostFormProps = {
  post: {
    _id: string;
    title: string;
    author: string;
    description: string;
  };
};

const UpdatePostForm = ({ post }: UpdatePostFormProps) => {
  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [description, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Update failed");

      setMessage("✅ Post updated successfully!");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      {message && (
        <p
          className={`text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 rounded-lg text-gray-800"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full border p-2 rounded-lg text-gray-800"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2 rounded-lg text-gray-800"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Updating..." : "Update Post"}
      </button>
    </form>
  );
};

export default UpdatePostForm;
