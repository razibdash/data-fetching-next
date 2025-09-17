import { Post } from "@/types/post";
import { User } from "@/types/users";

export async function getAllUser(): Promise<User[] | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);

    if (!res.ok) {
      throw new Error(`Failed to fetch user`);
    }

    const user: User[] = await res.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // return null in case of error
  }
}

export async function getAllPost(): Promise<Post[] | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts `);
    }

    const userPosts: Post[] = await res.json();
    return userPosts;

  } catch (error) {
    console.error("Error fetching  posts:", error);
    return null;
  }
}