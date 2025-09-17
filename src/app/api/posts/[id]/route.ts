import connectToMongo from "@/lib/mongodb";
import { Post } from "@/models/PostModel";
import { NextResponse } from "next/server";
type Params = {
  params: { id: string };
};
export async function GET(_: Request, { params }: Params) {
  try {
    await connectToMongo();

    const { id } = params;

    const post = await Post.findById(id).lean();

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await connectToMongo();

    const { id } = params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully", post: deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}