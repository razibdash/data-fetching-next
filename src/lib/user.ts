import { User, UserPost } from "@/types/users"

export async function getUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch user with id: ${id}`);
    }

    const user: User = await res.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // return null in case of error
  }
}

export async function getUserPost(userId: number|undefined): Promise<UserPost[] | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts for user with id: ${userId}`);
    }

    const userPosts: UserPost[] = await res.json();
    return userPosts;

  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
}