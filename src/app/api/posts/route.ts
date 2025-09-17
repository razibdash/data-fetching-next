import connectToMongo from "@/lib/mongodb";
import { Post } from "@/models/PostModel";
import {  NextRequest, NextResponse } from "next/server";


export async function GET() {
  try {
    await connectToMongo();
    const posts = await Post.find().lean();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongo();

    const { title, author, description } = await req.json();

    if (!title || !author || !description) {
      return NextResponse.json(
        { error: "All fields (title, author, description) are required" },
        { status: 400 }
      );
    }

    const newPost = new Post({
      title,
      author,
      description,
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}